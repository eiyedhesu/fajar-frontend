import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import {Button, Container, Form} from 'react-bootstrap'
import { Col, Row } from 'antd'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Konfirmasi = () => {
    const[auth, setAuth] = useAuth()
    const [shippingAddress, setShippingAddress] = useState(null);
    const [delivery_adress, setSelectedAddress] = useState()
    const [deliveryFee] = useState(20000)
    //urang nambah didieu
    const [subtotalPrice, setSubtotalPrice] = useState()
    //urang nambah didieu sampai dieu
    const [totalPrice, setTotalPrice] = useState()
    const [cartItems, setCartItems] = useState([]); 
    const [order, setOrder] = useState()
  
    const navigate = useNavigate()
   
    useEffect(() => {
        const storedData = localStorage.getItem('auth');
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            console.log(parsedData);
            return setAuth(parsedData) 
            
          } catch (error) {
            console.error('error', error);
          }
        }
      }, []);
    
      const getAddress = async () => {
        console.log(auth);
        try {
          const response = await axios.get('http://localhost:8000/api/delivery-addresses/:id', {
            headers: {
              'Authorization': `Bearer ${auth?.token}`,
            },
          });
            console.log(response);
          if (response.status === 200) {
            
            setShippingAddress(response.data.data);
          } else {
            console.error('Error fetching address:', response.data.message);
          }
        } catch (error) {
          console.error('Error fetching address', error);
        }
      };
    
    

      const getItems = async () => {

        try {
          const response = await axios.get('http://localhost:8000/api/carts', {
            headers: {
              'Authorization': `Bearer ${auth?.token}`,
            }
          });
          setCartItems(response.data);
          //urang nambah didieu
          getSubtotalPrice(response.data)
          //urang nambah didieu sampai dieu
          getTotalPrice(response.data);
          console.log(response.data)
          console.log('response.data');
        } catch (error) {
          console.error(error);
        }
      };

    
      const handleAddressChange = (e) => {
        setSelectedAddress(e.target.value);
      };


      //urang nambah didieu
      const getSubtotalPrice = (items) => {
        let subtotal = 0;
      
        if (Array.isArray(items)) {
          items.forEach((item) => {
            subtotal = item.price * item.qty
          });
        }
      
        setSubtotalPrice(subtotal);
      };
      //urang nambah didieu sampai dieu
      
      const getTotalPrice = (items) => {
        let total = 0;
      
        if (Array.isArray(items)) {
          items.forEach((item) => {
            total = (item.price * item.qty) + deliveryFee
          });
        }
      
        setTotalPrice(total);
      };

    useEffect(()=> {
        getItems()
        getAddress()
    },[])

    const handleOrder = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/orders',{
         
             deliveryFee,
            delivery_adress
          
        })
        setOrder(response)
        navigate('/invoice')
      } catch (error) {
        console.log(error);
      }
    }

    return (
    
    <Layout>
      <Container className='container-konfirmasi'>
        <Row>
            <Col md={4}>Pilih Alamat</Col>
            <Col md={4}>
            <Form.Group controlId="SelectedAddress">
              <Form.Label>Pilih Alamat</Form.Label>
              <Form.Control
                as="select"
                name="Address"
                value={delivery_adress}
                onChange={handleAddressChange}
              >
                
                 <option value="">Pilih Alamat...</option>
                  {shippingAddress?.map((address) => (
                 <option key={address._id} value={address._id}>
                  {address.nama}
                </option>
               ))}
                  
            </Form.Control>
            </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md={4}>Sub Total</Col>
            <Col md={4}>{subtotalPrice}</Col>
        </Row>
        <Row>
            <Col md={4}>Delivery Fee</Col>
            <Col md={4}>{deliveryFee}</Col>
        </Row>
        <Row>
            <Col md={4}>Total</Col>
            <Col md={4}>{totalPrice}</Col>
        </Row>
        <Row>
            <Col md={4}>
                <Button onClick={handleOrder} >Bayar</Button>
            </Col>
            
        </Row>
    </Container>
    </Layout>
  )
}

export default Konfirmasi
