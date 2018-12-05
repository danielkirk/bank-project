import React from "react";
import MovieService from "../Services/MovieService";
import { connect } from "react-redux";
import Slider from "react-slick";
import ModalVideo from "react-modal-video";
import "./Layout.css";
import { moviesIntheatres, movieTrailers, getaspid, getUserId, getuser } from "../redux/AppActions";

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
        const id = sessionStorage.getItem("userId")
        this.props.getUser(id);
        const recommendations = await MovieService.getRecommendations(this.props.app.userinfo.GenreId)
        console.log(recommendations);
        this.setState({
            movieArray: recommendations.data.results
        })
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
                    <h3>Recommended Movies</h3>
                    <ModalVideo channel="youtube" isOpen={this.state.isOpen} videoId={this.state.trailers.key ? this.state.trailers.key : ""} onClose={() => this.setState({ isOpen: false })} />
                    <Slider {...settings}>
                        {this.state.movieArray.map((movie, index) => {
                            return (
                                <div className="pt-3" key={index}>
                                    <div key={index} className="container itemsContainer mb-5" >
                                        <img id={movie.id} onClick={this.onClick} src={` http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="" style={{ height: "33vh", width: " 12vw" }} />
                                        <br />
                                        <br />
                                    </div>
                                    <p style={{ color: "white", width: "12vw" }}>{movie.title}</p>
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
        },
        getUser: (id) => {
            dispatch(getuser(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieRandomizer);