import React from "react";

import { Container, Nav, Navbar } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/home">김치</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/from">기원</Nav.Link>
            <Nav.Link href="/recipe">레시피</Nav.Link>
            <Nav.Link href="/KimchiNicknamePage">닉네임 정하기</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
