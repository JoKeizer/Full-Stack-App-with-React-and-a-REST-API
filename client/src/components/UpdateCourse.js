import React, { Component } from 'react';
import ErrorsDisplay from './ErrorsDisplay.js';

export default class UpdateCourse extends Component {
  constructor(props) {
    super(props);
      this.state = {
          title: '',
          description: '',
          estimatedTime: '',
          materialsNeeded: '',
          course_id: '',
          params: this.props.match.params,
          user: [],
          context: this.props.context,
          errors: [],
          loaded: false
        };
        this.change = this.change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      componentDidMount(){
          /**
          * Fetches course data that needs to be updated
          */
          fetch(`http://localhost:5000/api/courses/${this.state.params.id}`)
              .then( response => response.json())
              .then( responseData => {
                  this.setState({ 
                  title: responseData.title, 
                  description: responseData.description,
                  estimatedTime: responseData.estimatedTime,
                  materialsNeeded: responseData.materialsNeeded,
                  course_id: responseData.id,
                  loaded: true
              });
              return responseData
              })
              .then( data => {
                  this.setState({
                      user: data.User
                  })
              })
      }
  
    /**
    * Handles the submit functionality for when user submits updated info.
    * @param {event} Submit - when user submits updated info. 
    */
    handleSubmit = (e) => {
      e.preventDefault();
      this.submit();
    }
  
    /**
    * Handles the click functionality for when user hits cancel.
    * @param {event} Click - when user clicks button to cancel. 
    */
    handleClick = e => {
      e.preventDefault();
      this.props.history.push(`/courses/${this.state.course_id}`);
    }

    render() {
      //Checks if page exists
      if (this.state.loaded) {
        if (!this.state.course_id) {
          window.location.replace('/notfound');
        }
    }
        const {
          title, 
          description, 
          estimatedTime, 
          materialsNeeded,
          errors
        } = this.state;

        return (
        <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <ErrorsDisplay errors={errors} />
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" onChange={this.change} placeholder="Course title..." value={title} /></div>
                <p>By {`${this.state.context.authenticatedUser.name}`}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" onChange={this.change} placeholder="Course Description..." value={description}>
                </textarea></div>
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
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" onChange={this.change} placeholder={materialsNeeded} defaultValue={materialsNeeded}>
                    </textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={this.handleClick}>Cancel</button></div>
          </form>
        </div>
      </div>
    );
  }

  /**
  * Sets and changes state when user updates input fields.
  * @param {event} change - input fields. 
  */
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
        return {
        [name]: value
        };
    });
  }

  /**
  * Sends updated request and checks for errors
  */
  submit = () => {
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded, course_id} = this.state
    const { email, password } = context.authenticatedUser;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: context.authenticatedUser.id
    }
    const path = `/courses/${this.state.course_id}`;

    if (context.authenticatedUser.id == course_id) {

      context.data.updateCourse(email, password, course, path )
      .then( errors => {
        console.log("then running")
        if (errors.length) {
            this.setState({errors});
          } else {
              this.props.history.push(`/courses/${course_id}`);
          }
      })
      .catch( err => {
          this.props.history.push('/error');
      })
    } else {
      window.location.replace('/forbidden');
    }
  }
}
