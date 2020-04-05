import React from "react"
import { Navbar, Nav, NavDropdown, Button, Table} from 'react-bootstrap';
import {Redirect, Link} from "react-router-dom"
import cookie from "react-cookies"
import axios from 'axios';
import {connect} from "react-redux"
import { userLogin } from "../redux/actions/index"
import BackgroundImg from "../ui/travel.jpg"



class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      invalidCredentials: '',
      invalidEmail: false,
      error: false, 
      signup : false
  }
  this.handleChange = this.handleChange.bind(this)
  this.submitLogin = this.submitLogin.bind(this);
  this.redirectToSignup = this.redirectToSignup.bind(this);
  this.validateCredentials = this.validateCredentials.bind(this)
  this.authenticateTheUser = this.authenticateTheUser.bind(this)
  }

  validateCredentials = (event) => {
    if (!this.state.invalidEmail && this.state.password !== "") return false
    else return true
}

  // componentWillMount(){
  //   this.setState({
  //     authFlag : false
  //   })
  // }


  handleChange(e){
    console.log("inside handle change method")
    const {name, value} = e.target;
    this.setState({
      [name] : value
    })

  }


  authenticateTheUser(event){
    event.preventDefault();
    this.props.userLogin({
        "email": this.state.email,
        "password" : this.state.password
      })
  }

  submitLogin(event){
    event.preventDefault();
    console.log("inside submit login method")
    axios.defaults.withCredentials=true;
    const data = {
      email: this.state.email,
      password : this.state.password
    }
    axios.post("http://localhost:9000/test/validate", data)
    .then(response=>{
      console.log("printing response >>>>>>>>>>")
      console.log(response)
      if(response.status === 200) {
        this.setState({
          authFlag: true
        })
      } else {
        this.setState({
          authFlag: false,
          error: true
      })
      }
    }).catch(error=>{
      this.setState({
        authFlag: false,
        error: true
    })
    });

  //   fetch("http://localhost:9000/test/validate", {
  //    method : 'POST',
  //    headers : {
  //      accept : 'application/json',
  //      'content-type' : 'application/json'
  //    },
  //    body : JSON.stringify({
  //      email: this.state.email,
  //      password : this.state.password
  //    })
  //  }).then(response => {
  //    console.log("printing response ...........")

  //    console.log(response)
     
  //   const statusCode = response.status;
  //   console.log("Status Code : ", statusCode);
  //   if (response.status === 200) {
  //       this.setState({
  //           authFlag: true
  //       })
  //   } else {
  //       this.setState({
  //           authFlag: false,
  //           error: true
  //       })
  //   }
  // }).catch((err)=>{
  //   this.setState({
  //     authFlag: false,
  //     error: true
  //   })
  // })
  }
  redirectToSignup(e){
    e.preventDefault()
   this.setState((prev)=>{
     prev.signup = !prev.signup
     console.log(prev)
     return prev;
   })
  }

  render(){
    console.log("pratisaari ikadakosta.... ")
    //redirect based on succesful login
    let redirectCheck = null;
    if (sessionStorage.getItem("email") !== null) {
      console.info("session storage")
      redirectCheck = <Redirect to = "/home"/>
    }

    return (
      <div className="App">
        {redirectCheck}
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2><b>Sign In</b></h2>
                <p><b>Please enter your email and password</b></p>
              </div>
              <div className="form-group">
                <input onChange={this.handleChange} type="text" className="form-control" name="email" placeholder="Username or Email" />
              </div>
              <div className="form-group">
                <input onChange={this.handleChange} type="password" className="form-control" name="password" placeholder="Password" />
              </div>
              <div className="form-group">
              <Button onClick={this.authenticateTheUser} variant="primary">Submit</Button>
              </div>
              {this.props.invalidCredentials ? <span style={{ color: "red", "font-style": "oblique", "font-weight": "bold" }}>Invalid Username or Password</span> : ''}
            
              
              <div className="form-group">
              <Link to="/signup">Not a User? Come Join us</Link>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
      user: state.user,
      invalidCredentials: state.invalidCredentials
  };
};

function mapDispatchToProps(dispatch) {
  return {
      userLogin: payload => dispatch(userLogin(payload))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);