import { LOGIN_USER_SUCCESS } from "../constants/action_types";
import { LOGIN_USER_FAILURE } from "../constants/action_types";
import { SIGNUP_USER_SUCCESS } from "../constants/action_types";
import { SIGNUP_USER_FAILURE } from "../constants/action_types";
import { LOGOUT_USER } from "../constants/action_types";
import { CLOSE_SIGNUP_MODAL } from "../constants/action_types";


import axios from 'axios';

export function loginUserSuccess(payload) {
  return {type: LOGIN_USER_SUCCESS, payload}
}

export function loginUserFailure(payload) {
  return {type: LOGIN_USER_FAILURE, payload}
}

export function signupUserSuccess (payload) {
  return {type: SIGNUP_USER_SUCCESS, payload}
}

export function signupUserFailure (payload) {
  return {type: SIGNUP_USER_FAILURE, payload}
}

export function logoutUser(payload) {
  return { type: LOGOUT_USER, payload };
}

export function closeSignupModal(payload) {
  return { type: CLOSE_SIGNUP_MODAL, payload };
}

export const userLogin = ({email, password}) => {
  return dispatch =>{
    axios.get(`http://localhost:9000/test/signin?email=${email}&password=${password}`)
    .then(response=>{
      console.log("response from api is "+JSON.stringify(response))
      let dbdocument = response.data
      if(password === dbdocument.data.password){
        console.info("login success")
        dispatch(loginUserSuccess(dbdocument))
      } else {
        dispatch(loginUserFailure(dbdocument))
      }

    }).catch(err=>{
      console.error("login failure")
      dispatch(loginUserFailure(err.message))
    })
  }
}


export const signUpUser = (payload) => {
  return dispatch => {
      let url = 'http://localhost:9000/test/signup';
      axios.defaults.withCredentials = true;
      axios.post(url, payload)
          .then(response => {
              if (response.status === 200) {
                  dispatch(signupUserSuccess({}));
              }
          })
          .catch((error) => {
              console.log("Error during Sign Up")
              dispatch(signupUserFailure({}));
          });
  };
};
 