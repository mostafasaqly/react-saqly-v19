// App.jsx — routes for the dashboard and the detail page.
// Remember to wrap <App /> in <BrowserRouter> inside main.jsx.

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import UserDetail from "./pages/UserDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users/:id" element={<UserDetail />} />
    </Routes>
  );
}

export default App;
