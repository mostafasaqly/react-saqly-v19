# Interactive Course Web App — Complete Blueprint

> A full-featured, bilingual (AR/EN), dark/light course platform built with React 19 + Vite.
> Use this document as a complete recipe to produce any new course in the same format.

---

## Table of Contents

1. [What This Is](#what-this-is)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Data Format — How to Write a Section](#data-format--how-to-write-a-section)
6. [Content Block Reference](#content-block-reference)
7. [Content Order — Problem → Solution Pattern](#content-order--problem--solution-pattern)
8. [Code Syntax Highlighting](#code-syntax-highlighting)
9. [Theme System (Dark / Light)](#theme-system-dark--light)
10. [Language System (AR / EN)](#language-system-ar--en)
11. [Progress Tracking](#progress-tracking)
12. [Search System](#search-system)
13. [Notes System](#notes-system)
14. [Q&A / Quiz System](#qa--quiz-system)
15. [Projects Pattern](#projects-pattern)
16. [How to Create a New Course](#how-to-create-a-new-course)
17. [Responsive & Accessibility](#responsive--accessibility)
18. [Build & Deploy](#build--deploy)
19. [Quick Checklist](#quick-checklist-for-a-new-course)

---

## What This Is

This app is an **interactive reading-based course platform**. It is not a video player — it is a structured, scrollable course where each section contains:

- An intro paragraph
- A lesson index (table of contents for that section)
- Rich content blocks (headings, paragraphs, code, tips, warnings, lists, CTAs)
- Interactive Q&A questions with a scoring system
- A personal notes textarea (auto-saved to localStorage)
- A "Mark as complete" button that updates the sidebar progress bar

The **teaching method** follows a problem → solution pattern:

1. Present the problem the learner is about to face
2. Show why the naive approach fails
3. Introduce the correct solution with a working code example
4. Summarize the rule and ask a review question

---

## Tech Stack

| Layer | Tool |
|---|---|
| UI Framework | React 19 |
| Build Tool | Vite 6 |
| Styling | Plain CSS with CSS custom properties (no Tailwind, no CSS-in-JS) |
| Syntax Highlighting | Custom tokenizer — zero dependencies |
| Font | Cairo (self-hosted, Arabic + Latin) |
| State | React Context API (5 contexts) |
| Persistence | localStorage only — no backend |
| Routing | Hash-based (`#section-N`) — no React Router needed |
| Lazy Loading | Dynamic `import()` per section file |

---

## Project Structure

```
web-app/
├── public/
│   ├── fonts/                    ← Self-hosted Cairo woff2 files
│   │   ├── Cairo-arabic.woff2
│   │   ├── Cairo-latin.woff2
│   │   └── Cairo-latin-ext.woff2
│   ├── .htaccess                 ← Apache SPA fallback
│   └── _redirects                ← Netlify SPA fallback
│
└── src/
    ├── main.jsx                  ← Entry: wraps App in 5 providers
    ├── App.jsx                   ← Layout: Sidebar + LessonContent + hash routing
    ├── App.css                   ← All component styles
    ├── index.css                 ← Reset + theme variables + font faces
    │
    ├── context/
    │   ├── ThemeContext.jsx      ← dark/light toggle, persisted in localStorage
    │   ├── LangContext.jsx       ← ar/en toggle, sets html[dir] and html[lang]
    │   ├── ProgressContext.jsx   ← completed section IDs, persisted in localStorage
    │   ├── SearchContext.jsx     ← full-text search index built from all sections
    │   └── NotesContext.jsx      ← per-section notes, persisted in localStorage
    │
    ├── hooks/
    │   └── useSectionContent.js  ← lazy-loads section data, caches, handles retry
    │
    ├── components/
    │   ├── Sidebar.jsx           ← nav + controls (theme/lang/progress/search)
    │   ├── LessonContent.jsx     ← renders section with all block types
    │   ├── CodeBlock.jsx         ← syntax-highlighted code + copy button
    │   ├── QABlock.jsx           ← interactive Q&A with scoring
    │   └── ErrorBoundary.jsx     ← catches render errors app-wide
    │
    ├── utils/
    │   └── highlight.js          ← tokenizer: JSX + Shell, no dependencies
    │
    └── data/
        ├── sections.js           ← metadata index (id + title + titleEn) + loadSection()
        └── sections/
            ├── section01.js      ← Course Introduction
            ├── section02.js      ← Dev Environment Setup
            ├── ...
            └── section19.js      ← Project 3: Mini Store
```

---

## Features

### Always Visible in Sidebar

- **Theme toggle** ☀️/🌙 — switches between dark and light mode; persisted across sessions
- **Language toggle** AR/EN — switches all UI text + section content; sets RTL/LTR on `<html>`
- **Progress bar** — shows `completed / total` and percentage; updates immediately on mark-complete
- **Full-text search** — searches across all section content; results show title + snippet
- **Section navigation** — numbered list; active item highlighted; completed items show ✓

### Inside Each Lesson

- **Section badge** + level badge (Beginner / Intermediate / Advanced)
- **Lesson table of contents** — ordered list of lesson titles inside that section
- **Rich content blocks** — see Content Block Reference below
- **Personal notes** — textarea per section, auto-saved to localStorage
- **Mark as complete** button — togglable; syncs with sidebar progress bar

### Code Blocks

- Syntax highlighting (JS/JSX tokens + Shell commands)
- Copy to clipboard button with status feedback (Copied / Failed)
- Always LTR even inside RTL page
- Dark background `#0d1117` (GitHub-style) regardless of page theme

---

## Data Format — How to Write a Section

Each section is a single JS file that exports a default object:

```js
export default {
  // ── Required ──────────────────────────────────────────────────────
  id: 3,                           // unique integer, matches filename (section03.js)
  title: "اسم القسم بالعربية",
  titleEn: "Section Name in English",

  level: "مبتدئ",                  // مبتدئ | متوسط | متقدم
  levelEn: "Beginner",             // Beginner | Intermediate | Advanced

  intro: "جملة تمهيدية بالعربية تظهر أسفل العنوان مباشرة.",
  introEn: "One-sentence intro in English shown below the title.",

  lessons: [                       // Arabic lesson titles — shown as ordered list
    "الدرس الأول",
    "الدرس الثاني",
  ],
  lessonsEn: [                     // English equivalents
    "Lesson One",
    "Lesson Two",
  ],

  content: [ /* Arabic blocks — see Content Block Reference */ ],
  contentEn: [ /* English blocks — same structure, translated text */ ],

  // ── Optional ──────────────────────────────────────────────────────
  comingSoon: true,                // shows "Coming Soon" placeholder instead of content
};
```

**Registration:** After creating `sectionNN.js`, add one line to `src/data/sections.js`:

```js
{ id: N, title: "العنوان العربي", titleEn: "English Title" },
```

The `loadSection()` function handles dynamic import automatically via the filename convention (`section01.js`, `section02.js`, …).

---

## Content Block Reference

Every element in `content` (and `contentEn`) is a plain object with a `type` field.

### `heading` — Section heading (h2)

```js
{ type: "heading", text: "ما هو الـ State؟" }
```

### `subheading` — Sub-heading (h3), styled in primary color

```js
{ type: "subheading", text: "مثال عملي" }
```

### `paragraph` — Body text

```js
{ type: "paragraph", text: "النص يظهر هنا بحجم 17px وارتفاع سطر 1.9." }
```

### `code` — Syntax-highlighted code block

```js
{
  type: "code",
  code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`
}
```

The tokenizer auto-detects JS/JSX vs Shell based on the first word of the snippet.

### `tip` — Green callout box (best practice)

```js
{ type: "tip", text: "دائماً تأكّد من تنظيف الـ effect في الـ cleanup function." }
```

### `warning` — Yellow/orange callout box (common mistake)

```js
{ type: "warning", text: "لا تستدعِ الخطّاف داخل حلقة أو شرط — هذا يكسر قواعد رياكت." }
```

### `list` — Unordered list with › bullet

```js
{
  type: "list",
  items: [
    "النقطة الأولى",
    "النقطة الثانية",
    "النقطة الثالثة",
  ]
}
```

### `cta` — Call to action (paragraph + external link)

```js
{
  type: "cta",
  text: "لو محتاج تدريب متخصص،",
  linkLabel: "ادخل من هنا →",
  link: "https://example.com/training",
}
```

### `qa` — Interactive question with auto-scoring

```js
{
  type: "qa",
  question: "بجملة واحدة، ما المشكلة التي يحلّها الـ useEffect؟",
  answer: "يتيح تشغيل كود جانبي (side effects) بعد كل render أو عند تغيّر قيم محددة.",
}
```

The learner types their own answer, clicks "Check", gets a 0–100% score, then can reveal the correct answer.

---

## Content Order — Problem → Solution Pattern

For **every individual lesson** inside a section, use this exact order:

```
heading        ← اسم الدرس أو الفكرة الرئيسية
paragraph      ← المشكلة: لماذا نحتاج هذا؟ ما الذي يكسر بدونه؟
paragraph      ← الحل: ما هو الأسلوب الصحيح؟
code           ← مثال عملي كامل يوضح الحل
tip            ← قاعدة أو ملاحظة إيجابية تترسّخ في الذهن
warning        ← خطأ شائع يجب تجنّبه (اختياري، أضفه فقط إذا كان هناك فخ حقيقي)
list           ← ملخص النقاط الرئيسية (3–5 نقاط)
qa             ← سؤال مراجعة واحد على الأقل
```

**Example — Lesson: useEffect**

```js
{ type: "heading", text: "2. خطّاف useEffect" },
{
  type: "paragraph",
  text: "المشكلة: تريد جلب بيانات من API عند تحميل المكوّن. لو وضعت fetch() مباشرة في جسم المكوّن، سيُنفَّذ في كل render — وهذا يسبب حلقة لا تنتهي أو طلبات غير ضرورية.",
},
{
  type: "paragraph",
  text: "الحل: useEffect — يُنفَّذ بعد أن يُصيَّر المكوّن في الـ DOM، ويمكن تحديد متى يُعاد تشغيله عبر مصفوفة التبعيات.",
},
{
  type: "code",
  code: `import { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(setUsers);
  }, []); // [] = تشغيل مرة واحدة فقط عند التحميل

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`
},
{ type: "tip", text: "مصفوفة فارغة [] تعني: شغّل هذا الـ effect مرة واحدة فقط — بعد الـ render الأول." },
{
  type: "warning",
  text: "إذا أضفت متغيراً يتغيّر داخل الـ effect إلى مصفوفة التبعيات، ستحصل على حلقة لا نهائية. تعلّم Cleanup Functions لتجنّب ذلك.",
},
{
  type: "list",
  items: [
    "useEffect يُنفَّذ بعد كل render افتراضياً",
    "[] تعني مرة واحدة عند التحميل",
    "[dep] تعني عند تغيّر dep",
    "return function في useEffect = cleanup",
  ],
},
{
  type: "qa",
  question: "ماذا يحدث لو لم تضع مصفوفة التبعيات في useEffect الذي يُعدِّل الحالة؟",
  answer: "يُنفَّذ الـ effect بعد كل render، يُعدِّل الحالة، فيحدث render جديد، فيُنفَّذ الـ effect مجدداً — حلقة لا تنتهي.",
},
```

---

## Code Syntax Highlighting

The tokenizer lives in `src/utils/highlight.js`. It is zero-dependency and runs entirely in the browser. Auto-detects JS/JSX vs Shell by checking if the first word is a known shell command (`npm`, `npx`, `git`, `cd`, etc.).

### JSX / JS Token Colors

| Class | Color | Examples |
|---|---|---|
| `tok-keyword` | `#ff7b72` Red | `import export const let return if async await` |
| `tok-builtin` | `#d2a8ff` Purple | `useState useEffect useContext useReducer useOptimistic` |
| `tok-string` | `#a5d6ff` Blue | `"text"` `` `template` `` `'single'` |
| `tok-comment` | `#6e7681` Grey italic | `// line comment` `/* block */` |
| `tok-number` | `#79c0ff` Blue | `0 42 3.14` |
| `tok-tag` | `#7ee787` Green | `<div>` `</Component>` `/>` |
| `tok-attr` | `#ffa657` Orange | `onClick` `className` `onChange` |
| `tok-fn` | `#e6edf3` White | function call names |
| `tok-punct` | `#8b949e` Grey | `{ } ( ) => ; , .` |
| `tok-plain` | `#e6edf3` White | everything else |

### Shell Token Colors

| Class | Color | Examples |
|---|---|---|
| `tok-sh-cmd` | `#7ee787` Green bold | `npm npx git cd node ls mkdir` |
| `tok-sh-sub` | `#ffa657` Orange | `install run build start init add` |
| `tok-sh-pkg` | `#f0e68c` Yellow | `react react-router-dom axios redux` |
| `tok-sh-flag` | `#79c0ff` Blue | `--save-dev -D --template` |
| `tok-sh-prompt` | `#6e7681` Grey | `$` (non-selectable) |

To add new React hooks to highlighting, add them to the `builtin` regex in `highlight.js`.

---

## Theme System (Dark / Light)

**File:** `src/context/ThemeContext.jsx`

- Default: `"dark"`
- Persisted in: `localStorage` key `"theme"`
- Applied via: `document.documentElement.setAttribute("data-theme", theme)`

### CSS Variables

| Variable | Dark | Light | Usage |
|---|---|---|---|
| `--bg` | `#0f172a` | `#f1f5f9` | Page background |
| `--surface` | `#1e293b` | `#ffffff` | Cards, sidebar, panels |
| `--surface-2` | `#334155` | `#e2e8f0` | Hover states, badges |
| `--primary` | `#38bdf8` | `#0284c7` | Buttons, links, accents |
| `--primary-dark` | `#0ea5e9` | `#0369a1` | Button hover |
| `--text` | `#e2e8f0` | `#0f172a` | Main text |
| `--text-muted` | `#94a3b8` | `#475569` | Secondary text |
| `--border` | `#334155` | `#cbd5e1` | Borders, dividers |
| `--code-bg` | `#0b1220` | `#f8fafc` | Code block background |
| `--success` | `#22c55e` | `#16a34a` | Complete, tip |
| `--danger` | `#ef4444` | `#dc2626` | Errors, warnings |
| `--warning` | `#f59e0b` | `#d97706` | Warning callouts |
| `--radius` | `12px` | `12px` | Border radius |

**Important:** Code blocks always use `background: #0d1117` — they do NOT change with the theme.

### Using the Theme Toggle

```jsx
import { useTheme } from "../context/ThemeContext";

const { theme, toggle } = useTheme();

<button onClick={toggle}>
  {theme === "dark" ? "☀️" : "🌙"}
</button>
```

---

## Language System (AR / EN)

**File:** `src/context/LangContext.jsx`

- Default: `"ar"`
- Persisted in: `localStorage` key `"lang"`
- Side effects on change:
  - `document.documentElement.dir = "rtl"` (Arabic) or `"ltr"` (English)
  - `document.documentElement.lang = "ar"` or `"en"`
- Font: Cairo — handles both Arabic and Latin unicode ranges

### How Bilingual Content Works

Every section file exports two parallel arrays:
- `content` — Arabic blocks
- `contentEn` — English blocks (same `type` values, translated `text`)

Same pattern for: `title`/`titleEn`, `intro`/`introEn`, `level`/`levelEn`, `lessons`/`lessonsEn`.

`LessonContent.jsx` selects the correct set:

```js
const content = isAr ? section.content : (section.contentEn || section.content);
```

The fallback `|| section.content` means Arabic is shown if English is not yet written.

### RTL / LTR CSS Strategy

All layout uses **CSS logical properties** so it mirrors automatically:

```css
/* Instead of padding-left — use: */
padding-inline-start: 22px;

/* Instead of right: 12px — use: */
inset-inline-end: 12px;

/* Instead of text-align: left — use: */
text-align: start;

/* Instead of border-left — use: */
border-inline-start: 3px solid var(--success);
```

No separate RTL stylesheet needed — `dir="rtl"` on `<html>` handles everything.

**Exception:** `code` and `pre` elements are always `direction: ltr; text-align: left`.

---

## Progress Tracking

**File:** `src/context/ProgressContext.jsx`

- Stored as array of completed section IDs in `localStorage` key `"progress"`
- Total = count of sections where `comingSoon` is falsy
- Percent = `Math.round((completed.length / total) * 100)`

```jsx
import { useProgress } from "../context/ProgressContext";

const { isComplete, toggleComplete, percent, completed, total } = useProgress();

// Toggle a section complete/incomplete
<button onClick={() => toggleComplete(section.id)}>
  {isComplete(section.id) ? "✓ مكتمل" : "وضّع علامة مكتمل"}
</button>

// Progress bar fill
<div className="progress-bar__fill" style={{ width: `${percent}%` }} />
```

The sidebar nav shows `✓` instead of the section number when `isComplete(id)` is true.

---

## Search System

**File:** `src/context/SearchContext.jsx`

On mount, loads **all** section data files in parallel and builds an in-memory index of:
- section `id`
- Arabic and English titles
- All text from: paragraphs, list items, Q&A questions and answers

Search is case-insensitive substring match. Results include:
- `id` — for navigation (clicking a result jumps to that section)
- `title` / `titleEn` — displayed as the result heading
- `snippets` — up to 2 matching text excerpts, truncated to 120 characters

```jsx
import { useSearch } from "../context/SearchContext";

const { query, setQuery, results, clearSearch, indexReady } = useSearch();
```

`indexReady` is `false` while sections are loading — the search input is disabled until ready.

---

## Notes System

**File:** `src/context/NotesContext.jsx`

- Stored in `localStorage` key `"notes"` as `{ [sectionId]: "text" }`
- Auto-saved on every keystroke — no save button needed
- Each section gets its own textarea rendered by `LessonContent`

```jsx
import { useNotes } from "../context/NotesContext";

const { getNote, setNote } = useNotes();

<textarea
  value={getNote(section.id)}
  onChange={(e) => setNote(section.id, e.target.value)}
  placeholder="اكتب ملاحظاتك هنا… تُحفظ تلقائياً."
/>
```

---

## Q&A / Quiz System

**File:** `src/components/QABlock.jsx`

Each `qa` block renders an interactive card with 4 modes:

| Mode | What the learner sees |
|---|---|
| `idle` | Question text + ✏️ icon — click to open |
| `writing` | Textarea to type answer + "Check" + "Show answer" buttons |
| `checked` | Score 0–100% + label + option to reveal correct answer if score < 70% |
| `revealed` | Learner's answer + correct answer displayed side by side |

### Scoring Algorithm

```js
function scoreAnswer(userAnswer, correctAnswer) {
  // 1. Normalize: lowercase, remove punctuation
  // 2. Split into words, filter words shorter than 3 characters
  // 3. Count how many correct-answer words appear in user answer
  // 4. Score = (hits / min(correctWordCount, 8)) * 100, capped at 100
}
```

Score thresholds:
- ≥ 70% → "ممتاز 🎉" / "Great!" (green)
- ≥ 40% → "جيد، راجع الإجابة" / "Good, review the answer" (yellow)
- < 40% → "راجع الإجابة" / "Review the answer" (red)

### Q&A Writing Tips

- Write questions that test **understanding**, not memorization
- Keep the correct `answer` factual and concise (2–3 sentences max)
- Questions starting with "لماذا" (why) and "ما الفرق بين" (what's the difference between) produce the best learning moments
- Each section should have **3–5** Q&A blocks, one per major lesson

---

## Projects Pattern

The course includes three hands-on projects. Each project section follows this structure:

1. **Project Overview** — what we're building, the final app, the skills it practices
2. **Layout lesson** — the app shell (main App.jsx, routing structure, component tree)
3. **Feature lessons** — one lesson per feature (add, edit, delete, filter, search, persist)
4. **Integration lessons** — connect to API, add state management, add loading/error UI
5. **React 19 features** — add Actions, optimistic updates, pending UI
6. **Refactoring lesson** — clean code, extract custom hooks, apply best practices

Each project produces a **portfolio-ready, deployable application**.

Source code lives in two places:
- `Section NN/examples/` — partial code snippets used in the lesson text
- `Section NN/project/src/` — the complete finished project code

---

## How to Create a New Course

To create a new course (e.g., Next.js, Angular, TypeScript, Node.js):

### Step 1 — Copy the web-app folder

```bash
cp -r web-app/ nextjs-course-app/
cd nextjs-course-app
npm install
```

### Step 2 — Update `src/data/sections.js`

Replace the section list with your new course sections:

```js
export const sections = [
  { id: 1,  title: "مقدمة الكورس",          titleEn: "Course Introduction" },
  { id: 2,  title: "إعداد بيئة التطوير",    titleEn: "Setup" },
  { id: 3,  title: "الصفحات والتوجيه",      titleEn: "Pages & Routing" },
  // ... one entry per section
];
```

### Step 3 — Create section data files

For each section create `src/data/sections/sectionNN.js`:

```js
export default {
  id: 3,
  title: "الصفحات والتوجيه في Next.js",
  titleEn: "Pages & Routing in Next.js",
  level: "مبتدئ",
  levelEn: "Beginner",
  intro: "Next.js يستخدم نظام ملفات لتعريف الصفحات تلقائياً.",
  introEn: "Next.js uses a file-system router — every file in /app is a route.",
  lessons: ["ما هو App Router؟", "إنشاء صفحة جديدة", "التوجيه المتداخل"],
  lessonsEn: ["What is the App Router?", "Creating a Page", "Nested Routing"],
  content: [
    // ─── Lesson 1 ───────────────────────────────────────────────────────────
    { type: "heading", text: "1. ما هو App Router؟" },
    {
      type: "paragraph",
      text: "المشكلة: في React العادي تحتاج تثبيت React Router وتكوينه يدوياً. في Next.js الأمر مختلف تماماً.",
    },
    {
      type: "paragraph",
      text: "الحل: App Router — كل ملف page.tsx داخل مجلد app/ يصبح route تلقائياً بدون أي إعداد.",
    },
    {
      type: "code",
      code: `app/
├── page.tsx        → /
├── about/
│   └── page.tsx   → /about
└── blog/
    ├── page.tsx   → /blog
    └── [slug]/
        └── page.tsx → /blog/:slug`
    },
    { type: "tip", text: "كل مجلد = segment في الـ URL. لا تحتاج ملف تكوين للـ routes." },
    {
      type: "qa",
      question: "ما الفرق بين App Router في Next.js وReact Router في React العادي؟",
      answer: "App Router يعمل بنظام الملفات — كل ملف page.tsx = route تلقائي. React Router يحتاج تعريف الـ routes يدوياً في الكود.",
    },
    // ─── More lessons ────────────────────────────────────────────────────────
  ],
  contentEn: [
    // Same structure in English
  ],
};
```

### Step 4 — Update branding in two files

In `src/App.jsx`:
```js
// Find all instances of:
"كورس رياكت 19" → "كورس Next.js"
"React 19 Course" → "Next.js Course"
```

In `src/components/Sidebar.jsx`:
```js
// Same replacements
```

### Step 5 — Run and build

```bash
npm run dev      # → http://localhost:5173
npm run build    # → dist/
```

---

## Responsive & Accessibility

### Breakpoints

| Viewport | Behavior |
|---|---|
| > 1024px | Sidebar (300px) permanent on left (LTR) or right (RTL) |
| 861–1024px | Sidebar narrowed to 260px |
| ≤ 860px | Sidebar becomes a slide-in drawer; hamburger button shown in topbar |
| ≤ 600px | Smaller font sizes, full-width buttons, reduced padding |
| ≤ 380px | Minimum phone size: tighter padding, smaller code font |

### Accessibility Features

- `Skip to content` link (visible only on keyboard focus)
- All interactive elements have `aria-label`
- Sidebar: `aria-label="Course sections"` / `aria-label="قائمة الأقسام"`
- Active nav item: `aria-current="page"`
- Disabled items: `aria-disabled="true"`
- Progress bar: `role="progressbar"` with `aria-valuenow/min/max`
- Error messages: `role="alert"`
- Loading states: `aria-live="polite"`
- Q&A: `role="region"` with `aria-label` matching the question
- `Escape` key closes the mobile sidebar

---

## Build & Deploy

### Development

```bash
cd web-app
npm install
npm run dev
# → http://localhost:5173
```

### Production Build

```bash
npm run build
# Output: web-app/dist/
# Size: ~309 KB JS (91 KB gzipped)
```

### Deploy to Netlify

1. Push repo to GitHub
2. Connect in Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `dist`
5. `public/_redirects` handles SPA routing automatically:
   ```
   /*  /index.html  200
   ```

### Deploy to Vercel

1. Import repo in Vercel dashboard
2. Framework preset: Vite (auto-detected)
3. `vercel.json` at project root handles SPA routing

### Environment Variables

```bash
# .env
VITE_API_URL=https://jsonplaceholder.typicode.com
```

Access in code:
```js
const url = import.meta.env.VITE_API_URL;
```

---

## Course Content Statistics (React 19 Course)

| # | Section | Lessons | Q&A |
|---|---|---|---|
| 1 | Course Introduction | 8 | 3 |
| 2 | Dev Environment Setup | 7 | 3 |
| 3 | React Fundamentals | 10 | 4 |
| 4 | Styling React Apps | 7 | 3 |
| 5 | State & Interactivity | 10 | 4 |
| 6 | Effects & Lifecycle | 7 | 3 |
| 7 | Forms in React 19 | 10 | 4 |
| 8 | React Hook Form | 12 | 4 |
| 9 | Async UI & Optimistic Updates | 10 | 3 |
| 10 | Component Communication | 11 | 4 |
| 11 | Routing with React Router DOM | 17 | 5 |
| 12 | Data Fetching & Axios | 14 | 4 |
| 13 | Suspense & use API | 8 | 3 |
| 14 | Redux Toolkit | 15 | 4 |
| 15 | Async Redux | 12 | 4 |
| 16 | Performance & Best Practices | 13 | 4 |
| 17 | Project 1: Task Manager | 15 | 5 |
| 18 | Project 2: API Dashboard | 15 | 5 |
| 19 | Project 3: Mini Store | 15 | 5 |
| **Total** | **19 sections** | **~205 lessons** | **~74 Q&A** |

~250 code examples · ~50,000 Arabic words · ~3,000 lines documented

---

## Quick Checklist for a New Course

- [ ] Copy `web-app/` folder
- [ ] `npm install` inside the new folder
- [ ] Update `sections.js` with the new section metadata list
- [ ] Create one `sectionNN.js` per section
- [ ] Every section has `content` (Arabic) and `contentEn` (English)
- [ ] Every lesson follows: **Problem → Solution → Code → Tip/Warning → Summary List → Q&A**
- [ ] At least **one `qa` block** per section
- [ ] At least **one `code` block** per lesson
- [ ] Project sections have: overview + feature lessons + refactoring lesson
- [ ] Update course title in `App.jsx` and `Sidebar.jsx`
- [ ] Add `public/_redirects` for Netlify or `vercel.json` for Vercel
- [ ] Test **Arabic mode** (RTL)
- [ ] Test **English mode** (LTR)
- [ ] Test **dark theme** and **light theme**
- [ ] Test on **mobile** (≤ 600px) — sidebar drawer opens/closes
- [ ] Run `npm run build` — confirm zero errors and no missing imports

---

*Built by Mostafa Saqly — mostafasaqly1@gmail.com*
