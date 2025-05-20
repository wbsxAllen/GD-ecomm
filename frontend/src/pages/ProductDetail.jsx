import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Button, Spin } from 'antd';

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch product detail from backend API
    // Using mock data for now
    setTimeout(() => {
      setProduct({
        id,
        name: `Product ${id}`,
        price: 199.99,
        description: 'This is a detailed description of the product.',
        image: 'https://via.placeholder.com/400',
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <Spin size="large" />;

  if (!product) return <div>Product not found.</div>;

  return (
    <div style={{ padding: '24px 0', display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: 600 }} cover={<img alt={product.name} src={product.image} />}>
        <Title level={2}>{product.name}</Title>
        <Paragraph>{product.description}</Paragraph>
        <Title level={4}>Price: ${product.price}</Title>
        <Button type="primary">Add to Cart</Button>
      </Card>
    </div>
  );
};

export default ProductDetail; 