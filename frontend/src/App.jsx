import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Navbar />
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          E-Commerce ©{new Date().getFullYear()} Created by Your Company
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
