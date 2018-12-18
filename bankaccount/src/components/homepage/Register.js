import React, { Component } from "react";
import RegisterForm from "./RegistrationForm";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import BankService from "../services/BankServices";
import "./HomePage.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      value: 0,
      formErrors: {
        email: "",
        password: ""
      },
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      passwordConfirmValid: false,
      showErrors: false
    };
  }

  componentDidMount() {}

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
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let passwordConfirmValid = this.state.passwordConfirmValid;
    switch (fieldName) {
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
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.passwordConfirmValid
    });
  }

  onClick = () => {
    const { email, password, passwordConfirm } = this.state;
    const data = {
      email: email,
      password: password,
      confirmPassword: passwordConfirm
    };
    if (this.state.formValid) {
      BankService.registerUser(data, this.onSuccess, this.onError);
    } else {
      this.setState({
        showErrors: true
      });
    }
  };

  onError = error => console.log(error);

  onSuccess = async resp => {
    console.log(resp);
    const { email, value } = this.state;
    const UserId = await BankService.getUserId(this.state.email);
    console.log(UserId.data.AspId);
    this.setState({ UserId: UserId.data.AspId }, () => {
      const data = {
        Email: email,
        Value: value,
        AspNetUserId: this.state.UserId
      };
      BankService.createBankAccount(data);
    });
    this.props.history.push("./login");
  };

  render() {
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
                      <div className="container card">
                        <div className="card-body">
                          <div className="d-flex justify-content-center align-items-center pb-2 mb-4" />
                          <h5
                            className="text-center font-weight-normal mb-4"
                            style={{ color: "blue" }}
                          >
                            Create an Account
                          </h5>
                          <form>
                            <RegisterForm
                              {...this.state}
                              onChange={this.onChange}
                              onClick={this.onClick}
                            />
                          </form>
                        </div>
                        <div className="card-footer px-4 px-md-3 px-xs-3 px-sm-5">
                          <div
                            className="text-center"
                            style={{ color: "black" }}
                          >
                            Already have an account?{" "}
                            <Link to="/login" style={{ color: "silver" }}>
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
  return { user: state.BankReducer };
};

export default connect(mapStateToProps)(Register);
