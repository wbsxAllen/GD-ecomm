import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchOrderById } from '../store/actions';
import toast from 'react-hot-toast';
import axios from 'axios';

const Orders = () => {
    const dispatch = useDispatch();
    const { orders, orderDetail, isLoading, errorMessage } = useSelector(state => ({
        orders: state.orders?.orders || [],
        orderDetail: state.orders?.orderDetail,
        isLoading: state.errors?.isLoading,
        errorMessage: state.errors?.errorMessage
    }));
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleOrderClick = (orderId) => {
        setSelectedOrderId(orderId);
        dispatch(fetchOrderById(orderId));
    };

    const handleCancelOrder = async (orderId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}/cancel`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Order cancelled!");
            dispatch(fetchOrders()); // Refresh order list
        } catch (err) {
            toast.error("Cancel failed, please try again!");
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            {isLoading && <div>Loading...</div>}
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <div className="space-y-4">
                {orders.length === 0 ? (
                    <div className="text-gray-500">No orders found.</div>
                ) : (
                    orders.map(order => (
                        <div key={order.id} className="border rounded p-4 shadow cursor-pointer hover:bg-gray-50" onClick={() => handleOrderClick(order.id)}>
                            <div className="font-bold">Order #{order.orderNumber}</div>
                            <div>Status: {order.status}</div>
                            <div>Total: ${order.totalAmount?.toFixed(2)}</div>
                            <div>Created: {order.createTime}</div>
                        </div>
                    ))
                )}
            </div>
            {orderDetail && selectedOrderId === orderDetail.id && (
                <div className="mt-8 p-6 border rounded shadow bg-white">
                    <h3 className="text-xl font-bold mb-2">Order Detail</h3>
                    <div>Order Number: {orderDetail.orderNumber}</div>
                    <div>Status: {orderDetail.status}</div>
                    <div>Total: ${orderDetail.totalAmount?.toFixed(2)}</div>
                    <div>Created: {orderDetail.createTime}</div>
                    <div className="mt-4">
                        <div className="font-semibold mb-2">Items:</div>
                        <ul className="list-disc pl-6">
                            {orderDetail.orderItems?.map(item => (
                                <li key={item.id}>
                                    {item.productName} x {item.quantity} @ ${item.price} = ${item.subtotal}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {orderDetail.status === "PENDING_PAYMENT" && (
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => handleCancelOrder(orderDetail.id)}
                        >
                            Cancel Order
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Orders; 