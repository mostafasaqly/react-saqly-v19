// 05-FruitList.jsx
// RENDERING LISTS: use .map() to turn an array of data into JSX elements.
// RULE: every item needs a unique `key` so React can track it.

const fruits = ["Apple", "Banana", "Cherry"];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}

export default FruitList;

// A more realistic example: a list of objects with a unique id.
const users = [
  { id: 1, name: "Sara" },
  { id: 2, name: "Omar" },
  { id: 3, name: "Lina" },
];

function UserList() {
  return (
    <ul>
      {users.map((user) => (
        // Use a stable, unique id as the key (better than the array index).
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export { UserList };
