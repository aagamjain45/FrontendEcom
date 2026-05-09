import './Skeleton.css';

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img"></div>
      <div className="skeleton skeleton-text category"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text short"></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <div className="skeleton skeleton-price"></div>
        <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }}></div>
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="skeleton-grid">
      {Array(count).fill(0).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
