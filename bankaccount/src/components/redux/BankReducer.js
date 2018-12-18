const BankReducer = (
  state = {
    isLoggedIn: false,
    AspId: "",
    BankId: null
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_USER_FULFILLED":
      state = {
        ...state,
        isLoggedIn: action.payload
      };
      break;
    case "GET_USER_ID_FULFILLED":
      state = {
        ...state,
        AspId: action.payload
      };
      break;
    case "GET_BANK_ACCOUNT_ID_FULFILLED":
      state = {
        ...state,
        BankId: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};

export default BankReducer;
