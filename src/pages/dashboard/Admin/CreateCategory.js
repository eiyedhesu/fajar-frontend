import React, { useState } from 'react';
import { Form, Button, Card, Col,Row,Tab } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../../context/auth';
import AdminMenu from '../../../components/AdminMenu';
import Layout from '../../../components/Layout';


const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const [auth] = useAuth(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('http://localhost:8000/api/categories',formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      console.log('Category saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving Category:', error);
    }
  };

  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
      <Tab.Container id="list-group-tabs" defaultActiveKey="#link1">
        <h1> Welcome {auth?.user?.full_name} </h1>
      <Row>
        <Col sm={3}>
          <AdminMenu />
        </Col>
        <Col sm={9}>
        <Card>
          <Card.Header as="h1">Tambah Kategori</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                />
              </Form.Group>
              <Button type="submit" variant="dark">
                Simpan
              </Button>
            </Form>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    </Tab.Container>
    </div>
    </Layout>
      
        
    
  );
};

export default CreateCategory;
