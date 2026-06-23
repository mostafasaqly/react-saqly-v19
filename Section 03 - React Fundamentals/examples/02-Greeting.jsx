// 02-Greeting.jsx
// PROPS: values passed into a component, like arguments to a function.
// Props are READ-ONLY. A component must never change its own props.

// We "destructure" the props object to pull out `name` and `age` directly.
function Greeting({ name, age }) {
  return (
    <p>
      {name} is {age} years old.
    </p>
  );
}

export default Greeting;

// How to use it:
//
//   <Greeting name="Sara" age={25} />   // text prop uses quotes
//   <Greeting name="Omar" age={30} />   // number prop uses { }
//
// Output:
//   Sara is 25 years old.
//   Omar is 30 years old.
