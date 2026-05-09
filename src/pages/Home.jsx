import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { SkeletonGrid } from '../components/Skeleton';
import { products as dummyProducts } from '../data/products';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const location = useLocation();

  // Parse search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  // Get unique categories
  const categories = ['All', ...new Set(dummyProducts.map(p => p.category))];

  useEffect(() => {
    // Simulate API fetch delay
    setLoading(true);
    const timer = setTimeout(() => {
      let filteredProducts = [...dummyProducts];
      
      // 1. Search logic
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // 2. Category Filter
      if (selectedCategory !== 'All') {
        filteredProducts = filteredProducts.filter(product => 
          product.category === selectedCategory
        );
      }

      // 3. Sorting
      if (sortBy === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        filteredProducts.sort((a, b) => b.rating - a.rating);
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 600); // reduced loading simulation to feel snappier

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="home-page">
      {!searchQuery && <Hero />}

      <section id="products" className="container">
        <div className="section-header">
          <h2 className="section-title">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
          </h2>
          <p className="section-subtitle">
            {searchQuery 
              ? `Found ${products.length} products`
              : 'Explore our latest collection of premium products'}
          </p>
        </div>

        <div className="filters-bar">
          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select 
              id="category" 
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort">Sort By:</label>
            <select 
              id="sort" 
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {loading ? (
          <SkeletonGrid count={8} />
        ) : products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No products found.</h3>
            <p>Try adjusting your search query.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
