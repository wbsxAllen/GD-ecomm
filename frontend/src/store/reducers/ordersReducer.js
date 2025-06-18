const initialState = {
    orders: [],
    orderDetail: null,
    orderId: null,
    orderTotal: null,
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_ORDERS":
            return { ...state, orders: action.payload };
        case "FETCH_ORDER_DETAIL":
            return { ...state, orderDetail: action.payload };
        case "SET_ORDER_ID":
            return { ...state, orderId: action.payload };
        case "SET_ORDER_TOTAL":
            return { ...state, orderTotal: action.payload };
        default:
            return state;
    }
}; 