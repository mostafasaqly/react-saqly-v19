import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const favorites = useSelector((state) => state.favorites);
  const allProducts = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const favoriteProducts = allProducts.filter((p) => favorites.includes(p.id));

  return (
    <div className="cart-box">
      <div className="cart-box__header">
        <span className="cart-box__title">🛒 Cart</span>
        <span className="cart-box__count">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item__img" />
                <div className="cart-item__info">
                  <div className="cart-item__title">{item.title}</div>
                  <div className="cart-item__price">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
                <span className="cart-item__qty">×{item.qty}</span>
                <button
                  className="btn btn-ghost"
                  style={{ padding: "4px 8px", fontSize: 12 }}
                  onClick={() => dispatch(removeFromCart(item.id))}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span className="cart-total__label">Total</span>
            <span className="cart-total__amount">${total.toFixed(2)}</span>
          </div>

          <button
            className="btn btn-danger"
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </button>
        </>
      )}

      {favoriteProducts.length > 0 && (
        <div className="favorites-section">
          <h3>❤️ Favorites ({favoriteProducts.length})</h3>
          <ul className="favorites-list">
            {favoriteProducts.map((p) => (
              <li key={p.id} className="favorites-item">
                {p.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Cart;
