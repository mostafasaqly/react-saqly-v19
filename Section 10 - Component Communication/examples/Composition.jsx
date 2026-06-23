// Composition.jsx
// COMPOSITION removes prop drilling by passing JSX as children.
// Layout never needs to know about `user`.

function Composition() {
  const user = { name: "Sara" };

  return (
    <Layout>
      {/* Profile is built HERE, where `user` already exists. */}
      <Profile user={user} />
    </Layout>
  );
}

function Layout({ children }) {
  // Layout just renders whatever it is given. No `user` prop needed.
  return <div className="layout">{children}</div>;
}

function Profile({ user }) {
  return <p>Welcome, {user.name}!</p>;
}

export default Composition;
