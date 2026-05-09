import { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { products } from '../data/products';
import { SkeletonCard } from '../components/Skeleton';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    // Simulate fetch
    const timer = setTimeout(() => {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/');
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container product-details-page">
        <SkeletonCard />
      </div>
    );
  }

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (type) => {
    if (type === 'dec' && quantity > 1) {
      setQuantity(prev => prev - 1);
    } else if (type === 'inc') {
      setQuantity(prev => prev + 1);
    }
  };

  return (
    <div className="container product-details-page">
      <div className="breadcrumb">
        <Link to="/"><ArrowLeft size={16} style={{ display: 'inline', marginRight: '5px' }}/> Back to Products</Link>
      </div>

      <div className="product-details-container">
        <div className="product-image-gallery">
          <img src={product.image} alt={product.title} className="main-image" />
        </div>

        <div className="product-info-section">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-title">{product.title}</h1>
          
          <div className="pd-rating">
            <Star fill="#fbbf24" color="#fbbf24" size={20} />
            <span>{product.rating}</span>
            <span className="review-count" style={{ color: 'var(--text-secondary)' }}>({product.reviews} reviews)</span>
          </div>

          <div className="pd-price">₹{product.price.toLocaleString('en-IN')}</div>
          
          <p className="pd-description">{product.description}</p>

          <div className="pd-actions">
            <div className="quantity-selector">
              <span style={{ fontWeight: 500 }}>Quantity:</span>
              <button className="quantity-btn" onClick={() => handleQuantityChange('dec')}><Minus size={18} /></button>
              <input type="text" className="quantity-input" value={quantity} readOnly />
              <button className="quantity-btn" onClick={() => handleQuantityChange('inc')}><Plus size={18} /></button>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary btn-add-cart" onClick={handleAddToCart}>
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button 
                className={`btn btn-outline btn-wishlist ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle Wishlist"
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
