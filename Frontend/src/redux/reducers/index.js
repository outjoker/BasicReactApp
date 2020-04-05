import {
  LOGIN_USER_SUCCESS, LOGOUT_USER,
  LOGIN_USER_FAILURE, SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE, CLOSE_SIGNUP_MODAL
} from "../constants/action_types";

const initialState = {
  user: {
      "name": sessionStorage.getItem("firstname"),
      "email": sessionStorage.getItem("email")
  },
  invalidCredentials: false,
  signUpSuccessful: false,
  signupFailedError: false
};


function rootReducer(state = initialState, action) {
  switch(action.type){
    case LOGIN_USER_SUCCESS:
      sessionStorage.setItem("email", action.payload.email)
      sessionStorage.setItem("firstname", action.payload.firstname)
      delete action.payload['password'];
      return Object.assign({}, state, {
        user: action.payload,
        invalidCredentials: false,
        profile: action.payload
      });
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        user: {},
        invalidCredentials: true
      });
    case SIGNUP_USER_SUCCESS:
      delete action.payload['password'];
      return Object.assign({}, state, {
        signUpSuccessful: true,
        signupFailedError: false
      });
    case SIGNUP_USER_FAILURE:
      return Object.assign({}, state, {
        signUpSuccessful: false,
        signupFailedError: true
      });
    case CLOSE_SIGNUP_MODAL:
      return Object.assign({}, state, {
        signUpSuccessful: false,
        signupFailedError: false
      });
    case LOGOUT_USER:
      sessionStorage.removeItem("firstname");
      sessionStorage.removeItem("email");
      return Object.assign({}, state, {
        user: {
          "name": "",
          "email": ""
        }
      });
    default:
      return state;

  }

}

export default rootReducer;