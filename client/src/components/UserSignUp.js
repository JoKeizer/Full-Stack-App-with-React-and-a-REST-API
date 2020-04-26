import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: []
  };

  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={this.state.errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  onChange={this.change}
                  placeholder="First Name"
                />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  onChange={this.change}
                  placeholder="Last Name"
                />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={this.state.emailAddress}
                  onChange={this.change}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.change}
                  placeholder="Password"
                />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.change}
                  placeholder="Confirm Password"
                />
              </React.Fragment>
            )}
          />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }

  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

//Destructure props we take context from props and firstName, lastName emailAddress and password from state. 

  submit = () => {
    const { context } = this.props;
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;

    //Initialize a variable named user to an object whose properties are name, user and password:
    // New user payload
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };
    console.log("SUBMIT SIGNUP", user);
    if (confirmPassword !== password) {
      this.setState(() => {
        return {
          errors: ["Password Does Not Match Confirm Password"]
        };
      });
    } else {
    
    //To create a new user, call the createUser() method, which you can access via the destructured context variable. 
    // Context itself is an object which currently has only one property, data. Earlier, in Context.js, 
    // you passed Context.Provider a value prop whose value was an object with a data property. 
    // The authentication API utilities provided to app are available via the context.data property.
      context.data.createUser(user)
        .then(errors => {
          if (errors.length) {
            console.log(errors);
            this.setState(() => {
              return {
                errors: [errors]
              };
            });
          } else {
            context.actions.signIn(emailAddress, password).then(() => {
              this.props.history.push("/");
            });
          }
        })
        //A catch() method chained to the promise sequence handles a rejected promise returned by createUser(). For example, if there's an issue with the /users endpoint, 
        // the API is down, or there's a network connectivity issue, the function passed to catch() will get called.
        .catch(err => {
          console.log(err);
          this.props.history.push("/error");
        });
    }
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
