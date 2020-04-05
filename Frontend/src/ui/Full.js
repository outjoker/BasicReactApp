import React from "react"
import { Navbar, Nav, NavDropdown, Button, Table} from 'react-bootstrap';
import {Redirect, Link} from "react-router-dom"
import cookie from "react-cookies"
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/index"


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const passwordregex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")

class Full extends React.Component{
  constructor(){
    super()
    this.state = {
      username: "",
      password: "",
      authFlag: false,
      error: false,
      signup : false, 
      errors:{
        username:"",
        password:""
      }
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleSignup = this.handleSignup.bind(this)
  }

  handleSignup(e){
    e.preventDefault()
    console.log("inside  here>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    this.setState((prev)=>{
      prev.signup = !prev.signup;
      return prev;
    })

  }

  handleChange(e){
    let errors = this.state.errors;
    console.info("handing change...")
    const {name, value, type, checked } = e.target;
    switch(name){
      case 'email':
        errors.email = validEmailRegex.test(value)? "" : "email entered is not valid"
        break;
      case 'password':
        errors.password = passwordregex.test(value) ? "" : "password should have atleast 1 lowercase alphabet {a..z}, atleast 1 uppercase alphabet {A..Z}, atleast one number {0..9}, atleast one special character among { !@#$%^&* } and atleast 8 characters long"
        break;
      default:
        break;
    }
    type === "checkbox" ? this.setState({ [name] : checked }) : this.setState({ errors,[name] : value })
  }

  handleLogout = () => {
    cookie.remove('cookie', { path: '/' })
  }

  render() {
    //if cookie is set, render logout button
    let login = null,redirectValue = null,signupcontent=null;
   

    if (cookie.load('cookie')) {
      console.info("able to read cookie")
      login = (
        <Nav className="nav navbar-nav navbar-right">
          <Nav.Link href="/" onClick = {this.handleLogout}><b>LOG OUT</b></Nav.Link>
        </Nav>
      )
      redirectValue = <Redirect to="/home"/>
    } else {
      console.info("not able to read cookie")
      
      login = (  
        <Nav className="nav navbar-nav navbar-right">
          <Nav.Link href="/login"><b>LOG IN</b></Nav.Link>
        </Nav>
      )
      redirectValue = <Redirect to="/login"/>
    }
    
    return (
      <div className="App">
        {redirectValue}
        <header>
          <Navbar expand="lg" variant="dark" bg="dark">
            <Navbar.Brand href="home">Outliers Travels</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/home"><b>Home</b></Nav.Link>
                <Nav.Link href="/link"><b>Link</b></Nav.Link>
              </Nav>
              {signupcontent}
              {login}
            </Navbar.Collapse>
          </Navbar>

        </header>    
      </div>


    )
  }
}

export default Full;