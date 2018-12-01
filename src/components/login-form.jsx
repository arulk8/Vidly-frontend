import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "./../services/auth-service";
import { Redirect } from "react-router-dom";
class LoginFrom extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async e => {
    // call to server
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      // this.props.history.push("/"); user is not displaying
      console.log(this.props);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";

      return;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSumbit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderLabel("Login")}
        </form>
      </div>
    );
  }
}

export default LoginFrom;
