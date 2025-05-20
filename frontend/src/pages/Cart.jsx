import { useState } from 'react';
import { Card, List, Button, Typography, Empty } from 'antd';

const { Title } = Typography;

const Cart = () => {
  // TODO: Replace with real cart data from backend or context
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 99.99, quantity: 1 },
    { id: 2, name: 'Product 2', price: 149.99, quantity: 2 },
  ]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '24px 0', maxWidth: 600, margin: '0 auto' }}>
      <Title level={2}>Shopping Cart</Title>
      {cartItems.length === 0 ? (
        <Empty description="Your cart is empty" />
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button danger onClick={() => handleRemove(item.id)}>Remove</Button>
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`Price: $${item.price} x ${item.quantity}`}
                />
              </List.Item>
            )}
          />
          <Card style={{ marginTop: 16 }}>
            <Title level={4}>Total: ${total.toFixed(2)}</Title>
            <Button type="primary" block>Checkout</Button>
          </Card>
        </>
      )}
    </div>
  );
};

export default Cart; 