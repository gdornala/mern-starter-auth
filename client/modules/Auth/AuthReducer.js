import { SIGNUP, LOGIN, LOGOUT } from './AuthActions';

// Initial State
const initialState = {
  token: "",
  name: ""
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN :
      return {
        token: action.token,
        name: action.user.name
      };

    default:
      return state;
  }
};

/* Selectors */

// Get user token
export const getToken = state => state.auth.token;

// Get user name
export const getName = state => state.auth.name;

// Export Reducer
export default AuthReducer;
