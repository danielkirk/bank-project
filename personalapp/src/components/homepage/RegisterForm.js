import React from "react";
import TextInput from "../common/TextInput";
import Select from "react-select";

const RegisterForm = props => {
  return (
    <React.Fragment>
      <TextInput
        style={{ color: "whitesmoke" }}
        label="First Name"
        name="firstName"
        type="text"
        value={props.firstName}
        placeholder="Enter first name here..."
        onChange={props.onChange}
        isValid={props.ameValid || !props.showErrors}
        invalidText="User must have a first name"
      />
      <TextInput
        style={{ color: "whitesmoke" }}
        label="Last Name"
        name="lastName"
        type="text"
        value={props.lastName}
        placeholder="Enter last name here..."
        onChange={props.onChange}
        isValid={props.lastNameValid || !props.showErrors}
        invalidText="User must have a last name"
      />
      <TextInput
        style={{ color: "whitesmoke" }}
        label="Email"
        name="email"
        type="email"
        value={props.email}
        placeholder="Example@domain.com"
        onChange={props.onChange}
        isValid={props.emailValid || !props.showErrors}
        invalidText="Must have a valid email"
      />
      <div className="form-group">
        <h6 style={{ color: "whitesmoke" }}> Genre preferences</h6>
        <Select
          name="gender"
          isMulti={false}
          multi={true}
          options={props.options}
          value={props.genreId}
          onChange={props.handleChange}
        />
      </div>
      <TextInput
        style={{ color: "whitesmoke" }}
        className="pb-3"
        label="Password"
        name="password"
        type="password"
        placeholder="Enter Password.."
        value={props.password}
        onChange={props.onChange}
        isValid={props.passwordValid || !props.showErrors}
        invalidText="password must be longer than 6 characters"
      />
      <TextInput
        style={{ color: "whitesmoke" }}
        className="pb-3 form-control"
        label="Password Confirm"
        name="passwordConfirm"
        type="password"
        placeholder="Confirm Password..."
        value={props.passwordConfirm}
        onChange={props.onChange}
        isValid={props.passwordConfirmValid || !props.showErrors}
        invalidText="Passwords must match"
      />
      <button
        type="button"
        className="btn btn-danger btn-block mt-4"
        onClick={props.onClick}
      >
        <span style={{ color: "gold" }}>Register</span>
      </button>
    </React.Fragment>
  );
};

export default RegisterForm;
