import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { WishlistContext } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlistItems } = useContext(WishlistContext);

  return (
    <div className="container" style={{ padding: '2rem 0', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        Your Wishlist ({wishlistItems.length})
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="empty-cart" style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <Heart size={64} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
          <h2 style={{ marginBottom: '1rem' }}>Your wishlist is empty</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Save items you love to your wishlist to easily find them later.</p>
          <Link to="/" className="btn btn-primary">
            Explore Products <ArrowRight size={20} />
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
