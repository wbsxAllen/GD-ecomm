import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import Status from './shared/Status';
import { MdDone, MdClose, MdPending } from 'react-icons/md';
import toast from 'react-hot-toast';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'COMPLETED':
      case 'PAID':
        return {
          text: status,
          icon: MdDone,
          bg: 'bg-teal-200',
          color: 'text-teal-900'
        };
      case 'CANCELLED':
        return {
          text: status,
          icon: MdClose,
          bg: 'bg-rose-200',
          color: 'text-rose-700'
        };
      default:
        return {
          text: status,
          icon: MdPending,
          bg: 'bg-yellow-200',
          color: 'text-yellow-900'
        };
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      setCancelling(true);
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders/${id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh order data
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/orders/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrder(data);
      toast.success('Order cancelled successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/orders/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrder(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="text-red-500">{error}</div>
      <button
        onClick={() => navigate('/profile/orders')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <FaArrowLeft /> Back to Orders
      </button>
    </div>
  );

  if (!order) return null;

  const statusConfig = getStatusConfig(order.status);
  const canCancel = order.status !== 'COMPLETED' && 
                   order.status !== 'CANCELLED' && 
                   order.status !== 'PAID';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/profile/orders')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft /> Back to Orders
        </button>
        <div className="flex items-center gap-4">
          {canCancel && (
            <button
              onClick={handleCancelOrder}
              disabled={cancelling}
              className={`px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {cancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
          <Status
            text={statusConfig.text}
            icon={statusConfig.icon}
            bg={statusConfig.bg}
            color={statusConfig.color}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Order #{order.orderNumber}</h1>
          <p className="text-gray-600">
            Placed on: {new Date(order.createTime).toLocaleString()}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-20 h-20 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.productName}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">Price: ${Number(item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
              <div className="bg-gray-50 p-4 rounded">
                <p>{order.shippingAddress?.fullName}</p>
                <p>{order.shippingAddress?.phoneNumber}</p>
                <p>{order.shippingAddress?.streetAddress}</p>
                <p>
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
                </p>
                <p>{order.shippingAddress?.country}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              <div className="bg-gray-50 p-4 rounded space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${Number(order.totalAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total:</span>
                  <span>${Number(order.totalAmount).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail; 