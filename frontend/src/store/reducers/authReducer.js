import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  address: [],
  clientSecret: null,
  selectedUserCheckoutAddress: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    userAddress: (state, action) => {
      state.address = action.payload;
    },
    selectCheckoutAddress: (state, action) => {
      state.selectedUserCheckoutAddress = action.payload;
    },
    removeCheckoutAddress: (state) => {
      state.selectedUserCheckoutAddress = null;
    },
    clientSecret: (state, action) => {
      state.clientSecret = action.payload;
    },
    removeClientSecretAddress: (state) => {
      state.clientSecret = null;
      state.selectedUserCheckoutAddress = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  userAddress,
  selectCheckoutAddress,
  removeCheckoutAddress,
  clientSecret,
  removeClientSecretAddress,
} = authSlice.actions;

export default authSlice.reducer; 