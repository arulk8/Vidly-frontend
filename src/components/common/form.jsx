import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import DropDown from "./dropdown";
class Form extends Component {
  state = {
    data: {},
    error: {}
  };

  validate = () => {
    const errors = {};

    const { error } = Joi.validate(this.state.data, this.schema);
    if (!error) {
      return null;
    }
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  validateProperty = input => {
    const { name, value } = input;

    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSumbit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    // event object destructured to  {currentTarget} with alias input
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data: data, errors: errors });
  };
  renderLabel = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        label={label}
        value={data[name]}
        handleChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderDropdown(name, label, options) {
    const { data, errors } = this.state;
    return (
      <DropDown
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        handleChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default Form;
