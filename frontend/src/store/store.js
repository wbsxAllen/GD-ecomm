import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducers/ProductReducer';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';
import errorReducer from './reducers/errorReducer';
import paymentMethodReducer from './reducers/paymentMethodReducer';

const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
    error: errorReducer,
    paymentMethod: paymentMethodReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 