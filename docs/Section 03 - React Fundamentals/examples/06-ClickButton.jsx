// 06-ClickButton.jsx
// HANDLING EVENTS: pass a function to events like onClick.
// React calls your function when the event happens.

function ClickButton() {
  // The event handler function.
  function handleClick() {
    alert("You clicked me!");
  }

  return (
    <div>
      {/* Pass the function itself — NO parentheses. */}
      <button onClick={handleClick}>Click me</button>

      {/* WRONG: this runs immediately when the page loads, not on click.
          <button onClick={handleClick()}>Click me</button> */}

      {/* To pass an argument, wrap it in an arrow function. */}
      <button onClick={() => greet("Sara")}>Greet Sara</button>
    </div>
  );
}

function greet(name) {
  alert("Hello, " + name + "!");
}

export default ClickButton;

// Common events you will use:
//   onClick   - a button or element is clicked
//   onChange  - an input value changes (typing)
//   onSubmit  - a form is submitted
//   onMouseEnter / onMouseLeave - hover
