import { useState } from 'react'
import React from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth';
import { Container, Form, Button } from 'react-bootstrap';
const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/auth/login`, {
        email,
        password,
      });

      if (res.data.success === true) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem('auth', JSON.stringify(res.data));
        console.log('Login Succesfully');
        alert('Login Succesfully');
        navigate('/');
      } else {
        console.log('Email or Password incorrect');
        alert('Email or Password incorrect')
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };



  return (
    <Layout>
      <Container className="login">
        <h1>Login Page</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleInputEmail1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleInputPassword1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </Container>
    </Layout>
  )
}

export default Login
