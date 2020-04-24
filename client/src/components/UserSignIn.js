import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

//This Component Signs In a User who already has an exisiting Email Address

export default class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    errors: []
  };

  render() {
    const { emailAddress, password, errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  }
  // change handles the changing input fields
  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  // submit handles the submitting of the Form and Handles any Errors
  //destructuring props and state

  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || {
      from: { pathname: "/" }
    };
    const { emailAddress, password } = this.state;

    //Call the signIn() function, which you can access via the destructured context variable. 
    // In Context.js, you passed Context.Provider a value prop whose value was an object with an actions property. 
    // The signIn() function provided to the UserSignIn component is available via context.actions.signIn:

    context.actions
      .signIn(emailAddress, password)
      .then(user => {
        //If the returned promise value is null, set the errors state of the UserSignIn class to an array which holds the string 'Sign-in was unsuccessful' (this will be the validation message displayed to the user):
        if (user === null) {
          this.setState(() => {
            return { errors: ["Sign-in was unsuccessful"] };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch(error => {
        console.error(error);
        this.props.history.push("/error");
      });
  };

    //To accomplish the redirect, we'll once again use history. In the body of the cancel function push the root path ('/') onto the history stack:

  cancel = () => {
    this.props.history.push("/");
  };
}
