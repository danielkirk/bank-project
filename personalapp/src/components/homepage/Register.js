import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MovieService from "../Services/MovieService"
import "./Homepage.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      genreId: "",
      email: "",
      password: "",
      formErrors: {
        email: "",
        password: "",
        genreId: {}
      },
      firstNameValid: false,
      lastNameValid: false,
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
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let passwordConfirmValid = this.state.passwordConfirmValid;
    switch (fieldName) {
      case "firstName":
        firstNameValid = value.length > 1;
        fieldValidationErrors.firstName = firstNameValid ? "" : "Must have name";
        break;
      case "lastName":
        lastNameValid = value.length > 1;
        fieldValidationErrors.lastName = lastNameValid ? "" : "Must have name";
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
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
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
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.passwordConfirmValid
    });
  }

  handleChange = selectedOption => {
    this.setState({ genreId: selectedOption });
    console.log(selectedOption);
  };

  onClick = () => {
    const { firstName, lastName, email, password, passwordConfirm } = this.state;
    console.log(this.state)
    const data = { email: email, password: password, confirmPassword: passwordConfirm };
    const registerData = { FirstName: firstName, LastName: lastName, Email: email, genreId: this.state.genreId.value }
    if (this.state.formValid) {
      MovieService.loginUser(data, this.onSuccess, this.onError);
      MovieService.register(registerData);
    } else {
      this.setState({
        showErrors: true
      });
    }
  };

  onError = error => console.log(error)

  onSuccess = (resp) => {
    console.log(resp);
    this.props.history.push("./login");
  };

  render() {
    const options = [
      { value: 338952, label: "Adventure" },
      { value: 454293, label: "Comedy" },
      { value: 332562, label: "Romance" },
      { value: 424139, label: "Thriller" },
      { value: 424694, label: "Drama" },
      { value: 375588, label: "Action" },
      { value: 360920, label: "Family" },
      { value: 335983, label: "Comics" },
      { value: 351286, label: "SciFi" },
      { value: 507569, label: "Animation" }
    ];
    const { genreId } = this.state;
    const value = genreId && genreId.value;

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
