import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./components/movie";
import NavBar from "./components/navbar";
import Customers from "./components/customers";
import Rental from "./components/rental";
import NotFound from "./components/not-found";
import LoginFrom from "./components/login-form";
import MovieForm from "./components/movie-form";

import Register from "./components/register-form";
import auth from "./services/auth-service";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/ProtectedRoute";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user: user });
  }
  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginFrom} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <ProtectedRoute
              path="/movies/:id"
              user={user}
              component={MovieForm}
            />
            {/* <Route
              path="/movies/:id"
              render={props => {
                if (user) return <MovieForm {...props} />;
                return <Redirect to="/login" />;
              }}
            /> */}
            <Route path="/movies/new" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rental" component={Rental} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default App;
