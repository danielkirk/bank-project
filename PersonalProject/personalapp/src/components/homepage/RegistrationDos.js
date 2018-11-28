import React from "react";
import TextInput from "../common/TextInput";
import Select from "react-select";

const RegisterDos = props => {
    return (
        <React.Fragment>
            <TextInput
                style={{ color: "whitesmoke" }}
                label="Name"
                name="name"
                type="text"
                value={props.name}
                placeholder="Enter name here..."
                onChange={props.onChange}
                isValid={props.nameValid || !props.showErrors}
                invalidText="User must have a name"
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
            <TextInput
                style={{ color: "whitesmoke" }}
                label="Address"
                name="address"
                type="text"
                value={props.address}
                placeholder="[Optional] Enter your current address"
                onChange={props.onChange}
            />
            <div className="form-group">
                <h6 style={{ color: "whitesmoke" }}> Genre preferences</h6>
                <Select
                    isMulti={true}
                    multi={true}
                    options={props.options}
                    value={props.value}
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

export default RegisterDos;
