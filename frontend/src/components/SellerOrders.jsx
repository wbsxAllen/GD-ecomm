import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/orders/seller`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(data);
      } catch (err) {
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">My Store Orders</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Order #</th>
            <th className="p-2">Buyer</th>
            <th className="p-2">Created</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr><td colSpan={6} className="text-center py-6">No orders found.</td></tr>
          ) : (
            orders.map(order => (
              <React.Fragment key={order.id}>
                <tr className="border-b">
                  <td className="p-2">{order.orderNumber}</td>
                  <td className="p-2">{order.userId}</td>
                  <td className="p-2">{order.createTime?.slice(0, 19).replace('T', ' ')}</td>
                  <td className="p-2">${order.totalAmount}</td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2">
                    <button className="text-blue-600 underline" onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                      {expanded === order.id ? 'Hide' : 'Show'}
                    </button>
                  </td>
                </tr>
                {expanded === order.id && (
                  <tr>
                    <td colSpan={6} className="bg-gray-50">
                      <div className="p-4">
                        <div className="font-semibold mb-2">Order Items:</div>
                        <table className="w-full text-sm">
                          <thead>
                            <tr>
                              <th className="p-1">Product</th>
                              <th className="p-1">Quantity</th>
                              <th className="p-1">Unit Price</th>
                              <th className="p-1">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.orderItems.map(item => (
                              <tr key={item.id}>
                                <td className="p-1">{item.productName}</td>
                                <td className="p-1">{item.quantity}</td>
                                <td className="p-1">${item.price}</td>
                                <td className="p-1">${item.subtotal}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SellerOrders; 