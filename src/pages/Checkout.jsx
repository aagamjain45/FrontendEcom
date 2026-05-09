import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, ArrowLeft } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { OrderContext } from '../context/OrderContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shippingEstimate = cartTotal > 10000 ? 0 : 500;
  const taxEstimate = cartTotal * 0.18; // 18% GST example
  const orderTotal = cartTotal + shippingEstimate + taxEstimate;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new order
    const newId = `SN-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: newId,
      date: new Date().toISOString(),
      total: orderTotal,
      status: "Processing",
      items: cartItems.map(item => ({ title: item.title, quantity: item.quantity, price: item.price }))
    };
    
    addOrder(newOrder);
    setOrderId(newId);
    setIsSuccess(true);
    window.scrollTo(0, 0);
  };

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="container checkout-page" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Your cart is empty</h2>
        <p style={{ margin: '1rem 0 2rem', color: 'var(--text-secondary)' }}>You cannot proceed to checkout with an empty cart.</p>
        <Link to="/" className="btn btn-primary">Return to Shop</Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="container checkout-page">
        <div className="order-success">
          <CheckCircle size={80} className="success-icon" />
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with ShopNest. Your order has been confirmed and will be shipped shortly.</p>
          <p style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>Order ID: #{orderId}</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/profile" className="btn btn-outline" onClick={() => window.location.href = '/profile'}>
              View Orders
            </Link>
            <Link to="/" className="btn btn-primary" onClick={() => window.location.href = '/'}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/cart" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} /> Back to Cart
        </Link>
      </div>
      
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-container">
        
        {/* Billing & Shipping Form */}
        <form className="checkout-form-section" onSubmit={handleSubmit}>
          <h2 className="checkout-form-title">Billing Details</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input type="text" id="firstName" required placeholder="Enter your first name" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input type="text" id="lastName" required placeholder="Enter your last name" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" required placeholder="Enter your email address" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" required placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="address">Street Address *</label>
            <input type="text" id="address" required placeholder="House number and street name" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input type="text" id="city" required placeholder="City" />
            </div>
            <div className="form-group">
              <label htmlFor="state">State *</label>
              <input type="text" id="state" required placeholder="State" />
            </div>
            <div className="form-group">
              <label htmlFor="zip">ZIP / Postal Code *</label>
              <input type="text" id="zip" required placeholder="PIN Code" />
            </div>
          </div>

          <div className="payment-section">
            <h2 className="checkout-form-title">Payment Method</h2>
            <div className="payment-methods">
              <label className="payment-method">
                <input type="radio" name="payment" value="card" defaultChecked />
                <CreditCard size={20} />
                <span>Credit / Debit Card</span>
              </label>
              <label className="payment-method">
                <input type="radio" name="payment" value="upi" />
                <span style={{ fontWeight: 'bold', marginLeft: '2px', color: 'var(--accent-color)' }}>UPI</span>
                <span>Google Pay / PhonePe / Paytm</span>
              </label>
              <label className="payment-method">
                <input type="radio" name="payment" value="cod" />
                <span>Cash on Delivery (COD)</span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-place-order">
            Place Order (₹{orderTotal.toLocaleString('en-IN')})
          </button>
        </form>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h2 className="checkout-form-title">Your Order</h2>
          
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span className="summary-item-name">{item.title} <span style={{ color: 'var(--text-secondary)' }}>x{item.quantity}</span></span>
                <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shippingEstimate === 0 ? 'Free' : `₹${shippingEstimate.toLocaleString('en-IN')}`}</span>
          </div>
          
          <div className="summary-row">
            <span>Estimated Tax (GST)</span>
            <span>₹{taxEstimate.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="summary-row total" style={{ fontSize: '1.25rem', fontWeight: '700', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem', color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Total</span>
            <span>₹{orderTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
