import { Card, Typography, Button } from 'antd';

const { Title, Paragraph } = Typography;

const Profile = () => {
  // TODO: Replace with real user data from backend or context
  const user = {
    username: 'john_doe',
    email: 'john@example.com',
    role: 'USER',
  };

  return (
    <div style={{ padding: '24px 0', maxWidth: 500, margin: '0 auto' }}>
      <Card>
        <Title level={2}>Profile</Title>
        <Paragraph><strong>Username:</strong> {user.username}</Paragraph>
        <Paragraph><strong>Email:</strong> {user.email}</Paragraph>
        <Paragraph><strong>Role:</strong> {user.role}</Paragraph>
        <Button type="primary">Edit Profile</Button>
      </Card>
    </div>
  );
};

export default Profile; 