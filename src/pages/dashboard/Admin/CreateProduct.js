import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
// import { useAuth } from '../../../context/auth';

const NewProduct = () => {
  const [userData, setUserData] = useState({
    token:''
  })
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  // const auth = useAuth()

  useEffect(() => {
    const storedData = localStorage.getItem('auth');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData({
          token: parsedData.token || ''
        });
      } catch (error) {
        console.error('error', error);
      }
    }
    axios
      .get('http://localhost:8000/api/categories')
      .then((response) => {
        setCategory(response.data);
        // console.log(response.data);
        // console.log('response.data');
      })
      .catch((error) => {
        console.error('Error fetching category:', error);
      });

    
    axios
      .get('http://localhost:8000/api/tags')
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    
    setSelectedCategory(e.target.value);
   
  };
  
  

  const handleTagSelection = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags((prevTags) => prevTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags((prevTags) => [...prevTags, tagId]);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('description', formData.description);
      data.append('category', selectedCategory);
      data.append('tags', selectedTags);
      data.append('image', imageFile);

      const response = await axios.post('http://localhost:8000/api/products',data,
        {
          headers: {
            'Authorization': `Bearer ${userData.token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      
      console.log('Product saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving Product', error);
    }
  };

  return (
    <Container>
      <Card>
        <Card.Header as="h1">Tambah Produk</Card.Header>
        <Card.Body>
          <Form onSubmit={saveProduct}>
            <Form.Group controlId="name">
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nama Produk..."
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Deskripsi Produk</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Deskripsi Produk..."
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Harga Produk</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Harga Produk..."
              />
            </Form.Group>

            <Form.Group controlId="Category">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                as="select"
                name="Category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                
                 <option value="">Pilih Kategori...</option>
                  {category.map((category) => (
                 <option key={category._id} value={category._id}>
                  {category.name}
                </option>
               ))}
                  
            </Form.Control>
            </Form.Group>
       

              
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              {tags.map((tag) => (
                <Form.Check
                  key={tag._id}
                  type="checkbox"
                  label={tag.name}
                  value={tag._id}
                  onChange={() => handleTagSelection(tag._id)}
                  checked={selectedTags.includes(tag._id)}
                />
              ))}
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Gambar Produck</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Form.Group>
                <br></br>
            <Button type="submit" variant="dark">
              Simpan
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewProduct;
