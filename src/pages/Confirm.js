import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Button, Container, Form, Card, Table } from 'react-bootstrap'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cartContext'


const Konfirmasi = () => {
  const [auth, setAuth] = useAuth()
  const [shippingAddress, setShippingAddress] = useState(null);
  const [delivery_adress, setSelectedAddress] = useState()
  const [deliveryFee] = useState(20000)
  const [subtotalPrice, setSubtotalPrice] = useState()
  const [totalPrice, setTotalPrice] = useState()
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState()
  const navigate = useNavigate()
  const [cart, setCart] = useCart()
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
          'Authorization': `Bearer ${auth.token}`,
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
      getSubtotalPrice(response.data)
      getTotalPrice(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };


  const getSubtotalPrice = (items) => {
    let subtotal = 0;

    if (Array.isArray(items)) {
      items.forEach((item) => {
        subtotal = item.price * item.qty
      });
    }

    setSubtotalPrice(subtotal);
  };

  const getTotalPrice = (items) => {
    let total = 0;

    if (Array.isArray(items)) {
      items.forEach((item) => {
        total = (item.price * item.qty) + deliveryFee
      });
    }

    setTotalPrice(total);
  };

  useEffect(() => {
    getItems()
    getAddress()
  }, [auth.token])

  const handleOrder = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/orders', {
        deliveryFee,
        delivery_adress
      });
      const order_id = response.data.order_id;
      localStorage.removeItem('cart');
      setOrder(response)
      setCart([]);
      navigate(`/invoice/${order_id}`);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Card style={{ width: '80%' }}>
          <Card.Header>
            <h3>Konfirmasi Order</h3>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="SelectedAddress">
                <Form.Label>Select Address</Form.Label>
                <Form.Control
                  as="select"
                  name="Address"
                  value={delivery_adress}
                  onChange={handleAddressChange}
                >
                  <option value="">Select an Address...</option>
                  {shippingAddress?.map((address) => (
                    <option key={address._id} value={address._id}>
                      {address.nama}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
            <Table bordered>
              <tbody>
                <tr>
                  <td>Sub Total :</td>
                  <td>Rp. {subtotalPrice}</td>
                </tr>
                <tr>
                  <td>Delivery Fee :</td>
                  <td>Rp. {deliveryFee}</td>
                </tr>
                <tr>
                  <td>Total :</td>
                  <td>Rp. {totalPrice}</td>
                </tr>
              </tbody>
            </Table>
            <Button variant="dark" onClick={handleOrder}>
              Bayar
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default Konfirmasi
