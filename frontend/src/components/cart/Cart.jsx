import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdArrowBack, MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ItemContent from "./ItemContent";
import CartEmpty from "./CartEmpty";
import { formatPrice } from "../../utils/formatPrice";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const { selectedUserCheckoutAddress } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const fetchCart = () => {
        if (!token) {
            setError('Please login first');
            setLoading(false);
            return;
        }

        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setCart(res.data);
                dispatch({ type: "GET_USER_CART_PRODUCTS", payload: res.data.items });
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch cart');
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const removeItem = (productId) => {
        if (!token) return;
        axios.delete(`${import.meta.env.VITE_API_BASE_URL}/cart/remove?productId=${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => fetchCart())
            .catch(err => setError('Failed to remove item'));
    };

    const updateQuantity = (productId, quantity) => {
        if (!token) return;
        axios.put(`${import.meta.env.VITE_API_BASE_URL}/cart/update?productId=${productId}&quantity=${quantity}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => fetchCart())
            .catch(err => setError('Failed to update quantity'));
    };

    const handlePlaceOrder = async () => {
        if (!selectedUserCheckoutAddress?.addressId) {
            toast.error("请先在地址管理中选择或添加收货地址！");
            return;
        }
        if (!cart?.items?.length) {
            toast.error("购物车为空，无法下单！");
            return;
        }
        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/orders`,
                {
                    addressId: selectedUserCheckoutAddress.addressId,
                    items: cart.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity
                    }))
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("下单成功！");
            fetchCart(); // 下单后刷新购物车
        } catch (err) {
            toast.error("下单失败，请重试！");
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
    if (!token) return <div className="text-center py-10">Please login first</div>;

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
            {!cart?.items || cart.items.length === 0 ? (
                <div className="text-gray-500">Your cart is empty.</div>
            ) : (
                <div className="space-y-6">
                    {cart.items.map(item => (
                        <div key={item.productId} className="flex items-center justify-between bg-white p-4 rounded shadow">
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.imageUrl ? item.imageUrl : '/default.png'}
                                    alt={item.productName}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <div className="font-bold">{item.productName}</div>
                                    <div className="text-gray-500">${item.price}</div>
            </div>
                </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                                    disabled={item.quantity <= 1} 
                                    className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)} 
                                    className="px-2 py-1 bg-gray-200 rounded"
                                >
                                    +
                                </button>
                                <button 
                                    onClick={() => removeItem(item.productId)} 
                                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                </div>
            </div>
                    ))}
                    <div className="mt-6 text-right">
                        <div className="text-xl font-bold">
                            Total: ${cart.totalAmount?.toFixed(2) || '0.00'}
            </div>
                        <button
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => navigate('/checkout')}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;