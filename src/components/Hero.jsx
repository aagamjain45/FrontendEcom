import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section container">
      <div className="hero-container">
        
        <div className="hero-content">
          <h1 className="hero-title">Discover the Best Tech & Accessories</h1>
          <p className="hero-subtitle">
            Upgrade your lifestyle with our premium selection of electronics, 
            wearables, and home accessories. Unbeatable prices and fast shipping.
          </p>
          <Link to="/#products" className="btn btn-primary" onClick={(e) => {
             // Basic smooth scroll to products
             const productsSection = document.getElementById('products');
             if(productsSection) {
               e.preventDefault();
               productsSection.scrollIntoView({ behavior: 'smooth' });
             }
          }}>
            Shop Now <ArrowRight size={20} />
          </Link>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-blob"></div>
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" 
            alt="Modern gadgets layout" 
            className="hero-image"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
