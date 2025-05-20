import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Spin } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch product list from backend API
    // Using mock data for now
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'Product 1', price: 99.99, image: 'https://via.placeholder.com/200' },
        { id: 2, name: 'Product 2', price: 149.99, image: 'https://via.placeholder.com/200' },
        { id: 3, name: 'Product 3', price: 199.99, image: 'https://via.placeholder.com/200' },
        { id: 4, name: 'Product 4', price: 299.99, image: 'https://via.placeholder.com/200' },
      ]);
      setLoading(false);
    }, 500);
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
                  cover={<img alt={product.name} src={product.image} />}
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