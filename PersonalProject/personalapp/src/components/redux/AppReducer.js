const AppReducer = (
  state = {
    currentLocation: {},
    isLoggedIn: false
  },
  action
) => {
  switch (action.type) {
    case "GET_LOCATION_FULFILLED":
      state = {
        currentLocation: action.payload
      };
      break;
    case "GET_USER_FULFILLED":
      state = {
        isLoggedIn: true
      };
      break;
    default:
      break;
  }
  return state;
};

export default AppReducer;
