import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Spin, message } from 'antd';
import { Link } from 'react-router-dom';
import request from '../services/request';

const { Title } = Typography;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request.get('/products')
      .then(res => setProducts(res.data))
      .catch(() => message.error('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '24px 0' }}>
      <Title level={2}>Product List</Title>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map(product => (
            <Col span={6} key={product.id}>
              <Link to={`/products/${product.id}`}>
                <Card
                  hoverable
                  cover={<img alt={product.name} src={product.imageUrl || 'https://via.placeholder.com/200'} />}
                >
                  <Card.Meta
                    title={product.name}
                    description={`$${product.price}`}
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductList; 