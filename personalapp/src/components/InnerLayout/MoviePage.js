import React from "react";
import MovieService from "../Services/MovieService";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./Layout.css";
import { moviesIntheatres, movieTrailers } from "../redux/AppActions";
import ModalVideo from "react-modal-video"

class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieArray: [],
      trailers: "",
      movieID: ""
    };
  }

  async componentDidMount() {
    this.props.currentMovies();
    this.props.currentTrailers();
    console.log(this.props.location);
    // const movies = await MovieService.getcurrentmovies();
    // this.setState({ movieArray: this.state.movieArray.concat(movies.data) })
    // const trailers = await MovieService.getmovietrailers();
    // this.setState({ trailers: trailers.data })
    const currentMovies = await MovieService.apigetcurrentmovie();
    this.setState({ movieArray: currentMovies.data.results })
    console.log(this.state)
  }

  onClick = evt => {
    evt.persist()
    console.log(evt.target.id)
    this.setState({ movieID: evt.target.id }, () => MovieService.apigettrailerbyid(this.state.movieID, this.onSuccess, this.onError))
    console.log(this.state.trailers)
  }

  onSuccess = resp => {
    console.log(resp.data.results[0])
    this.setState({ trailers: resp.data.results[0], isOpen: true })
  }

  onError = error => console.log(error)

  render() {
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplayspeed: 5000,
      speed: 10,
      slidesToShow: 5,
      slidesToScroll: 1,
      swipeToSlide: true,
      center: true,
      rows: 2
    };
    return (

      <div className="container movieBackground">
        <div style={{ paddingTop: "20px" }}>
          <ModalVideo channel="youtube" isOpen={this.state.isOpen} videoId={this.state.trailers.key ? this.state.trailers.key : ""} onClose={() => this.setState({ isOpen: false })} />
          <Slider {...settings}>
            {this.state.movieArray.map((movie, index) => {
              return (
                <div key={index}>
                  <div key={index} className="container itemsContainer" >
                    <img id={movie.id} onClick={this.onClick} src={` http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="" style={{ height: "33vh", width: " 12vw" }} />
                    <br />
                  </div>
                  <p style={{ color: "white", height: "50px", width: "12vw" }}>{movie.Title}</p>
                </div>)

            })}
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.AppReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    currentMovies: () => {
      dispatch(moviesIntheatres())
    },
    currentTrailers: () => {
      dispatch(movieTrailers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
