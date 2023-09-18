import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
<>
    <div className='text-center'>
    <ListGroup className='active-group' defaultActiveKey="#link1">
    <NavLink  to="/user-dashboard" className="list-group-item list-group-item-action">
        Profile
      </NavLink>
      <NavLink to="/user-dashboard-order" className="list-group-item list-group-item-action">
       Order
      </NavLink>
      <NavLink to="/user-dashboard-list-address" className="list-group-item list-group-item-action">
         Alamat Pengiriman
      </NavLink>
      <NavLink to="/user-dashboard-address" className="list-group-item list-group-item-action">
         Tambah Alamat Pengiriman
      </NavLink>
    </ListGroup>
    </div>
    
</>
 
 );
}


export default UserMenu
