import React from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/auth'
const Home = () => {
 const [auth,setAuth]= useAuth()
  return (
    <Layout>
      <h1> Home</h1>
      
    </Layout>
  )
}

export default Home
