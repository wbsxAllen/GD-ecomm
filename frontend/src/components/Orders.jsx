import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Status from './shared/Status';
import { MdDone, MdClose, MdPending } from 'react-icons/md';
import { formatPrice } from '../utils/formatPrice';
import Paginations from './shared/Paginations';
import { useSearchParams } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchParams] = useSearchParams();
    const [pagination, setPagination] = useState({
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 1,
        lastPage: true
    });
    const navigate = useNavigate();

    const fetchOrders = async () => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const token = localStorage.getItem('token');
            const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) - 1 : 0;
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/orders/my-orders?pageNumber=${currentPage}&pageSize=10`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setOrders(response.data.content || []);
            setPagination({
                pageNumber: response.data.pageNumber,
                pageSize: response.data.pageSize,
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages,
                lastPage: response.data.lastPage
            });
        } catch (err) {
            setErrorMessage('Failed to load orders.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [searchParams]);

    const getStatusComponent = (status) => {
        switch (status) {
            case 'COMPLETED':
                return <Status text="Completed" icon={MdDone} bg="bg-teal-200" color="text-teal-900" />;
            case 'CANCELLED':
                return <Status text="Cancelled" icon={MdClose} bg="bg-rose-200" color="text-rose-700" />;
            default:
                return <Status text="Pending" icon={MdPending} bg="bg-yellow-200" color="text-yellow-900" />;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (errorMessage) return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="text-center text-red-500 py-10">{errorMessage}</div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Orders</h2>
                <div className="text-gray-600">
                    Total Orders: {pagination.totalElements}
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No orders found.</p>
                    <button 
                        onClick={() => navigate('/products')}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order.id} 
                            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200">
                            <div className="p-4 border-b">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                                        <p className="text-gray-600 text-sm">
                                            Placed on {formatDate(order.createTime)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg mb-1">
                                            {formatPrice(order.totalAmount)}
                                        </div>
                                        {getStatusComponent(order.status)}
                                    </div>
                                </div>
                                
                                <div className="grid gap-4">
                                    {order.items && order.items.map(item => (
                                        <div key={item.id} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.productName}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-grow">
                                                <h4 className="font-medium">{item.productName}</h4>
                                                <p className="text-sm text-gray-600">
                                                    Quantity: {item.quantity} × {formatPrice(item.price)}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-semibold">
                                                    {formatPrice(item.quantity * item.price)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                    <div className="text-sm text-gray-600">
                                        Shipping to: {order.shippingAddress?.fullName}<br />
                                        {order.shippingAddress?.detail}, {order.shippingAddress?.city}
                                    </div>
                                    <button 
                                        onClick={() => navigate(`/profile/orders/${order.id}`)}
                                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {orders.length > 0 && (
                <div className="flex justify-center mt-6">
                    <Paginations 
                        numberOfPage={pagination.totalPages}
                        totalProducts={pagination.totalElements}
                    />
                </div>
            )}
        </div>
    );
};

export default Orders; 