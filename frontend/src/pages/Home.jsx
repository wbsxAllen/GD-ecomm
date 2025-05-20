import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Carousel } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // TODO: Fetch categories and featured products from backend API
    // Using mock data for now
    setCategories([
      { id: 1, name: 'Electronics', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Clothing', image: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Food', image: 'https://via.placeholder.com/150' },
      { id: 4, name: 'Home', image: 'https://via.placeholder.com/150' },
    ]);

    setFeaturedProducts([
      { id: 1, name: 'Product 1', price: 99.99, image: 'https://via.placeholder.com/200' },
      { id: 2, name: 'Product 2', price: 149.99, image: 'https://via.placeholder.com/200' },
      { id: 3, name: 'Product 3', price: 199.99, image: 'https://via.placeholder.com/200' },
      { id: 4, name: 'Product 4', price: 299.99, image: 'https://via.placeholder.com/200' },
    ]);
  }, []);

  return (
    <div style={{ padding: '24px 0' }}>
      {/* Carousel */}
      <Carousel autoplay style={{ marginBottom: '24px' }}>
        <div>
          <h3 style={{ height: '300px', background: '#364d79', color: '#fff', textAlign: 'center', lineHeight: '300px' }}>
            Promotion 1
          </h3>
        </div>
        <div>
          <h3 style={{ height: '300px', background: '#364d79', color: '#fff', textAlign: 'center', lineHeight: '300px' }}>
            Promotion 2
          </h3>
        </div>
      </Carousel>

      {/* Categories */}
      <Title level={2}>Categories</Title>
      <Row gutter={[16, 16]}>
        {categories.map(category => (
          <Col span={6} key={category.id}>
            <Link to={`/products?category=${category.id}`}>
              <Card
                hoverable
                cover={<img alt={category.name} src={category.image} />}
              >
                <Card.Meta title={category.name} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Featured Products */}
      <Title level={2} style={{ marginTop: '24px' }}>Featured Products</Title>
      <Row gutter={[16, 16]}>
        {featuredProducts.map(product => (
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
    </div>
  );
};

export default Home; 