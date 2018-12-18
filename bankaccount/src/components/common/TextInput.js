import React from "react";

const TextInput = props => {
  return (
    <div className="form-group">
      <label style={props.style} className="form-label" htmlFor={props.label}>
        {props.label}
      </label>
      <input
        className={`form-control input-sm ${props.isValid ? "" : "is-invalid"}`}
        name={props.name}
        type={props.type}
        value={props.value}
        step={props.step}
        min={props.min}
        checked={props.checked}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={props.onChange}
      />
      <div className="invalid-feedback">{props.invalidText}</div>
    </div>
  );
};

export default TextInput;
