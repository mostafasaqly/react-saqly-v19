// ProductCard.jsx — one product with "Add to cart" and "favorite" buttons.
// It dispatches Redux actions and reads whether it's a favorite.

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleFavorite } from "../store/favoritesSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  // Is this product favorited? Read from the favorites slice.
  const isFavorite = useSelector((state) =>
    state.favorites.includes(product.id)
  );

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ height: 120, objectFit: "contain", width: "100%" }}
      />
      <h3 style={{ fontSize: 14 }}>{product.title}</h3>
      <p>${product.price}</p>

      <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
      <button onClick={() => dispatch(toggleFavorite(product.id))}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default ProductCard;
