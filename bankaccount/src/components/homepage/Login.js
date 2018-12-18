import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import "./HomePage.css";
import {
  loginUser,
  getUserIdByEmail,
  getBankAccountById
} from "../redux/BankActions";
import { withRouter } from "react-router-dom";
// import { loginUser } from "../redux/AppActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {}

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({
      [key]: val
    });
  };

  onClick = evt => {
    this.props.setloginUser(this.state.email, this.state.password);
    this.props.setUserId(this.state.email);
    this.props.history.push("/");
  };

  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-center background page"
        style={{ height: "100vh" }}
      >
        <div className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container container-fluid px-4">
          <div className="row">
            <div className="authentication-inner py-5 mx-auto">
              <div
                style={{
                  minWidth: "25vw",
                  maxWidth: "70vw",
                  minHeight: "60vh",
                  maxHeight: "85vh"
                }}
              >
                <div
                  className="d-flex justify-content-center align-items-center pb-2 mb-4"
                  style={{
                    minWidth: "25vw",
                    maxWidth: "20vw",
                    minHeight: "60vh",
                    maxHeight: "85vh"
                  }}
                >
                  <div className="container card">
                    <div className="card-body">
                      <div className="d-flex justify-content-center align-items-center pb-2 mb-4" />
                      <h5
                        className="text-center font-weight-normal mb-4"
                        style={{ color: "gold" }}
                      >
                        Sign in
                      </h5>
                      <form className="me">
                        <LoginForm
                          {...this.state}
                          onChange={this.onChange}
                          onClick={this.onClick}
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.BankReducer
  };
};

const dispatchStateToProps = dispatch => {
  return {
    setloginUser: (username, password) => {
      dispatch(loginUser(username, password));
    },
    setUserId: email => {
      dispatch(getUserIdByEmail(email)).then(resp => {
        console.log(resp);
        dispatch(getBankAccountById(resp.value));
      });
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    dispatchStateToProps
  )(Login)
);
