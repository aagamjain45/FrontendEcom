import { useContext, useEffect } from 'react';
import { User } from 'lucide-react';
import { OrderContext } from '../context/OrderContext';
import './Profile.css';

const Profile = () => {
  const { orders } = useContext(OrderContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container profile-page">
      <h1 className="profile-title">My Account</h1>

      <div className="profile-container">
        {/* Sidebar - User Info */}
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <User size={64} />
          </div>
          <h2 className="profile-name">Aagam</h2>
          <p className="profile-detail">aagamj16@gmail.com</p>
          <p className="profile-detail">+91 99810 28375</p>
          <p className="profile-detail" style={{ marginTop: '1rem', maxWidth: '200px' }}>
            123 E-Commerce St, Tech City, TC 10100
          </p>
        </div>

        {/* Content - Order History */}
        <div className="profile-content">
          <h2 className="section-title">Order History</h2>

          {orders.length === 0 ? (
            <div className="empty-orders">
              <p>You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div>
                      <div className="order-id">Order ID: {order.id}</div>
                      <div className="order-date">
                        Placed on {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                    </div>
                    <div className={`order-status ${order.status === 'Processing' ? 'processing' : ''}`}>
                      {order.status}
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item">
                        <span>{item.title} x{item.quantity}</span>
                        <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <span>Total Amount:</span>
                    <span>₹{order.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
