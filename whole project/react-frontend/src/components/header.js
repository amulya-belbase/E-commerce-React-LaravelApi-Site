import react from "react";
import { Nav, NavDropdown } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  let vendor = JSON.parse(localStorage.getItem("vendor-info"));
  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate(0);
    navigate("/");
  }
  return (
    <div className="header">
      <ul className="navbar">
        <li className="logo">
          <span>SomeLogo</span>
        </li>
        {localStorage.getItem("vendor-info") ? (
          <li>
            <Nav>
              <i class="fa-solid fa-user"></i>
              <NavDropdown title={vendor.name} className="logname">
                <Link to="/logout">
                  <NavDropdown.Item onClick={Logout}>
                    <i class="fa-solid fa-right-from-bracket"></i>Logout
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </li>
        ) : (
          <>
            <li className="forlogin">
              <Link to="/login">
                <div className="logindiv">
                  <i class="fa-solid fa-arrow-right-to-bracket"></i>
                  <span>Login</span>
                </div>
              </Link>
            </li>
            <li className="forreg">
              <Link to="/registration">
                <div className="regdiv">
                  <i class="fa-solid fa-user-plus"></i>
                  <span>Register</span>
                </div>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
