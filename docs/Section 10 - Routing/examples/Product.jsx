// Product.jsx
// Reading a route param with useParams.
// Route is: <Route path="/product/:id" element={<Product />} />

import { useParams, useNavigate } from "react-router-dom";

function Product() {
  const { id } = useParams();      // matches :id in the URL
  const navigate = useNavigate();  // for going to other pages from code

  return (
    <div>
      <h1>Product #{id}</h1>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default Product;

// Visiting /product/42 shows "Product #42".
