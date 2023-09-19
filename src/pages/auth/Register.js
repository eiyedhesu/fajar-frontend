import { useState } from 'react'
import React from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
const Register = () => {
  const [full_name, setFull_Name] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:8000/auth/register`, {
        full_name,
        email,
        password,
        role,
      })
        .then((res) => {
          if (res.status === 200) {
            navigate("/login")
          }
          console.log(res);
          console.log("res");
        }, (error) => {

          console.log(error);
          console.log("error");
        })

    } catch (error) {
      console.log(error)

    }
  }

  return (
    <Layout>
      <Container className="register">
        <h1>Register Page</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="inputText">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control type="text" value={full_name} onChange={(e) => setFull_Name(e.target.value)} required />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="exampleInputEmail1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Form.Text>We'll never share your email with anyone else.</Form.Text>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="exampleInputPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Label as="legend" column sm={2}>
              Daftar Sebagai
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="User"
                id="userRole"
                value="user"
                checked={role === 'user'}
                onChange={() => setRole('user')}
              />
            </Col>
          </Row>

          <Button type="submit" variant="primary">Submit</Button>
        </Form>
      </Container>

    </Layout>
  )
}

export default Register
