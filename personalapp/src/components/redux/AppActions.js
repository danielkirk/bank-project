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

export function loginUser() {}
