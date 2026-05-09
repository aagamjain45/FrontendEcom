import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <div className="product-card">
      
      <div className="product-image-container">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.title} className="product-image" />
        </Link>
        <button 
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label="Add to wishlist"
        >
          <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        
        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        
        <div className="product-rating">
          <Star size={16} className="star-icon" />
          <span className="rating-value">{product.rating}</span>
          <span className="review-count">({product.reviews})</span>
        </div>

        <div className="product-footer">
          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
