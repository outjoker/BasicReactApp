import React, {useEffect} from "react"

import { Navbar, Nav, NavDropdown, Button, Table, Form, DropdownButton, Dropdown, Modal} from 'react-bootstrap';
import {Redirect} from "react-router-dom"
import cookie from "react-cookies"
import axios from 'axios';
import { connect } from "react-redux";
import { signUpUser, closeSignupModal } from "../redux/actions/index"

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const passwordregex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")


class Signup extends React.Component{
  constructor(){
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repeatpassword :"",
      passwordMatch: false,
      phone : "",
      gender :"",
      age : "",
      destination:"",
      budget : "",
      error: false,
      newuser: false,
      redirectToSignIn: false,
      passwordMatchError: false,
      

      errors:{
        email : "",
        password: "",
        createusererror: "",

      }
    }
    this.validateInputs = this.validateInputs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.registerNewUser = this.registerNewUser.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this)
    this.confirmPasswordChangeHandler = this.confirmPasswordChangeHandler.bind(this)
  }


  // submitData(e){
  //   e.preventDefault();
  //   console.log("inside siubmit API for signup button")

  //   fetch("http://localhost:9000/test/textbox", {
  //     method : 'POST',
  //     headers : {
  //       accept : 'application/json',
  //       'content-type' : 'application/json'
  //     },
  //     body : JSON.stringify({
  //       firstname : this.state.firstname,
  //       lastname : this.state.lastname,
  //       email : this.state.email,
  //       password : this.state.password,
  //       age : this.state.age,
  //       phone : this.state.phone,
  //       gender : this.state.gender,
  //       destination : this.state.destination,
  //       budget : this.state.budget,
  //     })
  //   }).then(response=> {
  //     const statusCode = response.status;
  //   const data = response.json();
  //   return Promise.all([statusCode, data]);
  //   }).then(data=> {
  //     let statusCode = data[0];
  //   let responseFromApi = data[1]
  //   if(statusCode === 200) {
  //     console.log(statusCode)
  //   } else {
  //     console.log(statusCode)
  //   }
  //   })

  // }


  confirmPasswordChangeHandler = (event) => {
    if (this.state.password === event.target.value) {
        this.setState({
            repeatPassword: event.target.value,
            passwordMatch: true,
            passwordMatchError: false
        })
    } else {
        this.setState({
            repeatPassword: event.target.value,
            passwordMatch: false,
            passwordMatchError: true
        })
    }
}
 

  handleChange(e){
    console.log("inside handlechange method");
    const {name, value, checked, type} = e.target;
    let errors = this.state.errors;
    switch(name) {
      case 'email':
        errors.email= validEmailRegex.test(value) ? "" : "email is not valid";
        break;
      case 'password':
        errors.password = passwordregex.test(value) ?  "" : "password should have atleast 1 lowercase alphabet {a..z}, atleast 1 uppercase alphabet {A..Z}, atleast one number {0..9}, atleast one special character among { !@#$%^&* } and atleast 8 characters long"
        break;
      default:
        break;
    }
    type === "checkbox" ? this.setState({ [name] : checked }) : this.setState({ errors,[name] : value })

  }

  validateInputs = (event) => {
    if (!this.state.errors.email && !this.state.errors.password && this.state.passwordMatch && this.state.firstname !== "" && this.state.gender!== "") return false
    else return true
  }


  handleModalClose() {
    this.setState({
      redirectToSignIn: true
    })
    this.props.closeSignupModal();
  }

  registerNewUser=(event)=> {
    event.preventDefault();
    var data = {
      firstname : this.state.firstname,
      lastname : this.state.lastname,
      email : this.state.email,
      password : this.state.password,
      age : this.state.age,
      phone : this.state.phone,
      gender : this.state.gender,
    }
    this.props.signUpUser(data);
  }

 

  render(){
    let redirectToSignIn = null;
    if (this.state.redirectToSignIn) redirectToSignIn = <Redirect to="/login" />

    const errors=this.state.errors
    return (
      <div className="App">
        {redirectToSignIn}
        <div className="container">
          <div className="login-form">           
            <div className="main-div">
              <div className="panel">
                <h2><b>Sign up Form</b></h2>
                <p><b>Please enter your credentials</b></p>
              </div>
              <div className="form-group">
              </div>
              <div className="form-group">
                <input onChange={this.handleChange} type="text" className="form-control" name="firstname" placeholder="Enter Firstname" />
              </div>
              <div className="form-group">
                <input onChange={this.handleChange} type="text" className="form-control" name="lastname" placeholder="Enter Lastname or Surname" />
              </div>
              <div className="form-group">
                <input onChange={this.handleChange} type="email" className="form-control" name="email" placeholder="Enter Email" />
                {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
              </div>
              <div className="form-group">
                <input onChange={this.handleChange} type="password" className="form-control" name="password" placeholder="Enter Password" />
                {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
              </div>
              <div className="form-group">
                <input onChange={this.confirmPasswordChangeHandler} autoComplete="off" type="password" className="form-control" name="repeatpassword" placeholder="Re-Enter Password" />
                {this.state.passwordMatchError && <span className='error'>Passwords do not match</span>}
              </div>
              <div className="form-group">
                <input onChange={this.handleChange} type="number" className="form-control" name="age" placeholder="Enter Age" />
              </div>
              <div className="form-group">
                <input onChange={this.handleChange} type="tel" className="form-control" name="phone" placeholder="Enter Phone Number" />
              </div>
              
              <div className="form-group">
                <h6><b color="blue">Select Gender</b></h6>
                <Form>
                <div key={`inline-radio`} className="mb-3">
                  <Form.Check name="gender" inline value="male" label="Male" type="radio" id={`inline-radio-1`} onChange={this.handleChange}/>
                  <Form.Check name="gender" inline value="female" label="Female" type="radio" id={`inline-radio-2`} onChange={this.handleChange} />
                  <Form.Check name="gender" inline value="other" label="Other" type="radio" id={`inline-radio-3`} onChange={this.handleChange}/>
                </div>
                </Form>
              </div>
              {/* <div className="form-group">
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Control name="destination" value={this.state.destination} onChange={this.handleChange} as="select" custom>
                  <option value="select your favourite destination">Select your favourite destination</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Iceland">Iceland</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Goa">Goa</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formBasicRangeCustom">
                  <Form.Label><b>Travel Budget</b></Form.Label>
                  <Form.Control min="10000" max="5000000" onChange={this.handleChange} name="budget" type="range" custom />
                </Form.Group>
              </div> */}
              <br/>
              <div className="form-group">
              <Button onClick={this.registerNewUser} variant="primary">Submit</Button>
              </div>
            </div>
          </div>

          <br/>
          <div>
            <Modal show={this.props.signUpSuccessful} onHide={this.handleModalClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Registered Succesfully...!!!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                User {this.state.email} registered succesfully! Please login for more exciting stuff
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.handleModalClose}>
                  Take me to Sign in page!
                </Button>
              </Modal.Footer>

            </Modal>
            <Modal show={this.props.signupFailedError} onHide={this.handleModalClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"><b style={{ color:"red"}}>Registration Failed</b></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                User {this.state.email} already exists! Please login or register with a new email.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.props.closeSignupModal}>
                  I will stay here!
                </Button>
                <Button variant="primary" onClick={this.handleModalClose}>
                  Take me to Sign in page!
                </Button>
              </Modal.Footer>

            </Modal>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      signUpSuccessful: state.signUpSuccessful,
      signupFailedError: state.signupFailedError
  };
};

function mapDispatchToProps(dispatch) {
  return {
      signUpUser: payload => dispatch(signUpUser(payload)),
      closeSignupModal: payload => dispatch(closeSignupModal(payload))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);