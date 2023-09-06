import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../../context/auth';


const NewTag = () => {
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
      
      const response = await axios.post('http://localhost:8000/api/tags',formData,
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
    <Container>
    <Card>
      <Card.Header as="h1">Tambah Tags</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
          <Form.Label>Nama Tags</Form.Label>
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
</Container>
  );
};

export default NewTag;
