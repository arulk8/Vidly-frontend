import React from "react";
const Input = ({ name, label, type, value, error, handleChange }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          autoFocus
          id={name}
          type={type}
          className="form-control"
          name={name}
          onChange={handleChange}
          value={value}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
