import React from 'react'
import Layout from '../../../components/Layout'
import UserMenu from '../../../components/UserMenu'
import {Tab, Row, Col,Card} from 'react-bootstrap'
import { useAuth } from '../../../context/auth'
import OrderForm from '../../OrderForm'

const Address = () => {
  const { auth} = useAuth();
 
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
      <Tab.Container id="list-group-tabs" defaultActiveKey="#link1">
        <h1> Welcome {auth?.user?.full_name} </h1>
      <Row>
        <Col sm={3}>
          <UserMenu />
        </Col>
        <Col sm={9}>
        <Card>
          <OrderForm/>
        </Card>
        </Col>
      </Row>
    </Tab.Container>
    </div>
    </Layout>
  )
}

export default Address
