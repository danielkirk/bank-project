import React from "react";
import axios from "axios";

class MovieService extends React.Component {
  static getupcomingmovies() {
    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=ecb01088d60b983e89731fa1e9b3ad7d&language=en-US&page=1`;
    const config = {
      type: "GET"
    };
    return axios(url, config);
  }

  static getcurrentmovies() {
    const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=ecb01088d60b983e89731fa1e9b3ad7d&language=en-US&page=1"
    const config = {
      type: "GET"
    }
    return axios(url, config)
  }
}

export default MovieService;
