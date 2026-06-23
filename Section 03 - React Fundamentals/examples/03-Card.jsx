// 03-Card.jsx
// CHILDREN: whatever you put BETWEEN the tags arrives as a special prop
// called `children`. This lets a component wrap other content.

function Card({ children }) {
  return <div className="card">{children}</div>;
}

export default Card;

// How to use it as a wrapper:
//
//   <Card>
//     <h2>Title</h2>
//     <p>Some text inside the card.</p>
//   </Card>
//
// The <h2> and <p> become the `children` of Card.
// This is the most common pattern for building reusable boxes and layouts.
