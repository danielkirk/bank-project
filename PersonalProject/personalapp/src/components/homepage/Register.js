import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Homepage.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: {
        email: "",
        password: "",
        selectedOption: ""
      },
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      passwordConfirmValid: false,
      showErrors: false
    };
  }

  componentDidMount() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    const newPosition = navigator.geolocation.watchPosition(
      this.displayLocation
    );
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.success,
        this.error,
        options
      );
      navigator.geolocation.clearWatch(newPosition);
    } else {
      console.log("rip");
    }
  }

  displayLocation = position => {
    console.log(position.coords);
  };

  success = pos => {
    const coordinates = pos.coords;
    console.log(
      `Your current position is: ${coordinates.latitude}, ${
        coordinates.longitude
      }`
    );
  };

  error = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState(
      {
        [key]: val
      },
      () => {
        this.validateField(key, val);
      }
    );
  };
  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let passwordConfirmValid = this.state.passwordConfirmValid;
    switch (fieldName) {
      case "name":
        nameValid = value.length > 1;
        fieldValidationErrors.name = nameValid ? "" : "Must have name";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid
          ? ""
          : "Field is required to be an email";
        break;
      case "password":
        passwordValid = value.length > 5;
        fieldValidationErrors.password = passwordValid
          ? ""
          : " password required to be 6 characters minimum.";
        break;
      case "passwordConfirm":
        passwordConfirmValid = value === this.state.password;
        fieldValidationErrors.passwordConfirm = passwordConfirmValid
          ? ""
          : "Passwords must match";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        emailValid: emailValid,
        passwordValid: passwordValid,
        passwordConfirmValid: passwordConfirmValid
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.passwordConfirmValid
    });
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption: selectedOption });
    console.log(selectedOption);
  };

  onClick = () => {
    if (this.state.formValid) {
      console.log("place axios here");
    } else {
      this.setState({
        showErrors: true
      });
    }
  };

  sendToLogin = () => {
    this.props.history.push("./login");
  };

  render() {
    const options = [
      { value: 12, label: "Adventure" },
      { value: 35, label: "Comedy" },
      { value: 10749, label: "Romance" },
      { value: 53, label: "Thriller" },
      { value: 18, label: "Drama" },
      { value: 28, label: "Action" },
      { value: 10751, label: "Family" },
      { value: 878, label: "SciFi" },
      { value: 16, label: "Animation" }
    ];
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <React.Fragment>
        <div className="background page">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container container-fluid px-4">
              <div className="row">
                <div className="authentication-inner py-5 mx-auto">
                  <div
                    className=""
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
                      <div className="container">
                        <div className="card-body">
                          <div className="d-flex justify-content-center align-items-center pb-2 mb-4" />
                          <h5
                            className="text-center font-weight-normal mb-4"
                            style={{ color: "gold" }}
                          >
                            Create an Account
                          </h5>
                          <form>
                            <RegisterForm
                              {...this.state}
                              onChange={this.onChange}
                              onClick={this.onClick}
                              options={options}
                              value={value}
                              handleChange={this.handleChange}
                            />
                          </form>
                        </div>
                        <div className="card-footer px-4 px-md-3 px-xs-3 px-sm-5">
                          <div
                            className="text-center card"
                            style={{ color: "black" }}
                          >
                            Already have an account?{" "}
                            <Link to="/login" style={{ color: "red" }}>
                              Sign In
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { location: state.AppReducer };
};

export default connect(mapStateToProps)(Register);
