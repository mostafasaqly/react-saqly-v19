// Products.jsx — fetches products on load and shows them as cards.
// Reads everything from Redux.

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard.jsx";
import Cart from "../components/Cart.jsx";

function Products() {
  const dispatch = useDispatch();
  const { items, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {message}</p>;

  return (
    <div>
      <Cart />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
