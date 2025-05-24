import api from '../../api/api';

// Authentication related actions
export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post("/auth/signin", sendData);
        dispatch({ type: "LOGIN_USER", payload: data });
        localStorage.setItem("auth", JSON.stringify(data));
        reset();
        toast.success("Login successful");
        navigate("/");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Server error");
    } finally {
        setLoader(false);
    }
};

export const registerNewUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const { data } = await api.post("/auth/signup", sendData);
        reset();
        toast.success(data?.message || "Registration successful");
        navigate("/login");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || error?.response?.data?.password || "Server error");
    } finally {
        setLoader(false);
    }
};

export const logOutUser = (navigate) => (dispatch) => {
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("auth");
    navigate("/login");
};

// Address related actions
export const addUpdateUserAddress = (sendData, toast, addressId, setOpenAddressModal) => async (dispatch) => {
    dispatch({ type: "BUTTON_LOADER" });
    try {
        if (!addressId) {
            await api.post("/addresses", sendData);
        } else {
            await api.put(`/addresses/${addressId}`, sendData);
        }
        dispatch(getUserAddresses());
        toast.success("Address saved successfully");
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Server error");
        dispatch({ type: "IS_ERROR", payload: null });
    } finally {
        setOpenAddressModal(false);
    }
};

export const deleteUserAddress = (toast, addressId, setOpenDeleteModal) => async (dispatch) => {
    try {
        dispatch({ type: "BUTTON_LOADER" });
        await api.delete(`/addresses/${addressId}`);
        dispatch({ type: "IS_SUCCESS" });
        dispatch(getUserAddresses());
        dispatch(clearCheckoutAddress());
        toast.success("Address deleted successfully");
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "An error occurred",
        });
    } finally {
        setOpenDeleteModal(false);
    }
};

export const getUserAddresses = () => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`/addresses`);
        dispatch({ type: "USER_ADDRESS", payload: data });
        dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch addresses",
        });
    }
};

export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    };
};

export const clearCheckoutAddress = () => {
    return {
        type: "REMOVE_CHECKOUT_ADDRESS",
    };
};

// 占位导出，防止页面报错
export const fetchProducts = () => () => {}; 