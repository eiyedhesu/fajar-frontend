import React from 'react'
import Layout from '../../../components/Layout'
import {ListGroup, Tab, Row, Col} from 'react-bootstrap'
import CreateProduct from './CreateProduct'
import CreateCategory from './CreateCategory'
import CreateTag from './CreateTag'
import { useAuth } from '../../../context/auth'
import ProfileAdmin from './ProfileAdmin'

const DashboardAdmin = () => {
 const [auth]= useAuth()
  return (
    <Layout>
      <div className='dashboard'>
      <Tab.Container id="list-group-tabs" defaultActiveKey="#link1">
        <h1> Welcome {auth?.user?.full_name} </h1>
      <Row>
        <Col sm={3}>
          <ListGroup >
            <ListGroup.Item className='list-group-item' action variant='secondary'  href="#link1">
              Profile
            </ListGroup.Item>
            <ListGroup.Item className='list-group-item' action variant='secondary'  href="#link2">
              Create Product
            </ListGroup.Item>
            <ListGroup.Item className='list-group-item' action variant='secondary'  href="#link3">
              Create Category
            </ListGroup.Item>
            <ListGroup.Item className='list-group-item' action variant='secondary'  href="#link4">
              Creat Tags
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane className='tab-pane' eventKey="#link1"> <ProfileAdmin/> </Tab.Pane>
            <Tab.Pane className='tab-pane' eventKey="#link2"> <CreateProduct/> </Tab.Pane>
            <Tab.Pane className='tab-pane' eventKey="#link3"> <CreateCategory/> </Tab.Pane>
            <Tab.Pane className='tab-pane' eventKey="#link4"> <CreateTag/> </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
    </Layout>
      
       
  )
}

export default DashboardAdmin
