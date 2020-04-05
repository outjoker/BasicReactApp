import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/index"
import { Navbar, Nav, NavDropdown, Button, Table, Carousel, Form, FormControl} from 'react-bootstrap';
import {Redirect, Link} from "react-router-dom"
import cookie from "react-cookies"
import BackgroundImg from "../logo.svg"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () => {
        this.props.logoutUser({})
    }

    render() {
        let login=null,redirectVar = <Redirect to="/login" />
        if (sessionStorage.getItem("email") === null) { 
          login = (
            <Nav className="nav navbar-nav navbar-right">
              <Nav.Link href="/login"><b>LOG IN</b></Nav.Link>
            </Nav>
          )
          redirectVar = <Redirect to="/login"/>
        } else {
          login = (  
            <Nav className="nav navbar-nav navbar-right">
              <Nav.Link href="/" onClick = {this.handleLogout}><b>LOG OUT</b></Nav.Link>
            </Nav>
          )
          redirectVar = <Redirect to="/login"/>
        }
        return (
          <div className="App">
            {redirectVar}
            <header>
              <Navbar expand="lg" variant="dark" bg="dark">
                <Navbar.Brand href="home">
                  <img
                    alt=""
                    src={BackgroundImg}
                    width="35"
                    height="32"
                    className="d-inline-block align-top"
                  />{' '}
                  Pack Your Bags</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="/home"><b>Home</b></Nav.Link>
                  </Nav>
                  <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                  {login}
                </Navbar.Collapse>
              </Navbar>

            </header>

            <body>
        

            </body>
          </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user };
};

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: payload => dispatch(logoutUser(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);