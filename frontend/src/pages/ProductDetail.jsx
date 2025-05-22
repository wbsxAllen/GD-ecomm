import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Button, Spin, message } from 'antd';
import request from '../services/request';

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => message.error('Failed to load product'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spin size="large" />;

  if (!product) return <div>Product not found.</div>;

  return (
    <div style={{ padding: '24px 0', display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: 600 }} cover={<img alt={product.name} src={product.imageUrl || 'https://via.placeholder.com/400'} />}>
        <Title level={2}>{product.name}</Title>
        <Paragraph>{product.description}</Paragraph>
        <Title level={4}>Price: ${product.price}</Title>
        <Paragraph>Stock: {product.stock}</Paragraph>
        <Paragraph>Scale: {product.scale}</Paragraph>
        <Paragraph>Grade: {product.grade}</Paragraph>
        <Paragraph>Series: {product.series}</Paragraph>
        <Button type="primary">Add to Cart</Button>
      </Card>
    </div>
  );
};

export default ProductDetail; 