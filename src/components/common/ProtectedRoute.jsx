import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

import auth from "../../services/auth-service";
const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const user = auth.getCurrentUser();

  return (
    <Route
      {...rest}
      render={props => {
        if (user) return Component ? <Component {...props} /> : render(props);
        return (
          <Redirect
            to={{
              state: { from: props.location },
              pathname: "/login"
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
