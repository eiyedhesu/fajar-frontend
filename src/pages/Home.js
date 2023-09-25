import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Layout from '../components/Layout';
import axios from 'axios';
import { useCart } from '../context/cartContext';



function Home() {
  const [Products, setProducts] = useState([]);
  const [cart, setCart] = useCart()
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');

      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.error('Error in getProducts:', error);
    }
  }, []);

  const getCategory = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories');
      if (response.status === 200) {
        setCategory(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTags = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tags');
      if (response.status === 200) {
        setTags(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
    getTags();
  }, []);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/product-filters', {
        checked,
        radio,
      });
      console.log(response);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const currentItems = (filteredProducts?.length > 0 ? filteredProducts : Products).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addToCart = (productId) => {
    const updatedCart = [...cart, productId];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    axios.post('http://localhost:8000/api/carts', { product: productId, qty: 1 })
      .then((response) => {
        alert(`${response.data.name} added to cart `)
        console.log('Item added to cart:', response.data);
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  };


  return (
    <Layout>
      <Container fluid>
        <Row className="mt-5">
          <Col md={2}>
            <h5 className="text-center">Filters By Category</h5>
            <div className="d-flex flex-column">
              {category?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <br></br>
            <h5 className="text-center">Filters By Tags</h5>
            <div className="d-flex flex-column">
              <Checkbox.Group onChange={(checkedValues) => setRadio(checkedValues)}>
                {tags?.map((t) => (
                  <Checkbox key={t._id} value={t._id}>
                    {t.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
            <br></br>
            <div className="d-flex flex-column">
              <Button
                variant="dark"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </Button>
            </div>
          </Col>
          <Col md={10}>
            <h1 className="text-center">Products</h1>
            <Row className="d-flex flex-wrap">
              {currentItems.map((product) => (
                <Col key={product._id} className="mb-3" xs={12} sm={6} md={4} lg={3}>
                  <Card style={{ width: '15rem' }}>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8000/api/products-photo/${product._id}`}
                      className="custom-image"
                      alt={product.name}
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description.substring(0, 30)}...</Card.Text>
                      <Card.Text>Rp.{product.price}</Card.Text>
                      <Button variant='dark' onClick={() => addToCart(product._id)}>ADD TO CART </Button>

                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="text-center">
              <ul className="pagination">
                {Array.from({
                  length: Math.ceil(
                    (filteredProducts?.length > 0 ? filteredProducts.length : Products.length) /
                    itemsPerPage
                  ),
                }).map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <Button variant='dark' onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Home;
