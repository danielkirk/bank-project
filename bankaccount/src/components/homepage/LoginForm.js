import React from "react";
import TextInput from "../common/TextInput";

const LoginForm = props => {
  return (
    <div className="authentication-inner">
      <TextInput
        style={{ color: "whitesmoke" }}
        label="Email"
        name="email"
        type="email"
        value={props.email}
        placeholder="Example@domain.com"
        onChange={props.onChange}
      />
      <TextInput
        style={{ color: "whitesmoke" }}
        className="pb-3"
        label="Password"
        name="password"
        type="password"
        placeholder="Enter Password.."
        value={props.password}
        onChange={props.onChange}
      />
      <button
        type="button"
        className="btn btn-danger btn-block mt-4"
        onClick={props.onClick}
      >
        <span style={{ color: "yellow" }}>Log in</span>
      </button>
    </div>
  );
};

export default LoginForm;
