import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsShop, BsCart } from 'react-icons/bs';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import '../index.css';
import SearchBar from './SearchBar'
import { Badge } from 'antd'
import { useAuth } from '../context/auth';



const Header = () => {

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()
  const isAdmin = auth.user?.role === 'admin'
  // const [qty, setQty] = useState()


  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
      role: ""
    });
    localStorage.removeItem("auth");
    navigate("/login")

  };



  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-light grid-container">
          <BsShop className="grid-icon" /> FajarStore.
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
        <Navbar.Collapse id="navbarTogglerDemo01" className="justify-content-center">
          <SearchBar />
        </Navbar.Collapse>
        <Navbar.Collapse id="navbarTogglerDemo02">
          <Nav className="navbar-nav ms-auto mb-3 mb-lg-0">
            <Nav.Link as={NavLink} to="/" className="text-light">
              Home
            </Nav.Link>
            {!auth.user ? (
              <>
                <Nav.Link as={NavLink} to="/login" className="text-light">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="text-light">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <NavDropdown className='text-light' title={auth.user?.full_name} id="basic-nav-dropdown">
                  {isAdmin ? (
                    <NavDropdown.Item href="/admin-dashboard">Dashboard</NavDropdown.Item>
                  ) : (
                    <NavDropdown.Item href="/user-dashboard">Dashboard</NavDropdown.Item>
                  )}
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            <Nav.Link as={NavLink} to="/cart2" className="text-light">
              <Badge count={1}>
                <BsCart className="icon-cart" />
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
