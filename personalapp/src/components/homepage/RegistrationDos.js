import React from "react";
import TextInput from "../common/TextInput";
import Select from "react-select";

const RegisterDos = props => {
  return (
    <React.Fragment>
      <TextInput
        style={{ color: "black" }}
        label="First Name"
        name="firstName"
        type="text"
        value={props.firstName}
        placeholder="Enter first name here..."
        onChange={props.onChange}
        isValid={props.firstNameValid || !props.showErrors}
        invalidText="User must have a first name"
      />
      <TextInput
        style={{ color: "black" }}
        label="Last Name"
        name="lastName"
        type="text"
        value={props.lastName}
        placeholder="Enter your last name"
        onChange={props.onChange}
        isValid={props.lastNameValid || !props.showErrors}
        invalidText="User must have a last name"
      />
      <TextInput
        style={{ color: "black" }}
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
        <h6 style={{ color: "black" }}> Genre preference</h6>
        <Select
          placeholder={props.defaultValue}
          options={props.options}
          value={props.genreId}
          onChange={props.handleChange}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary btn-block mt-4"
        onClick={props.onClick}
      >
        <span style={{ color: "gold" }} onClick={props.onClick}>
          Update
        </span>
      </button>
      <button
        type="button"
        className="btn btn-danger btn-block mt-4"
        onClick={props.deleteClick}
      >
        <span style={{ color: "gold" }} onClick={props.deleteClick}>
          Deactivate Account
        </span>
      </button>
    </React.Fragment>
  );
};

export default RegisterDos;
