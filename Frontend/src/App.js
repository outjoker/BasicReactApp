import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Tab, Tabs, Accordion, Card, Button} from "react-bootstrap"
import {BrowserRouter} from 'react-router-dom';
import Main from "./ui/Main"


class App extends React.Component{
  constructor(){
    super()
    this.state={

    }
  }

  render(){

    return (
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
