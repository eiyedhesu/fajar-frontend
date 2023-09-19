import React from 'react'
import Layout from '../components/Layout'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useCart } from '../context/cartContext'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'



const Cart = () => {
  const [auth] = useAuth()
  const [cart, setCart] = useCart()
  const isLoggedIn = auth?.token && auth?.user?.full_name
  const navigate = useNavigate()
  console.log(cart);

  const increaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        const updatedItem = { ...item, qty: (item.qty || 0) + 1 };
        return updatedItem;
      }
      return item;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId && (item.qty || 0) > 1) {
        const updatedItem = { ...item, qty: (item.qty || 0) - 1 };
        return updatedItem;
      }
      return item;
    });
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.qty;
  }, 0);


  const removeCartItems = (productid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex(item => item._id === productid)
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem('cart', JSON.stringify(myCart))
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <Layout>
      <Container>
        <Row>
          <Col className='text-center p-2'>
            <h1>{`Hello ${isLoggedIn ? auth.user.full_name : 'Guest'}`}</h1>

            {cart?.length > 0 ? (
              <div>
                <h4>{`Ada ${cart.length} barang di keranjang belanja`}</h4>
                {isLoggedIn ? null : <p>Kamu belum login, yuk login dulu sebelum checkout</p>}

                <Row >
                  <Col md={9}>
                    {
                      cart?.map(product => (
                        <Row className='m-2' style={{ border: '2px solid #ccc', padding: '10px' }} >
                          <Col md={4}>
                            <Card style={{ width: '15rem' }}>
                              <Card.Img
                                variant="top"
                                src={`http://localhost:8000/api/products-photo/${product._id}`}
                                className="custom-image"
                                alt={product.name}
                              />
                            </Card>
                          </Col>
                          <Col md={8}>
                            <h4>{product.name}</h4>
                            <p> {product.description.substring(0, 30)} </p>
                            <p> Price : Rp. {product.price} </p>


                            <p>
                              <Button variant='dark' onClick={() => increaseQuantity(product.id)}>+</Button>
                              {""} {product.qty} {""}
                              <Button variant='dark' onClick={() => decreaseQuantity(product.id)}>-</Button>
                            </p>

                            <Button variant='dark' onClick={() => removeCartItems(product._id)} > Hapus Product </Button>
                          </Col>
                        </Row>

                      ))
                    }
                  </Col>
                  <Col md={3}>
                    <h3>Rincian Product</h3>

                    <hr />
                    <h4> Total: Rp. {totalPrice} </h4>

                    <Link
                      to={{
                        pathname: '/order',
                        state: { cart: cart },
                      }}
                    >
                      <Button variant="dark" className="ms-1">
                        Order
                      </Button>
                    </Link>

                  </Col>
                </Row>
              </div>
            ) : (
              <h4>Keranjang kamu kosong</h4>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Cart
