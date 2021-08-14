import React, { Component } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavBarComp extends Component {
  render() {
    let { isLogin, onSignOut, onUpdateLogin } = this.props;
    console.log("render");
    return (
      <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/" onClick={onUpdateLogin}>
              Animal World
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" onClick={onUpdateLogin}>
                Home
              </Nav.Link>
            </Nav>
            {!isLogin && (
              <Nav>
                <Nav.Link as={Link} to="/signin">
                  Sign In
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </Nav>
            )}
            {isLogin && (
              <Nav>
                <Nav.Link as={Link} to="/addPost">
                  Upload
                </Nav.Link>

                <Nav.Link as={Button} variant="success" onClick={onSignOut}>
                  Sign Out
                </Nav.Link>
              </Nav>
            )}
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavBarComp;
