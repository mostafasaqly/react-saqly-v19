// 04-ConditionalGreeting.jsx
// CONDITIONAL RENDERING: show different UI based on a condition.
// Because JSX is JavaScript, we use normal JavaScript logic.

function ConditionalGreeting({ isLoggedIn }) {
  return (
    <div>
      {/* Way 1: && shows something OR nothing */}
      {isLoggedIn && <p>You have new messages.</p>}

      {/* Way 2: ternary ? : shows one thing OR another */}
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </div>
  );
}

export default ConditionalGreeting;

// Way 3: an `if` before the return, for bigger choices.
function Status({ isLoggedIn }) {
  if (isLoggedIn) {
    return <p>Welcome back!</p>;
  }
  return <p>Please log in.</p>;
}

export { Status };

// How to use it:
//   <ConditionalGreeting isLoggedIn={true} />
//   <ConditionalGreeting isLoggedIn={false} />
