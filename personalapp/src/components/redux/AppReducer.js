const AppReducer = (
  state = {
    currentLocation: {},
    isLoggedIn: false,
    currentMovies: [],
    userinfo: {},
    aspId: "",
    userId: ""
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
    case "REGISTER_USER_FULFILLED":
      state = {
        ...state,
        userId: action.payload
      }
    case "GET_USER_FULFILLED":
      state = {
        ...state,
        userinfo: action.payload
      }
      break;
    case "LOGIN_USER_FULFILLED":
      state = {
        ...state,
        isLoggedIn: action.payload.response,
        userinfo: action.payload.data
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
    case "GET_ASP_FULFILLED":
      state = {
        ...state,
        aspId: action.payload
      }
      break;
    case "GET_ID_FULFILLED":
      state = {
        ...state
      }
      break;
    default:
      break;
  }
  return state;
};

export default AppReducer;
