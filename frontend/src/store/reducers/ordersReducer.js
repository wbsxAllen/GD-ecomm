const initialState = {
    orders: [],
    orderDetail: null,
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_ORDERS":
            return { ...state, orders: action.payload };
        case "FETCH_ORDER_DETAIL":
            return { ...state, orderDetail: action.payload };
        default:
            return state;
    }
}; 