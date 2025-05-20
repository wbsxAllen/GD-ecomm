import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import request from '../services/request';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await request.post('/auth/login', values);
      localStorage.setItem('token', response.data.token);
      message.success('Login successful!');
      navigate('/');
    } catch (error) {
      message.error(error.response?.data?.message || 'Login failed, please try again');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: 'calc(100vh - 200px)' 
    }}>
      <Card style={{ width: 400 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Username" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Login
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            Don't have an account? <Link to="/register">Register now</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login; 