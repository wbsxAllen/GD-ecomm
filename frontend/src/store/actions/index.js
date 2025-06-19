import api from "../../api/api"
import axios from 'axios';

export const fetchProducts = (queryString = "") => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const url = queryString ? `/products?${queryString}` : "/products";
        const { data } = await api.get(url);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content || data,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products",
         });
    }
};


export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" });
        const { data } = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({ type: "IS_ERROR" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories",
         });
    }
};


export const addToCart = (data, qty = 1, toast) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    try {
        await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/cart/add?productId=${data.productId}&quantity=${qty}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: "GET_USER_CART_PRODUCTS", payload: res.data.items });
            toast.success(`${data?.productName} added to the cart`);
    } catch (err) {
        toast.error("Add to cart failed");
        }
};


export const increaseCartQuantity = 
    (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) => {
        // Find the product
        const { products } = getState().products;
        
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

        if (isQuantityExist) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);

            dispatch({
                type: "ADD_CART",
                payload: {...data, quantity: newQuantity + 1 },
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Quantity Reached to Limit");
        }

    };



export const decreaseCartQuantity = 
    (data, newQuantity) => (dispatch, getState) => {
        dispatch({
            type: "ADD_CART",
            payload: {...data, quantity: newQuantity},
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    }

export const removeFromCart =  (data, toast) => (dispatch, getState) => {
    dispatch({type: "REMOVE_CART", payload: data });
    toast.success(`${data.productName} removed from cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}



export const authenticateSignInUser 
    = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/login", sendData);
            dispatch({ type: "LOGIN_USER", payload: data });
            localStorage.setItem("auth", JSON.stringify(data));
            if (data.token) localStorage.setItem("token", data.token);
            if (data.user && data.user.id) localStorage.setItem("userId", data.user.id);
            reset();
            toast.success("Login Success");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
        } finally {
            setLoader(false);
        }
}


export const registerNewUser 
    = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/register", sendData);
            reset();
            toast.success(data?.message || "User Registered Successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
        } finally {
            setLoader(false);
        }
};


export const logOutUser = (navigate) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            await api.post(
                "/auth/logout",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        }
    } catch (e) {
        console.log("Logout API error:", e);
    } finally {
        dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("auth");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
    }
};

export const addUpdateUserAddress =
     (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState) => {
    dispatch({ type:"BUTTON_LOADER" });
    try {
        const token = localStorage.getItem('token');
        if (!addressId) {
            await api.post("/address/add", sendData, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } else {
            await api.put("/address/update", sendData, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }
        dispatch(getUserAddresses());
        toast.success("Address saved successfully");
        dispatch({ type:"IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
        dispatch({ type:"IS_ERROR", payload: null });
    } finally {
        setOpenAddressModal(false);
    }
};


export const deleteUserAddress = 
    (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
        dispatch({ type: "BUTTON_LOADER" });
        const token = localStorage.getItem('token');
        await api.delete(`/address/delete?id=${addressId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: "IS_SUCCESS" });
        dispatch(getUserAddresses());
        dispatch(clearCheckoutAddress());
        toast.success("Address deleted successfully");
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Some Error Occured",
         });
    } finally {
        setOpenDeleteModal(false);
    }
};

export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS",
    }
};

export const getUserAddresses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/address`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({type: "USER_ADDRESS", payload: data});
        dispatch({ type: "IS_SUCCESS" });
        const { selectedUserCheckoutAddress } = getState().auth;
        if ((!selectedUserCheckoutAddress || !selectedUserCheckoutAddress.addressId) && Array.isArray(data) && data.length > 0) {
            const defaultAddr = data.find(addr => addr.isDefault);
            if (defaultAddr) {
                dispatch(selectUserCheckoutAddress(defaultAddr));
            }
        }
    } catch (error) {
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user addresses",
         });
    }
};

export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
    
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    }
};


export const addPaymentMethod = (method) => {
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method,
    }
};


export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        await api.post('/cart/create', sendCartItems);
        await dispatch(getUserCart());
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to create cart items",
         });
    }
};


export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get('/carts/users/cart');
        
        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch cart items",
         });
    }
};


export const createStripePaymentSecret 
    = (totalPrice, orderId) => async (dispatch, getState) => {
        try {
            dispatch({ type: "IS_FETCHING" });
            const token = localStorage.getItem('token');
            const { data } = await api.post(
                "/payments/create-payment-intent",
                {
                    orderId,
                    amount: Number(totalPrice) * 100,
                    currency: "usd"
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            dispatch({ type: "CLIENT_SECRET", payload: data });
            localStorage.setItem("client-secret", JSON.stringify(data));
            dispatch({ type: "IS_SUCCESS" });
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create client secret");
        }
};


export const stripePaymentConfirmation 
    = (sendData, setErrorMesssage, setLoadng, toast) => async (dispatch, getState) => {
        try {
            const token = localStorage.getItem('token');
            await api.post("/payments/confirm", {
                paymentIntentId: sendData.pgPaymentId,
                status: sendData.pgStatus,
                message: sendData.pgResponseMessage
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            await api.post('/cart/clear', {}, { headers: { Authorization: `Bearer ${token}` } });
            localStorage.removeItem("CHECKOUT_ADDRESS");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("client-secret");
            dispatch({ type: "REMOVE_CLIENT_SECRET_ADDRESS"});
            dispatch({ type: "CLEAR_CART"});
            toast.success("Order Accepted");
        } catch (error) {
            setErrorMesssage("Payment Failed. Please try again.");
        }
};

export const fetchOrders = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: "FETCH_ORDERS", payload: data });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        dispatch({ type: "IS_ERROR", payload: error?.response?.data?.message || "Failed to fetch orders" });
    }
};

export const fetchOrderById = (orderId) => async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: "FETCH_ORDER_DETAIL", payload: data });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        dispatch({ type: "IS_ERROR", payload: error?.response?.data?.message || "Failed to fetch order detail" });
        }
};