// Lightweight JSX/JS + Shell syntax highlighter — no dependencies

// ── Shell tokenizer ─────────────────────────────────────────────────────────
const SHELL_CMDS = new Set(["npm", "npx", "yarn", "pnpm", "node", "cd", "ls", "mkdir", "git"]);
const SHELL_SUBCMDS = new Set(["install", "i", "create", "run", "start", "build", "init", "add", "remove", "uninstall", "update"]);

function tokenizeShell(code) {
  const tokens = [];

  for (const line of code.split("\n")) {
    if (tokens.length) tokens.push({ type: "plain", value: "\n" });

    // leading $ prompt
    const promptMatch = line.match(/^(\$\s*)/);
    let rest = line;
    if (promptMatch) {
      tokens.push({ type: "sh-prompt", value: promptMatch[1] });
      rest = line.slice(promptMatch[1].length);
    }

    // comments
    if (rest.trimStart().startsWith("#")) {
      tokens.push({ type: "comment", value: rest });
      continue;
    }

    const words = rest.split(/(\s+)/);
    let wordIndex = 0; // index among non-whitespace words

    for (const word of words) {
      if (/^\s+$/.test(word)) {
        tokens.push({ type: "plain", value: word });
        continue;
      }

      if (wordIndex === 0 && SHELL_CMDS.has(word)) {
        tokens.push({ type: "sh-cmd", value: word });
      } else if (wordIndex === 1 && SHELL_SUBCMDS.has(word)) {
        tokens.push({ type: "sh-sub", value: word });
      } else if (word.startsWith("--")) {
        tokens.push({ type: "sh-flag", value: word });
      } else if (word.startsWith("-") && word.length <= 3) {
        tokens.push({ type: "sh-flag", value: word });
      } else if (
        wordIndex >= 1 &&
        // package name heuristic: contains letter, may have @scope or hyphen/dot
        /^(@[a-z0-9-]+\/)?[a-z0-9][@a-z0-9._/-]*$/i.test(word) &&
        !SHELL_CMDS.has(word) &&
        !SHELL_SUBCMDS.has(word)
      ) {
        tokens.push({ type: "sh-pkg", value: word });
      } else {
        tokens.push({ type: "plain", value: word });
      }

      wordIndex++;
    }
  }

  return tokens;
}

// ── JS/JSX tokenizer ─────────────────────────────────────────────────────────
const TOKENS = [
  { type: "string",  re: /(`(?:\\[\s\S]|[^`])*`|"(?:\\[\s\S]|[^"])*"|'(?:\\[\s\S]|[^'])*')/g },
  { type: "comment", re: /(\/\/[^\n]*)/g },
  { type: "comment", re: /(\/\*[\s\S]*?\*\/)/g },
  { type: "tag",     re: /(<\/?[A-Za-z][A-Za-z0-9.]*|\/?>)/g },
  { type: "number",  re: /\b(\d+\.?\d*)\b/g },
  { type: "keyword", re: /\b(import|export|default|from|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|super|this|typeof|instanceof|in|of|async|await|try|catch|finally|throw|null|undefined|true|false|void|delete|yield|static|get|set)\b/g },
  { type: "builtin", re: /\b(useState|useEffect|useRef|useContext|useMemo|useCallback|useReducer|useId|useOptimistic|useActionState|useFormStatus|useTransition|useDeferredValue|useLayoutEffect|useSyncExternalStore|use|useLocation|useParams|useNavigate|useSearchParams|useDispatch|useSelector|createSlice|createAsyncThunk|configureStore|createContext|createRoot)\b/g },
  { type: "attr",    re: /\b([a-zA-Z][a-zA-Z0-9]*)(?=\s*=\s*[{"'])/g },
  { type: "fn",      re: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g },
  { type: "punct",   re: /(=>|[{}()[\];,.:?])/g },
];

function tokenizeJS(code) {
  const spans = [];

  for (const { type, re } of TOKENS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(code)) !== null) {
      spans.push({ start: m.index, end: m.index + m[0].length, type, value: m[0] });
    }
  }

  spans.sort((a, b) => a.start - b.start || b.end - a.end);

  const tokens = [];
  let cursor = 0;

  for (const span of spans) {
    if (span.start < cursor) continue;
    if (span.start > cursor) {
      tokens.push({ type: "plain", value: code.slice(cursor, span.start) });
    }
    tokens.push({ type: span.type, value: span.value });
    cursor = span.end;
  }

  if (cursor < code.length) {
    tokens.push({ type: "plain", value: code.slice(cursor) });
  }

  return tokens;
}

// ── Auto-detect & dispatch ───────────────────────────────────────────────────
function isShellCode(code) {
  const firstWord = code.trimStart().replace(/^\$\s*/, "").split(/\s/)[0];
  return SHELL_CMDS.has(firstWord);
}

export function tokenize(code) {
  return isShellCode(code) ? tokenizeShell(code) : tokenizeJS(code);
}
