import React from "react";
import MovieService from "../Services/MovieService";
import { connect } from "react-redux";
import Slider from "react-slick";

import "./Layout.css";
import { moviesIntheatres, movieTrailers, getaspid, getUserId } from "../redux/AppActions";

class MovieRandomizer extends React.Component {
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
        const currentMovies = await MovieService.apigetcurrentmovie();
        this.setState({ movieArray: currentMovies.data.results })
        console.log(this.state);
        const email = sessionStorage.getItem("email")
        this.props.getAsp(email);
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
            className: "center",
            dots: false,
            autoplay: false,
            autoplaySpeed: 1,
            speed: 100,
            arrows: false,
            slidesToShow: 5,
            centerPadding: "10px",
            useTransform: false,
            vertical: false,
            rows: 2,
            center: true,
            arrows: true
        };
        return (

            <div className="container movieBackground">

                <div style={{ paddingTop: "20px" }}>
                    <h3>Movies Coming Out Soon</h3>
                    <Slider {...settings}>
                        {this.props.app.currentMovies.map((movie, index) => {
                            return (
                                <div className="pt-3" key={index}>
                                    <div key={index} className="container itemsContainer mb-5" >
                                        <img id={movie.id} onClick={this.onClick} src={`${movie.Image}`} alt="" style={{ height: "33vh", width: " 12vw" }} />
                                        <br />
                                        <br />
                                    </div>
                                    <p style={{ color: "white", width: "12vw" }}>{movie.Title}</p>
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
        app: state.AppReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        currentMovies: () => {
            dispatch(moviesIntheatres())
        },
        currentTrailers: () => {
            dispatch(movieTrailers())
        },
        getAsp: (email) => {
            dispatch(getaspid(email))
                .then(resp => {
                    console.log(resp)
                    dispatch(getUserId(resp.action.payload))
                })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieRandomizer);
