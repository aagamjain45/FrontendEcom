import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Sun, Moon, Search, Menu, ShoppingBag, User } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cartCount } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        
        {/* Logo */}
        <a href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingBag size={28} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.1' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>ShopNest</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '2px' }}>by Aagam</span>
          </div>
        </a>

        {/* Search Bar - Hidden on small mobile */}
        <div className="nav-search">
          <form onSubmit={handleSearch}>
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Action Icons */}
        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
          </button>

          <Link to="/wishlist" className="icon-btn">
            <Heart size={22} />
            {wishlistItems.length > 0 && (
              <span className="badge">{wishlistItems.length}</span>
            )}
          </Link>

          <Link to="/cart" className="icon-btn">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </Link>

          <Link to="/profile" className="icon-btn" aria-label="User Profile">
            <User size={22} />
          </Link>

          <button className="icon-btn mobile-menu-btn">
            <Menu size={24} />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
