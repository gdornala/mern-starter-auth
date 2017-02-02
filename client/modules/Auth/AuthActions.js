import callApi from '../../util/apiCaller';
import Auth from './models/Auth';

// Export Constants
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


// Export Actions

export function signUpRequest(formData) {
  return (dispatch) => {
    return callApi('auth/signup','post', formData).then(res => dispatch(signUp(res.user)));
  };
}

export function login(token) {
  return {
    type: LOGIN,
    token,
  };
}

export function loginRequest(formData) {
  return (dispatch) => {
    return callApi('auth/login','post', formData).then(res => {
      if(res.success === true) {
        Auth.authenticateUser(res.token)
        dispatch(signUp(res.token));
      }
    });
  };
}

export function logout(user) {
  return {
    type: LOGOUT,
    user,
  };
}
