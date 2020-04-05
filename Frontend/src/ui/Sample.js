import React from 'react';
import '../App.css';
import {Tab, Tabs, Accordion, Card, Button, Nav, Navbar, Form, FormControl, NavDropdown} from "react-bootstrap"
import cookie from "react-cookies"
import { Redirect, Link } from 'react-router-dom';
import CarouselRender from "./Caoursel"



class Sample extends React.Component{
  constructor(){
    super()
    this.state={

    }
  }



  render(){
    let redirectval = null;
    if(!sessionStorage.getItem("email")){
      redirectval = <Redirect to="/login"/>
    }
    return (
      <div className="App">
        
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Features" id="basic-nav-dropdown">
                <NavDropdown.Item href="/bustickets">Catalog</NavDropdown.Item>

                <NavDropdown.Item href="/traintickets">View the Prodcuts</NavDropdown.Item>

                <NavDropdown.Item href="/flighttickets">Schedule delivery</NavDropdown.Item>

                <NavDropdown.Item href="/watertickets">Track the shipment</NavDropdown.Item>

              </NavDropdown>
              
              
            </Nav>
            
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Sample;
