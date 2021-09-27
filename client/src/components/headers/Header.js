import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icons/menu.svg";
import Cart from "./icons/cart.svg";
import Close from "./icons/close.svg";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import './header.css'
import axios from "axios";

export default function Header() {
  const state = useContext(GlobalState);
  const [isLogged, setisLoggged] = state.userApi.isLoggged;
  const [isAdmin, setisAdmin] = state.userApi.isAdmin;
  console.log(isLogged);

  const logoutUser = async () => {
    await axios.post("/user/logout");
    localStorage.clear();
    setisAdmin(false);
    setisLoggged(false);

    window.location.href = "/login";

  }
  return (
    <header>
      <Navbar  expand="lg" className="navBar">
        <Container  className="containerCls" >
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Navbar.Brand className="ml-auto navBrand" href="/">
              <h1>ShopMart</h1>
            </Navbar.Brand>
            <Nav className="ms-auto navCustomClass">
              {isLogged ? <Nav.Link className="navLink" href="/">Profile</Nav.Link> : <Nav.Link className="navLink" href="/login">Login or Register</Nav.Link> }
              <Nav.Link className="navLink" href="/">Products</Nav.Link>
              {/* <Nav.Item className="navLink"><img src={Cart} alt="Cart" width="24" ></img> Cart</Nav.Item> */}
              <Nav.Link className="navLink">Cart</Nav.Link>
              {isLogged ? <Nav.Link className="navLink" onClick = {logoutUser} >Logout</Nav.Link> : ""}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
