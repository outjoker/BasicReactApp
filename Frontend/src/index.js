import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Full from "./ui/Full"
import {Provider} from "react-redux"
import store from "./redux/store/index";


//using props
// const propselement = <Funct name = "Bala"/>

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
  //<Comp2 />,
  //<ParentComp />,
  //<InvokeJson/>,
  //<SampleButton params={jsonobject.author} />,
  //<Provider store={store}><App/></Provider>,
  <Provider store={store}><App/></Provider>,
  document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
