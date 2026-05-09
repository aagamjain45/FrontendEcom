import { createContext, useState, useEffect } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) return JSON.parse(savedOrders);
    
    // Initial dummy data
    return [
      {
        id: "SN-948271",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        total: 24999,
        status: "Delivered",
        items: [
          { title: "Premium Wireless Headphones", quantity: 1, price: 24999 }
        ]
      },
      {
        id: "SN-102934",
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        total: 12499,
        status: "Delivered",
        items: [
          { title: "Minimalist Mechanical Keyboard", quantity: 1, price: 12499 }
        ]
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
