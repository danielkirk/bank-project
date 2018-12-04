import React, { Component } from 'react';
import RegisterationDos from "../homepage/RegistrationDos";
import { connect } from "react-redux";
import "./UserPage.css"
import MovieService from '../Services/MovieService';

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
            firstNameValid: false,
            lastNameValid: false,
            emailValid: false,
            passwordValid: false,
            passwordConfirmValid: false,
            showErrors: false
        }
    }

    async componentDidMount() {
        console.log(this.props)
        const id = sessionStorage.getItem("userId")
        this.setState({ userId: id })
        const movies = await MovieService.getbyid(id)
        console.log(movies.data.Item)
        const data = movies.data.Item;
        this.setState({
            firstName: data.FirstName, lastName: data.LastName, email: data.Email, genreId: data.GenreId
        }, () => console.log(this.state))
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
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                firstNameValid: firstNameValid,
                lastNameValid: lastNameValid,
                emailValid: emailValid,
            },
            this.validateForm
        );
    }

    validateForm() {
        this.setState({
            formValid:
                this.state.firstNameValid &&
                this.state.lastNameValid &&
                this.state.emailValid
        });
    }

    handleChange = selectedOption => {
        this.setState({ genreId: selectedOption });
        console.log(selectedOption);
    };

    onClick = async () => {
        const { firstName, lastName, email } = this.state
        const registerData = { FirstName: firstName, LastName: lastName, Email: email, genreId: this.state.genreId.value }
        if (this.state.formValid) {
            await MovieService.update(this.state.userId, registerData)
                .then(this.history.push("/"));
        } else {
            this.setState({
                showErrors: true
            });
        }
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
            <div className="editContainer">
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
                                                <form >
                                                    <RegisterationDos
                                                        {...this.state}
                                                        onChange={this.onChange}
                                                        onClick={this.onClick}
                                                        options={options}
                                                        value={value}
                                                        handleChange={this.handleChange}
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
    }
}
export default connect(mapStateToProps)(UserPage);