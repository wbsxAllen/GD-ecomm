import React, { useState, useEffect } from 'react'
import './App.css'
import Products from './components/products/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/shared/Navbar'
import Contact from './components/Contact'
import { Toaster } from 'react-hot-toast'
import Cart from './components/cart/Cart'
import LogIn from './components/auth/LogIn'
import PrivateRoute from './components/PrivateRoute'
import Register from './components/auth/Register'
import Checkout from './components/checkout/Checkout'
import PaymentConfirmation from './components/checkout/PaymentConfirmation'
import Profile from './components/Profile'
import Orders from './components/Orders'
import { useDispatch } from 'react-redux'
import axios from 'axios'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        dispatch({ type: "GET_USER_CART_PRODUCTS", payload: res.data.items })
      })
    }
  }, [dispatch])

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home />}/>
          <Route path='/products' element={ <Products />}/>
          <Route path='/profile' element={ <Profile />}/>
          <Route path='/profile/orders' element={ <Orders />}/>
          <Route path='/contact' element={ <Contact />}/>
          <Route path='/cart' element={ <Cart />}/>
        
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/checkout' element={ <Checkout />}/>
            <Route path='/order-confirm' element={ <PaymentConfirmation />}/>
          </Route>

          <Route path='/' element={<PrivateRoute publicPage />}>
            <Route path='/login' element={ <LogIn />}/>
            <Route path='/register' element={ <Register />}/>
          </Route>
        </Routes>
      </Router>
      <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App
