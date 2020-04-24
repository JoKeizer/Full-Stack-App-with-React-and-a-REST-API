// Imports of Components

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import "./global.css";
import Header from "./components/Header";
import Authenticated from "./components/Authenticated";

import NotFound from "./components/NotFound";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";

// Initialize a variable named UserSignUpWithContext. Set the value to call withContext(UserSignUp):
import withContext from "./Context";

// This connects the UserSignUp component to context. In other words, 
// UserSignUp is now a consuming component that's subscribed to all context changes.
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

export default () => (
  <Router>
    <HeaderWithContext />
    <div>
      {/* 
        The Routes for the Project. 
      */}
      <Switch>
   
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
