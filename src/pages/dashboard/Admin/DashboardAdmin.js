import React from 'react'
import Layout from '../../../components/Layout'
import { Tab, Row, Col, Card} from 'react-bootstrap'
import { useAuth } from '../../../context/auth'
import AdminMenu from '../../../components/AdminMenu'
import ProfileAdmin from './ProfileAdmin'

const DashboardAdmin = () => {
 const [auth]= useAuth()
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
      <Tab.Container id="list-group-tabs" defaultActiveKey="#link1">
        <h1> Welcome {auth?.user?.full_name} </h1>
      <Row>
        <Col sm={3}>
          <AdminMenu />
        </Col>
        <Col sm={9}>
          <Card>
            <Card.Header><h1>Profile</h1></Card.Header>
            <Card.Body>
              <ProfileAdmin/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Tab.Container>
    </div>
    </Layout>
      
       
  )
}

export default DashboardAdmin
