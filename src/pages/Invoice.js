import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import Layout from '../components/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';

function Invoice() {
  const [auth, setAuth] = useAuth();
  const { order_id } = useParams();
  const [invoice, setInvoice] = useState({
    sub_total: 0,
    delivery_fee: 0,
    delivery_address: {
      provinsi: '',
      kabupaten: '',
      kecamatan: '',
      kelurahan: '',
      detail: '',
    },
    total: 0,
    payment_status: '',
  });

  console.log(invoice);
  console.log('invoice');
  useEffect(() => {
    const storedData = localStorage.getItem('auth');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log(parsedData);
        console.log('parsedData');
        setAuth(parsedData);
      } catch (error) {
        console.error('error', error);
      }
    }
  }, []);

  const getInvoice = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/invoices/${order_id}`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      });
      console.log(response);
      setInvoice(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvoice();
  }, [order_id]);

  return (
   // ... (previous imports and code)

function Invoice() {
  // ... (previous code)

  return (
    <Layout>
      <div className="invoice-container">
        <Card>
          <Card.Header>
            <h3>Invoice</h3>
          </Card.Header>
          <Card.Body>
            {invoice ? (
              <Table bordered>
                <tbody>
                  <tr>
                    <td>Sub Total</td>
                    <td>{invoice.sub_total}</td>
                  </tr>
                  <tr>
                    <td>Delivery Fee</td>
                    <td>{invoice.delivery_fee}</td>
                  </tr>
                  <tr>
                    <td>Delivery Address</td>
                    <td>
                      <p>Provinsi: {invoice.delivery_address.provinsi}</p>
                      <p>Kabupaten: {invoice.delivery_address.kabupaten}</p>
                      <p>Kecamatan: {invoice.delivery_address.kecamatan}</p>
                      <p>Kelurahan: {invoice.delivery_address.kelurahan}</p>
                      <p>Detail: {invoice.delivery_address.detail}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>{invoice.total}</td>
                  </tr>
                  <tr>
                    <td>Payment Status</td>
                    <td>{invoice.payment_status}</td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <p>Loading invoice...</p>
            )}

            {/* Display order items */}
            {invoice && invoice.order_items ? (
              <Table bordered>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.order_items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : null}
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}
  )
}

export default Invoice;
