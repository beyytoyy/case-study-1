
import { Link } from "react-router-dom";
import React, { useState, useEffect, useParams } from "react";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import axios from "axios"

const AdminNavbar = (props) => {  
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:9001/users`);
      setData(response.data);
      } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleLogout = async (userId) => {
    try {
      // Redirect the user to the login page or perform any other necessary actions
      window.location.href = 'http://localhost:3000/auth/login';
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error
    }
  };
  
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
              <Media className="align-items-center">
                <div className="d-flex flex-wrap">
                  <span className="ni ni-single-02 text-light avatar avatar-sm rounded-circle "></span>
                  {data.map((user) => {
                    if (user.status === 'Active') {
                      return (
                        <span key={user._id} style={{paddingLeft: '5px', paddingTop: '6px', fontSize: '15px'}}>
                          {user.firstname} {user.lastname}
                        </span>
                      );
                    }
                    return null; // Skip rendering if user status is not active
                  })}
                </div>
              </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                {data.map((user) => {
                    if (user.status === 'Active') {
                      return (
                        <h6 className="text-overflow m-0">Welcome! {user.firstname} {user.lastname}</h6>
                      );
                    }
                    return null; // Skip rendering if user status is not active
                  })}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
