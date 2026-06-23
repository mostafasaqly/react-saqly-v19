// Cart.jsx — shows cart items, a remove button, and a memoized total.

import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartSlice";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // DERIVED + MEMOIZED: total only recalculates when items change.
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 16 }}>
      <h2>Cart ({items.length})</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.title} × {item.qty} — ${(item.price * item.qty).toFixed(2)}{" "}
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              remove
            </button>
          </li>
        ))}
      </ul>
      <p>
        <strong>Total: ${total.toFixed(2)}</strong>
      </p>
      <button onClick={() => dispatch(clearCart())}>Clear cart</button>
    </div>
  );
}

export default Cart;
