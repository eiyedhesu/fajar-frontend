import { useState } from 'react'
import React from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [full_name, setFull_Name] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [role, setRole] = useState("")
  
  const navigate = useNavigate ()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      console.log({ full_name, email, password, role })
      const res = await axios.post(`http://localhost:8000/auth/register`, {
        full_name,
        email,
        password,
        role,
      })
      .then ((res)=>{
        if (res.status === 200) {
          navigate("/login")
        }
        console.log(res);
        console.log("res");
      },(error)=> {
        
        console.log(error);
        console.log("error");
      })
     
    } catch (error) {
      console.log(error)
     
    }
  }
  
  return (
    <Layout>
     <div className='register'>
     <h1>Register Page</h1>
     <form onSubmit={handleSubmit}>
     <div className="mb-3">
    <label htmlFor="inputText" className="form-label">Nama Lengkap</label>
    <input type="text" value={full_name} onChange={(e) => setFull_Name(e.target.value)} className="form-control" id="inputText" required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
    <div id="emailHelp"  className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} className="form-control" id="exampleInputPassword1" required/>
  </div>
  
  <div className='mb-3'>
    <label className='form-label'>Daftar Sebagai</label>
      <div className='form-check'>
      <input type='radio'className='form-check-input'id='userRole'value='user'checked={role === 'user'}onChange={() => setRole('user')}/>
    <label className='form-check-label' htmlFor='userRole'>User</label>
      </div>
</div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    
     </div>

    </Layout>
  )
}

export default Register
