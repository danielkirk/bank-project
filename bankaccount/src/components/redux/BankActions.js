import axios from "axios";

export function getUserIdByEmail(email) {
  return {
    type: "GET_USER_ID",
    payload: axios
      .get(`/api/bank?email=${email}`, { withCredentials: true })
      .then(resp => {
        getBankAccountById(resp.data.AspId);
        return resp.data.AspId;
      })
      .catch(err => console.log(err))
  };
}

export function getBankAccountById(AspId) {
  return {
    type: "GET_BANK_ACCOUNT_ID",
    payload: axios
      .get(`/api/bank/bankaccount?aspnetid=${AspId}`, { withCredentials: true })
      .then(resp => {
        return resp.data.BankAccountId;
      })
      .catch(err => console.log(err))
  };
}

export function loginUser(username, password) {
  const data = `grant_type=password&username=${username}&password=${password}`;
  const headers = { "Content-Type": "application/x-www-form-urlencoded" };
  return {
    type: "LOGIN_USER",
    payload: axios
      .post("/token", data, { headers: headers, withCredentials: true })
      .then(resp => {
        sessionStorage.setItem("token", resp.data.access_token);
        return true;
      })
      .catch(err => console.error(err))
  };
}

export function checkUser(token) {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`
  };
  return {
    type: "CHECK_USER",
    payload: axios
      .get("/api/account/userinfo", { headers: headers, withCredentials: true })
      .then(resp => {
        console.log(resp);
        if (sessionStorage.getItem("token") !== null) {
          return true;
        } else {
          return false;
        }
      })
      .catch(err => {
        return false;
      })
  };
}
