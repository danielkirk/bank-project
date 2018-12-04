import axios from "axios";

export function getLocation() {
  return {
    type: "GET_LOCATION",
    payload: axios
      .get(
        "http://api.ipstack.com/check?access_key=c214a0b4b262d608ba7259478e73b889"
      )
      .then(resp => {
        console.log(resp.data);
        return resp.data;
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
        sessionStorage.setItem("token", resp.data.access_token)
        return true;
      })
      .catch(err => console.error(err))
  };
}

export function checkUser(token) {
  const headers = { "Content-Type": "application/x-www-form-urlencoded", "Authorization": `Bearer ${token}` };
  return {
    type: "CHECK_USER",
    payload: axios
      .get("/api/account/userinfo", { headers: headers, withCredentials: true })
      .then(resp => {
        console.log(resp)
        if (sessionStorage.getItem("token") !== null) {
          return true
        } else { return false }
      })
      .catch(err => { return false })
  }
}

export function moviesIntheatres() {
  return {
    type: "GET_CURRENT_MOVIES",
    payload: axios.get("/project/webscrape/Web", { withCredentials: true })
      .then(resp => {
        console.log(resp.data)
        return resp.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function movieTrailers() {
  return {
    type: "GET_TRAILERS",
    payload: axios.get("/project/webscrape/Trailer", { withCredentials: true })
      .then(resp => {
        console.log(resp.data)
        return resp.data
      })
      .catch(error => console.log(error))
  }
}

export function getuser(id) {
  return {
    type: "GET_USER",
    payload: axios.get(`/project/webscrape/${id}`, { withCredentials: true })
      .then(resp => {
        console.log(resp.data)
        return resp.data.Item
      })
      .catch(error => console.log(error))
  }
}




