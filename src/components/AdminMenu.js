import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
<>
    <div className='text-center'>
    <ListGroup className='active-group' defaultActiveKey="#link1">
    <NavLink to="/admin-dashboard" className="list-group-item list-group-item-action">
        Profile
      </NavLink>
      <NavLink to="/admin-dashboard-create-product" className="list-group-item list-group-item-action">
        Product
      </NavLink>
      <NavLink to="/admin-dashboard-create-category" className="list-group-item list-group-item-action">
        Category
      </NavLink>
      <NavLink to="/admin-dashboard-create-tags" className="list-group-item list-group-item-action">
        Tags
      </NavLink>
    </ListGroup>
    </div>
    
</>
 
 );
}


export default AdminMenu
