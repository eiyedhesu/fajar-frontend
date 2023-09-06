import React from 'react'
import Layout from '../../../components/Layout'
import {ListGroup, Tab, Row, Col} from 'react-bootstrap'
import { useAuth } from '../../../context/auth'
import ProfileUser from './ProfileUser'
import Order from './Order'
import Address from './Address'


const DashboardUser = () => {
 const [auth]= useAuth()
  return (
    <Layout>
      <div className='dashboard'>
      <Tab.Container id="list-group-tabs" defaultActiveKey="#link1">
        <h1> Welcome {auth?.user?.full_name} </h1>
      <Row>
        <Col sm={3}>
          <ListGroup>
            <ListGroup.Item className='list-group-item' action variant='secondary' href="#link1">
              Profile
            </ListGroup.Item>
            <ListGroup.Item className='list-group-item' action variant='secondary' href="#link2">
              Pemesanan
            </ListGroup.Item>
            <ListGroup.Item className='list-group-item' action variant='secondary' href="#link3">
              Alamat Pengiriman
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane className='tab-pane' eventKey="#link1"> <ProfileUser/> </Tab.Pane>
            <Tab.Pane className='tab-pane' eventKey="#link2"> <Order/> </Tab.Pane>
            <Tab.Pane className='tab-pane' eventKey="#link3"> <Address/> </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
    </Layout>
      
       
  )
}

export default DashboardUser
