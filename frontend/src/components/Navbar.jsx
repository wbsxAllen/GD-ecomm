import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="products">
        <Link to="/products">Products</Link>
      </Menu.Item>
      
      <div style={{ display: 'flex' }}>
        {isLoggedIn ? (
          <>
            <Menu.Item key="cart">
              <Link to="/cart">
                <ShoppingCartOutlined /> Cart
              </Link>
            </Menu.Item>
            <Menu.Item key="orders">
              <Link to="/orders">
                <UserOutlined /> My Orders
              </Link>
            </Menu.Item>
            <Menu.Item key="profile">
              <Link to="/profile">
                <UserOutlined /> Profile
              </Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
              <LogoutOutlined /> Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="login">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register">Register</Link>
            </Menu.Item>
          </>
        )}
      </div>
    </Menu>
  );
};

export default Navbar; 