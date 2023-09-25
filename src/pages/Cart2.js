import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import Layout from '../components/Layout';
import { useAuth } from '../context/auth'
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';
const Cart2 = () => {
  const [auth] = useAuth()
  const [cart, setCart] = useCart()
  const isLoggedIn = auth?.token && auth?.user?.full_name
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const photoUrl = 'http://localhost:8000/api/products-photo';


  const getItems = async () => {

    try {
      const response = await axios.get('http://localhost:8000/api/carts');
      console.log(response);
      setCartItems(response.data);
      calculateTotalPrice(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItems();
  }, [auth.token]);

  const calculateTotalPrice = (items) => {
    let total = 0;

    if (Array.isArray(items)) {
      items.forEach((item) => {
        total += item.price * item.qty;
      });
    }

    setTotalPrice(total);
  };


  const updateCart = async (updatedItems) => {
    try {
      const response = await axios.put('http://localhost:8000/api/carts', {
        items: updatedItems,
      });
      console.log(response);
      getItems(response.data)
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = (item) => {
    const myCart = [...cart]
    const updatedCartItems = cartItems.filter((cartItem) => cartItem._id !== item._id);
    const index = cartItems.findIndex((cartItem) => cartItem._id !== item._id);
    myCart.splice(index, 1)
    setCart(myCart)
    updateCart(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems))
  };

  const updateQuantity = (item, newQuantity) => {
    const parsedQuantity = parseInt(newQuantity);

    if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
      console.log('Updating quantity for item:', item);
      console.log('New quantity:', parsedQuantity);

      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return { ...cartItem, qty: parsedQuantity };
        }
        return cartItem;
      });
      console.log('Updated cart items:', updatedCartItems);
      updateCart(updatedCartItems);
    }
  }


  return (
    <Layout >
      <Container>
        <h1>Shopping Cart</h1>
        <h1>{`Hello ${isLoggedIn ? auth.user.full_name : 'Guest'}`}</h1>
        {Array.isArray(cartItems) && cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Gambar Product</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(cartItems) && cartItems.length > 0 && cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={`${photoUrl}/${item.product._id}`}
                        className='custom-image-cart'
                        alt="Product"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => updateQuantity(item, e.target.value)}
                      />
                    </td>
                    <td>{item.price}</td>
                    <td>
                      <Button
                        variant="dark"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p>Total Price: Rp. {totalPrice}</p>
            <Link
              to={{
                pathname: '/konfirmasi'
              }}
            >
              <Button variant="dark" className="ms-1">
                Order
              </Button>
            </Link>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Cart2;
