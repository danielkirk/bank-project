import React, { Component } from 'react';
import { moviesIntheatres, movieTrailers, getaspid, getUserId, getuser } from "../redux/AppActions";
import { connect } from "react-redux";
import "./HomePageInner.css"

class HomePAge extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        const id = sessionStorage.getItem("userId")
        this.props.getUser(id);
    };
    render() {
        return (
            <div className="background1">
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePAge);