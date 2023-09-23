import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import UserMenu from '../../../components/UserMenu';
import { Tab, Row, Col, Card, Table, Image } from 'react-bootstrap';
import { useAuth } from '../../../context/auth';
import axios from 'axios';

const Order = () => {
  const [auth] = useAuth();
  const [order, setOrder] = useState([]);

  const getOrder = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/orders', {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      });
      setOrder(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder([auth.token]);
  }, [auth.token]);

  function calculateGrandTotal(orderItems, deliveryFee) {
    const itemTotal = orderItems.reduce((total, item) => {
      const itemTotal = item.price * item.qty;
      return total + itemTotal;
    }, 0);

    return itemTotal + deliveryFee;
  }

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <Tab.Container id="list-group-tabs" defaultActiveKey="#link1">
          <h1>Welcome {auth?.user?.full_name}</h1>
          <Row>
            <Col sm={3}>
              <UserMenu />
            </Col>
            <Col sm={9}>
              {order?.map((order) => (
                <Card key={order._id} className="mb-3">
                  <Card.Body>
                    <Card.Title>Your Order Details</Card.Title>
                    <Table>
                      <tbody>
                        <tr>
                          <td>Detail Product :</td>
                          <td>Pengiriman :</td>
                          <td>Pembayaran :</td>
                        </tr>
                        <tr>
                          <td>
                            <div>
                              <ul>
                                {order.order_items.map((item) => (
                                  <div key={item._id}>
                                    <Image
                                      src={`http://localhost:8000/api/products-photo/${item.product}`}
                                      alt={item.name}
                                      style={{ width: '150px', height: '100px' }}
                                    />
                                    <li>Nama Product : {item.name}</li>
                                    <li>Harga : Rp. {item.price}</li>
                                    <li>Jumlah Barang : {item.qty}</li>
                                  </div>
                                ))}
                              </ul>
                            </div>
                          </td>
                          <td>
                            <div>
                              <ul>
                                <li>Provinsi : {order.delivery_address.provinsi}</li>
                                <li>Kabupaten : {order.delivery_address.kabupaten}</li>
                                <li>Kecamatan : {order.delivery_address.kecamatan}</li>
                                <li>Kelurahan: {order.delivery_address.kelurahan}</li>
                                <li>Detail : {order.delivery_address.detail}</li>
                              </ul>
                              <p>Delivery Fee: Rp. {order.delivery_fee}</p>

                            </div>
                          </td>
                          <td>
                            <div>
                              <br />
                              <h5>Total : Rp. {calculateGrandTotal(order.order_items, order.delivery_fee)}</h5>
                              <br />
                              <h5>Status : {order.status}</h5>

                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </Layout>
  );
};



export default Order;
