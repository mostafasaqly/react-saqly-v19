import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleFavorite } from "../store/favoritesSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    state.favorites.includes(product.id)
  );

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-card__img"
      />
      <p className="product-card__title">{product.title}</p>
      <p className="product-card__price">${product.price}</p>
      <div className="product-card__actions">
        <button
          className="btn btn-primary"
          onClick={() => dispatch(addToCart(product))}
        >
          + Cart
        </button>
        <button
          className={`btn btn-ghost${isFavorite ? " btn-ghost--active" : ""}`}
          onClick={() => dispatch(toggleFavorite(product.id))}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
