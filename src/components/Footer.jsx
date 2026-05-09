import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-brand">
            <h2><ShoppingBag size={24} /> ShopNest</h2>
            <p>Your ultimate destination for premium quality products. We offer the best deals and the most reliable delivery services.</p>
            <div className="social-icons">
              <a href="https://github.com/aagamjain45" target="_blank" rel="noopener noreferrer" aria-label="Github">GitHub</a>
              <a href="https://www.linkedin.com/in/aagamjain45" target="_blank" rel="noopener noreferrer" aria-label="Linkedin">LinkedIn</a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">All Products</a></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping Policy</Link></li>
              <li><Link to="/returns">Returns & Refunds</Link></li>
              <li><Link to="/track">Track Order</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Contact Info</h3>
            <ul>
              <li>Email: support@shopnest.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: 123 E-Commerce St, Tech City, TC 10100</li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ShopNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
