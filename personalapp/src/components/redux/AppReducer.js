const AppReducer = (
  state = {
    currentLocation: {},
    isLoggedIn: false,
    currentMovies: [],
    userinfo: {}
  },
  action
) => {
  switch (action.type) {
    case "GET_LOCATION_FULFILLED":
      state = {
        ...state,
        currentLocation: action.payload
      };
      break;
    case "GET_USER_FULFILLED":
      state = {
        ...state,
        userinfo: action.payload
      }
      break;
    case "LOGIN_USER_FULFILLED":
      state = {
        ...state,
        isLoggedIn: action.payload
      };
      break;
    case "CHECK_USER_FULFILLED":
      state = {
        ...state,
        isLoggedIn: action.payload
      }
      break;
    case "GET_CURRENT_MOVIES_FULFILLED":
      state = {
        ...state,
        currentMovies: action.payload
      }
      break;
    case "GET_TRAILERS_FULFILLED":
      state = {
        ...state,
        movieTrailers: action.payload
      }
      break;
    default:
      break;
  }
  return state;
};

export default AppReducer;
