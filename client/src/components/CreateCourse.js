import React, { Component } from 'react';
import ErrorsDisplay from './ErrorsDisplay.js';

export default class CreateCourses extends Component {
  state = {
    title: '', 
    description: '', 
    estimatedTime: '', 
    materialsNeeded: '',
    errors: [],
    userId: '',
    context: this.props.context,
    
  }


// Handles the click functionality for when user hits cancel.
  handleClick = e => {
      e.preventDefault();
      this.props.history.push('/');
  }

// Handles the submit functionality for when user submits new course info.
  handleSubmit = (e) => {
      e.preventDefault();
      this.submit();
  }

  render() {
    const {
      title, 
      estimatedTime, 
      errors,
      context
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Create Course test</h1>
        <div>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" onChange={this.change} placeholder="Course title..." defaultValue={title} /></div>
                <p>By {`${context.authenticatedUser.name}`}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" onChange={this.change} placeholder="Course description..."></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" onChange={this.change} placeholder="Hours" defaultValue={estimatedTime} /></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" onChange={this.change} placeholder="List materials..."></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={this.handleClick}>Cancel</button></div>
          </form>
        </div>
      </div>
    );
  }

// Sets and changes state when user updates input fields.
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
        return {
        [name]: value
        };
    });
}

// Sends new course data and checks for errors 
submit = () => {
    const { title, description, estimatedTime, materialsNeeded, context} = this.state;
    const { email, password} = context.authenticatedUser;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: context.authenticatedUser.id
  }

    context.data.createCourse(email, password, course)
     .then( errors => {
      if (errors.length) {
          this.setState({errors});
         } else {
             this.props.history.push('/');
         }
     })
     .catch( err => {
         this.props.history.push('/error');
     })
}

}

