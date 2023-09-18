import React from 'react'
import Layout from '../components/Layout'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useSearch } from '../context/searchContext'
import axios from 'axios'


const Search = () => {
  const [values] = useSearch()

  const handleAddToCart = (productId) => {
    axios.post('http://localhost:8000/api/carts', { product: productId, qty: 1 }) 
      .then((response) => {
        
        console.log('Item added to cart:', response.data);
      })
      .catch((error) => {
       console.log(error);
        console.error(error);
      });
  };  
  return (
    <Layout>
      <Container className='text-center'>
        <h1>Search Results</h1>
      <Row className="d-flex flex-wrap mt-4">
        {values?.results.data.map((product) => (
          <Col key={product._id} className="mb-4" xs={12} sm={6} md={4} lg={3}>
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
                <Button variant='dark' onClick={() => handleAddToCart(product._id)}>ADD TO CART </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
        </Container>
    </Layout>
  )
}

export default Search
