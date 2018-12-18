import React from "react";
import TextInput from "../common/TextInput";

const RegisterForm = props => {
  return (
    <React.Fragment>
      <TextInput
        label="Email"
        name="email"
        type="email"
        value={props.email}
        placeholder="Example@domain.com"
        onChange={props.onChange}
        isValid={props.emailValid || !props.showErrors}
        invalidText="Must have a valid email"
      />
      <TextInput
        className="pb-3"
        label="Password"
        name="password"
        type="password"
        placeholder="Enter Password.."
        value={props.password}
        onChange={props.onChange}
        isValid={props.passwordValid || !props.showErrors}
        invalidText="Password must be longer than 6 characters"
      />
      <TextInput
        className="pb-3 form-control"
        label="Password Confirm"
        name="passwordConfirm"
        type="password"
        placeholder="Password Confirmation..."
        value={props.passwordConfirm}
        onChange={props.onChange}
        isValid={props.passwordConfirmValid || !props.showErrors}
        invalidText="Passwords must match"
      />
      <button
        type="button"
        className="btn btn-primary btn-block mt-4"
        onClick={props.onClick}
      >
        <span>Register</span>
      </button>
    </React.Fragment>
  );
};

export default RegisterForm;
