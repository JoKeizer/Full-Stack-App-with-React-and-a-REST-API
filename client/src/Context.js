import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const value = {
      authenticatedUser: this.state.authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        signUp: this.signUp,
        getCourses: this.getCourses

      }
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (email, password) => {
    console.log("signup running?")

    const user = await this.data.getUser(email, password);
    console.log("user sign in ", user)

    if (user !== null) {
      console.log("user from signIn", user);
      const storedUser = Object.assign({}, user, { email, password});
      this.setState(() => {
        return { authenticatedUser: storedUser };
      });

      Cookies.set("authenticatedUser", JSON.stringify(storedUser), {
        expires: 1
      });
    }
    return user;
  };

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null
      };
    });
    Cookies.remove("authenticatedUser");
  };

  //method used to sign up a user, returns an errors array
  signUp = async (userData) => {
    const response = await this.data('/users', 'POST', userData);
    if (response.status === 201) {
        //returns empty errors array if user successfully created
        return [];
    } else if (response.status === 400) {
        //returns errors array if validation fails
        return response.json()
                .then(responseData => {
                    return responseData.errors;
                })
    } else if (response.status === 200) {
        //returns errors array if user already exists
        return response.json()
            .then(responseData => {
                return [ responseData.message ];
            })
    } else {
        throw new Error();
    }
}


//method used to retrieve all course data
getCourses = async () => {
  const response = await this.callApi(`/courses`, 'GET', null);
  if (response.status === 200) {
      //returns all course data if successful
      return response.json()
          .then(responseData => responseData);
  } else {
      throw new Error();
  }
}
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
