import React, { useState, useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'


const ProfileAdmin = () => {
  const [userData, setUserData] = useState({
    full_name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const storedData = localStorage.getItem('auth');

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData({
          full_name: parsedData.user.full_name || '',
          email: parsedData.user.email || '',
          role: parsedData.user.role || '',
        });
      } catch (error) {
        console.error('error', error);
      }
    }
  }, []);
    
  return (
   
      <ListGroup>
        <ListGroup.Item>Nama : {userData.full_name} </ListGroup.Item>
        <ListGroup.Item>Email : {userData.email} </ListGroup.Item>
        <ListGroup.Item>Role : {userData.role} </ListGroup.Item>
      </ListGroup>
     
      
    
  )
}

export default ProfileAdmin
