// 01-Welcome.jsx
// The simplest possible component. A function that returns JSX.
// Rule: the component name MUST start with a capital letter (Welcome, not welcome).

function Welcome() {
  // This looks like HTML, but it is JSX (JavaScript in disguise).
  return <h1>Hello, React!</h1>;
}

export default Welcome;

// How to use it in App.jsx:
//
//   import Welcome from "./Welcome.jsx";
//
//   function App() {
//     return (
//       <div>
//         <Welcome />   {/* reuse it as many times as you want */}
//         <Welcome />
//       </div>
//     );
//   }
