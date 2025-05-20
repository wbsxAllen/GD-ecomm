import { useState } from 'react';
import { List, Card, Typography, Tag, Button, Empty } from 'antd';

const { Title } = Typography;

const Orders = () => {
  // TODO: Replace with real order data from backend
  const [orders] = useState([
    { id: 1, status: 'Delivered', total: 299.99, date: '2024-05-18' },
    { id: 2, status: 'Pending', total: 149.99, date: '2024-05-17' },
  ]);

  return (
    <div style={{ padding: '24px 0', maxWidth: 700, margin: '0 auto' }}>
      <Title level={2}>My Orders</Title>
      {orders.length === 0 ? (
        <Empty description="No orders found" />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={orders}
          renderItem={order => (
            <List.Item key={order.id}>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Title level={4}>Order #{order.id}</Title>
                    <div>Date: {order.date}</div>
                    <div>Status: <Tag color={order.status === 'Delivered' ? 'green' : 'orange'}>{order.status}</Tag></div>
                  </div>
                  <div>
                    <Title level={5}>Total: ${order.total}</Title>
                    <Button type="primary">View Details</Button>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Orders; 