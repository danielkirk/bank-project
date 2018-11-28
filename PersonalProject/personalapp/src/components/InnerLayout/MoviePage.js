import React from "react";
import MovieService from "../Services/MovieService";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./Layout.css";

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieArray: [],
      currentMovieArray: []
    };
  }

  async componentDidMount() {
    console.log(this.props.location);
    const movies = await MovieService.getupcomingmovies();
    this.setState({ movieArray: movies.data.results });
    const currentMovies = await MovieService.getcurrentmovies();
    this.setState({ currentMovieArray: currentMovies.data.results })
    console.log(this.state);
  }

  onClick = evt => {
    console.log(evt.target)
  }

  render() {
    const settings = {
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 200,
      infinite: true,
      speed: 1000,
      slidesToShow: 6,
      slidesToScroll: 1,
      swipeToSlide: true,
      centerMode: true,
      rows: 2
    };
    return (
      <div className="container movieBackground">
        <div style={{ paddingTop: "20px" }}>
          <Slider {...settings}>
            {this.state.movieArray.map((movie, index) => {
              return (
                <div key={index} className="container" style={{ height: "100px" }} >
                  <img id={movie.title} onClick={this.onClick} src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="" />
                  <label style={{ color: "white", height: "50px" }}>{movie.title}</label>
                  <br />
                </div>)
            })}
            {this.state.currentMovieArray.map((movie, index) => {
              return (
                <div key={index} className="container" style={{ height: "100px" }} >
                  <img id={movie.title} onClick={this.onClick} src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt="" />
                  <label style={{ color: "white", height: "50px" }}>{movie.title}</label>
                </div>)
            })}
          </Slider>
          <Slider {...settings}>

          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.AppReducer
  };
};

export default connect(mapStateToProps)(MoviePage);
