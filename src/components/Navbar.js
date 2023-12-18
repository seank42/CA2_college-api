import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const NavBar = ({ search, onHandleChange, authenticated, onAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    onAuthenticated(false);
    navigate('/');
  };

  const handleChange = (e) => {
    navigate('/courses');
    onHandleChange(e);
  };

  const handleChangeL = (e) => {
    navigate('/lecturers');
    onHandleChange(e);
  };

  const handleChangeE = (e) => {
    navigate('/enrolments');
    onHandleChange(e);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/courses">
       <a className='ps-5' style={{ textDecoration: 'none' }}>Home</a> 
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/courses">
          Courses
        </Nav.Link>
        <Nav.Link as={Link} to="/lecturers">
          Lecturers
        </Nav.Link>
        <Nav.Link as={Link} to="/enrolments">
          Enrolments
        </Nav.Link>
      </Nav>
      <Form inline className="ml-auto">
        {location.pathname === '/courses' && (
          <FormControl
            type="text"
            placeholder="Enter course..."
            onChange={handleChange}
            value={search}
            className="mr-2"
          />
        )}
        {location.pathname === '/lecturers' && (
          <FormControl
            type="text"
            placeholder="Enter lecturer..."
            onChange={handleChangeL}
            value={search}
            className="mr-2"
          />
        )}
        {location.pathname === '/enrolments' && (
          <FormControl
            type="text"
            placeholder="Enter enrolment..."
            onChange={handleChangeE}
            value={search}
            className="mr-2"
          />
        )}
      </Form>
      <Button variant="outline-light" onClick={logout}>
        Logout
      </Button>
    </Navbar>
  );
};

export default NavBar;
