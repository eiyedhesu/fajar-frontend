import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import UserMenu from '../../../components/UserMenu';
import { Tab, Row, Col, Card, Table } from 'react-bootstrap';
import { useAuth } from '../../../context/auth';
import axios from 'axios';

const AlamatPengiriman = () => {
  const [auth, setAuth]  = useAuth();
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('auth');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
    
        setAuth(parsedData)
       
        
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

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <Tab.Container id="list-group-tabs" defaultActiveKey="#link1">
          <h1> Welcome {auth?.user?.full_name} </h1>
          <Row>
            <Col sm={3}>
              <UserMenu />
            </Col>
            <Col sm={9}>
              <Card>
                <div>
                  <Card.Header><h2>Alamat Pengiriman</h2></Card.Header>
                  {shippingAddress?.map((address) => (
                    <Card>
                    <Table striped bordered>
                      <tbody>
                        <tr>
                          <td><h5>Nama Alamat :</h5></td>
                          <td><h5>{address.nama}</h5></td>
                        </tr>
                        <tr>
                          <td>Provinsi</td>
                          <td>{address.provinsi}</td>
                        </tr>
                        <tr>
                          <td>Kabupaten</td>
                          <td>{address.kabupaten}</td>
                        </tr>
                        <tr>
                          <td>Kecamatan</td>
                          <td>{address.kecamatan}</td>
                        </tr>
                        <tr>
                          <td>Kelurahan</td>
                          <td>{address.kelurahan}</td>
                        </tr>
                        <tr>
                          <td>Detail</td>
                          <td>{address.detail}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                  ))}
                    
                 
                </div>
              </Card>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </Layout>
  );
};

export default AlamatPengiriman;
