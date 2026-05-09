import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

  const shippingEstimate = cartTotal > 100 ? 0 : 15;
  const taxEstimate = cartTotal * 0.08; // 8% tax
  const orderTotal = cartTotal + shippingEstimate + taxEstimate;

  if (cartItems.length === 0) {
    return (
      <div className="container cart-page">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="empty-cart">
          <ShoppingBag size={64} className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Link to="/" className="btn btn-primary">
            Start Shopping <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1 className="cart-title">Shopping Cart ({cartItems.length} items)</h1>

      <div className="cart-container">
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.title} className="cart-item-image" />
              </Link>
              
              <div className="cart-item-details">
                <h3 className="cart-item-title">
                  <Link to={`/product/${item.id}`}>{item.title}</Link>
                </h3>
                <div className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</div>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-selector" style={{ transform: 'scale(0.9)' }}>
                  <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <input type="text" className="quantity-input" value={item.quantity} readOnly />
                  <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <div className="item-total">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>

                <button 
                  className="btn-remove" 
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2 className="summary-title">Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shippingEstimate === 0 ? 'Free' : `₹${shippingEstimate.toLocaleString('en-IN')}`}</span>
          </div>
          
          <div className="summary-row">
            <span>Estimated Tax</span>
            <span>₹{taxEstimate.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{orderTotal.toLocaleString('en-IN')}</span>
          </div>

          <Link to="/checkout" className="btn btn-primary btn-checkout" style={{ display: 'block', textAlign: 'center', boxSizing: 'border-box' }}>
            Proceed to Checkout
          </Link>
          
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              or Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
