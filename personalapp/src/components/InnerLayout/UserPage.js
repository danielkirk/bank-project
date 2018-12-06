import React, { Component } from "react";
import RegistrationDos from "../homepage/RegistrationDos";
import { connect } from "react-redux";
import "./UserPage.css";
import MovieService from "../Services/MovieService";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  moviesIntheatres,
  movieTrailers,
  getaspid,
  getUserId,
  getuser
} from "../redux/AppActions";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      genreId: "",
      formErrors: {
        email: "",
        password: "",
        genreId: {}
      },
      firstNameValid: true,
      lastNameValid: true,
      emailValid: true,
      passwordValid: true,
      passwordConfirmValid: true,
      showErrors: true,
      show: false,
      showDelete: false
    };
  }

  async componentDidMount() {
    const id = this.props.App.userId
      ? this.props.App.userId
      : sessionStorage.getItem("userId");
    this.setState({ userId: id });
    const movies = await MovieService.getbyid(id);
    console.log(movies.data.Item);
    const data = movies.data.Item;
    this.setState(
      {
        firstName: data.FirstName,
        lastName: data.LastName,
        email: data.Email,
        genreId: data.GenreId
      },
      () => console.log(this.state)
    );
  }

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
    switch (fieldName) {
      case "firstName":
        firstNameValid = value.length > 1;
        fieldValidationErrors.firstName = firstNameValid
          ? ""
          : "Must have name";
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
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        emailValid: emailValid
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid: true
    });
  }

  handleChange = selectedOption => {
    this.setState({ genreId: selectedOption });
    console.log(selectedOption);
  };

  onClick = () => {
    const { userId, firstName, lastName, email } = this.state;
    const registerData = {
      Id: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      genreId: this.state.genreId.value
    };
    console.log(registerData);
    console.log(userId);
    MovieService.update(userId, registerData);
    this.setState({
      show: true
    });
  };

  deleteClick = () => {
    this.setState({ showDelete: true });
    const { userId } = this.state;
    const AspId = this.props.App.aspId;
    console.log(userId, AspId);
  };

  confirmDelete = async () => {
    const { userId } = this.state;
    const AspId = this.props.App.aspId;
    console.log(userId, AspId);
    await MovieService.delete(AspId, userId);
    sessionStorage.removeItem("token");
    this.setState({ showDelete: false }, () =>
      window.location.replace("http://localhost:3000/")
    );
  };

  cancelBack = () => {
    this.setState({
      show: false,
      showDelete: false
    });
    const id = sessionStorage.getItem("userId");
    this.props.getUser(id);
  };

  onMountRenderId = () => {
    switch (this.state.genreId) {
      case 338952:
        console.log("hi");
        return "Adventure";
      case 454293:
        console.log("hi2");
        return "Comedy";
      case 332562:
        console.log("hi3");
        return "Romance";
      case 424139:
        console.log("hi4");
        return "Thriller";
      case 424694:
        console.log("hi5");
        return "Drama";
      case 335983:
        console.log("hi6");
        return "Action";
      case 254470:
        console.log("hi7");
        return "Family";
      case 351286:
        console.log("hi8");
        return "SciFi";
      default:
        break;
    }
  };

  render() {
    const options = [
      { value: 338952, label: "Adventure" },
      { value: 454293, label: "Comedy" },
      { value: 332562, label: "Romance" },
      { value: 424139, label: "Thriller" },
      { value: 424694, label: "Drama" },
      { value: 335983, label: "Action" },
      { value: 254470, label: "Family" },
      { value: 351286, label: "SciFi" }
    ];
    const { genreId } = this.state;
    const value = genreId && genreId.value;
    return (
      <div className="editContainer">
        <SweetAlert
          success
          show={this.state.show}
          allowEscape={true}
          closeOnClickOutside={true}
          confirmBtnText="Dope!"
          confirmBtnBsStyle="primary"
          title="User info updated"
          onConfirm={this.cancelBack}
        >
          Your User info has been updated!
        </SweetAlert>
        <SweetAlert
          danger
          showCancel
          show={this.state.showDelete}
          allowEscape={true}
          closeOnClickOutside={true}
          confirmBtnText="Not Dope..."
          confirmBtnBsStyle="danger"
          title="Deactivate Account"
          cancelBtnBsStyle="default"
          onConfirm={this.confirmDelete}
          onCancel={this.cancelBack}
        >
          You are going to deactivate this account, and will be logged out.
        </SweetAlert>
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
                        <form>
                          <RegistrationDos
                            {...this.state}
                            onChange={this.onChange}
                            onClick={this.onClick}
                            options={options}
                            defaultValue={this.onMountRenderId()}
                            value={value}
                            handleChange={this.handleChange}
                            deleteClick={this.deleteClick}
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    App: state.AppReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    currentMovies: () => {
      dispatch(moviesIntheatres());
    },
    currentTrailers: () => {
      dispatch(movieTrailers());
    },
    getAsp: email => {
      dispatch(getaspid(email)).then(resp => {
        console.log(resp);
        dispatch(getUserId(resp.action.payload));
      });
    },
    getUser: id => {
      dispatch(getuser(id));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
