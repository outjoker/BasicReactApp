import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login'
import Full from "./Full"
import Sample from './Sample';
import Signup from './Signup'
import Navbar from './navbar'
import Signin from "./signin"

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={Signin}/>
                <Route path="/home" component={Sample}/>
                <Route path="/signup" component={Signup}/>
  
            </div>
        )
    }
}
//Export The Main Component
export default Main;