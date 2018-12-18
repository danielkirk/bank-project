import React from "react";
import axios from "axios";

class MovieService extends React.Component {
  static registerUser(data, onSuccess, onError) {
    return {
      method: "POST",
      payload: axios
        .post(`/api/account/register`, data, { withCredentials: true })
        .then(onSuccess)
        .catch(onError)
    };
  }

  static createBankAccount(data) {
    const url = "/api/bank";
    const config = {
      method: "POST",
      data: data
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }

  static createTransaction(data) {
    return {
      method: "POST",
      payload: axios
        .post("/api/bank/transactions", data)
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    };
  }

  static getTransactions(AspId) {
    const url = `/api/bank?id=${AspId}`;
    const config = {
      method: "GET"
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }

  static getUserId(email) {
    const url = `/api/bank?email=${email}`;
    const config = {
      method: "GET"
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }

  static getBankAccountInfo(AspId) {
    const url = `/api/bank/bankaccount?aspnetid=${AspId}`;
    const config = {
      method: "GET"
    };
    axios.defaults.withCredentials = true;
    return axios(url, config);
  }
}

export default MovieService;
