import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import InfoPage from './pages/InfoPage';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            
            {/* Static Info Pages */}
            <Route path="/about" element={<InfoPage title="About Us" content={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p>Welcome to <strong>ShopNest</strong>! We are dedicated to providing the best tech products, accessories, and furniture with top-notch customer service.</p>
                <p>Founded in 2026, we have quickly become a leading online retailer thanks to our passionate team and loyal customers. Our mission is to make premium quality products accessible to everyone at unbeatable prices.</p>
                <p>We source our inventory from the most trusted manufacturers across the globe, ensuring that every item meets our strict quality standards.</p>
              </div>
            } />} />
            
            <Route path="/contact" element={<InfoPage title="Contact Us" content={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p>Have a question or need assistance? We're here to help!</p>
                <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li><strong>Email:</strong> support@shopnest.com</li>
                  <li><strong>Phone:</strong> +91 98765 43210</li>
                  <li><strong>Address:</strong> 123 E-Commerce St, Tech City, TC 10100</li>
                </ul>
                <p>Our customer service team is available Monday through Friday, 9:00 AM to 5:00 PM (EST).</p>
              </div>
            } />} />
            
            <Route path="/faq" element={<InfoPage title="Frequently Asked Questions" content={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Do you ship internationally?</h3>
                  <p>Yes! We currently ship to over 50 countries worldwide. International shipping rates will be calculated at checkout.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>How can I track my order?</h3>
                  <p>Once your order ships, you will receive an email with a tracking number. You can also track your order directly on our website using the 'Track Order' link in the footer.</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>What payment methods do you accept?</h3>
                  <p>We accept all major credit cards (Visa, MasterCard, Amex), PayPal, Apple Pay, and Google Pay.</p>
                </div>
              </div>
            } />} />
            
            <Route path="/shipping" element={<InfoPage title="Shipping Policy" content={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p>We are committed to delivering your products as quickly and safely as possible.</p>
                <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li><strong>Standard Shipping:</strong> Free for orders over $100. Delivery within 3-5 business days.</li>
                  <li><strong>Express Shipping:</strong> $15 flat rate. Delivery within 1-2 business days.</li>
                  <li><strong>International Shipping:</strong> Calculated at checkout based on destination.</li>
                </ul>
                <p>Orders are processed within 24 hours. Orders placed on weekends or holidays will be processed the next business day.</p>
              </div>
            } />} />
            
            <Route path="/returns" element={<InfoPage title="Returns & Refunds" content={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p>We want you to be completely satisfied with your purchase. If you are not happy with your order, we offer a hassle-free return process.</p>
                <p><strong>Return Window:</strong> You may return eligible items within 30 days of the delivery date for a full refund or exchange.</p>
                <p><strong>Conditions:</strong> Items must be in their original condition, unworn, unused, and with all original tags and packaging attached.</p>
                <p>To initiate a return, please contact our support team with your order number.</p>
              </div>
            } />} />
            
            <Route path="/track" element={<InfoPage title="Track Your Order" content={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p>To track your order, please enter your tracking number below.</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <input type="text" placeholder="Enter tracking number..." style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
                  <button className="btn btn-primary">Track</button>
                </div>
              </div>
            } />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
