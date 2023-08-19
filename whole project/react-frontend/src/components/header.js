import react from "react";
import {Nav, NavDropdown} from 'react-bootstrap';

import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  let vendor = JSON.parse(localStorage.getItem('vendor-info'))
  const navigate = useNavigate();

  function Logout(){
    localStorage.clear();
    navigate(0);
    navigate('/');
    
  }
  return (
    <div className="header">
      <ul className="navbar">
        <li className="logo">
          <span>SomeLogo</span>
        </li>
        {localStorage.getItem("vendor-info") ? (
          <li className="forlogin">
            <Link to="/logout">
              <Nav>
              <NavDropdown title={vendor.name}>
                <NavDropdown.Item onClick={Logout}>Logout
                </NavDropdown.Item>
              </NavDropdown>
              </Nav>
              
            </Link>
          </li>
        ) : (
          <>
            <li className="forlogin">
              <Link to="/login">
                <span>Login</span>
              </Link>
            </li>
            <li className="forreg">
              <Link to="/registration">
                <span>Register</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
