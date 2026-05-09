import { useEffect } from 'react';

const InfoPage = ({ title, content }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container" style={{ padding: '4rem 0', minHeight: '60vh' }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '2rem', 
        paddingBottom: '1rem', 
        borderBottom: '1px solid var(--border-color)',
        color: 'var(--text-primary)'
      }}>
        {title}
      </h1>
      <div 
        style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.8', 
          color: 'var(--text-secondary)',
          maxWidth: '800px'
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default InfoPage;
