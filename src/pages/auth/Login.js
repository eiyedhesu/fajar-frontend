import { useState } from 'react'
import React from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/auth';
const Login= () => {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [auth, setAuth] = useAuth ()

  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ email, password}); 
      const res = await axios.post(`http://localhost:8000/auth/login`, {
        email,
        password,
      })
      .then ((res)=>{
        if (res.status === 200) {
          
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          })
          localStorage.setItem('auth', JSON.stringify(res.data))
          navigate("/")
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
     <div className='login'>
     <h1>Login Page</h1>
     <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
    <div id="emailHelp"  className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} className="form-control" id="exampleInputPassword1" required/>
  </div>
  

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    
     </div>

    </Layout>
  )
}

export default Login
