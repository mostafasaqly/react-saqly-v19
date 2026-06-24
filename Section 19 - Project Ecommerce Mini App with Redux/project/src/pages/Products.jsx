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

  return (
    <div className="store-layout">
      <header className="store-header">
        <h1>Mini Store</h1>
        <p>Powered by Fake Store API + Redux Toolkit</p>
      </header>

      {isLoading && (
        <p className="state-msg">Loading products…</p>
      )}

      {isError && (
        <p className="state-msg state-msg--error">Error: {message}</p>
      )}

      {!isLoading && !isError && (
        <section className="products-section">
          <h2>Products ({items.length})</h2>
          <div className="products-grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <aside className="cart-sidebar">
        <Cart />
      </aside>
    </div>
  );
}

export default Products;
