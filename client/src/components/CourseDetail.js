import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import ErrorsDisplay from './ErrorsDisplay.js';
import { Link } from 'react-router-dom';

export default class CourseDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        course : [],
        params: props.match.params,
        user: [],
        errors:[], 
        loaded: false,
        authenticatedUser: [],
        context: this.props.context,

      };
  
    }
  
    componentDidMount(){
        // Fetches a specific course's data
        fetch(`http://localhost:5000/api/courses/${this.state.params.id}`)
            .then( response => response.json())
        
            .then( responseData => {
                this.setState({ 
                course: responseData,
                loaded: true,
                user: responseData.creator

            });
            return responseData
            })
        

    }

    // Checks whether user is authorized to update and/or delete course content
    submit = () => {

        const { context } = this.props;
        const { email, password } = context.authenticatedUser;
    
        const path = `/courses/${this.state.params.id}`;

        if (context.authenticatedUser.id.toString() === this.state.course.userId.toString()) {
 
          context.data.deleteCourse(email, password, path )
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
        } else {
            this.setState( {
              errors: ['You are not authorized to delete this course.']
            })
        }
    }

    // Handles the submit functionality for deleting a course.
    handleSubmit = (e) => {
        e.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete course?");
        if (confirmDelete) {
            this.submit();
        }
    }

    render() {

        // Checks if page exists
        if (this.state.loaded) {
            if (!this.state.course.id) {
                window.location.replace('/notfound')
            }
        }

        // Checks for authentication and renders the delete and update buttons
        const { errors } = this.state;
        let buttons;

        if (this.props.context.authenticatedUser) {
            console.log(this.props.context.authenticatedUser.id.toString())
            // console.log(this.state.user.id.toString())

            if (this.props.context.authenticatedUser.id == this.state.user.id) {
                buttons = (           
                <div className="grid-100"><span>
                    <Link className="button" to={`/courses/${this.state.params.id}/update`}>Update Course</Link>
                    <button onClick={this.handleSubmit} className="button" >Delete Course</button>
                   </span>
                    <Link className="button button-secondary" to="/">Return to List</Link></div>);
            } else {
                buttons = (
                    <div className="grid-100"><Link
                    className="button button-secondary" to="/">Return to List</Link></div>
                )
            }
        } else {
            buttons = (
                <div className="grid-100"><Link
                className="button button-secondary" to="/">Return to List</Link></div>
            )
        }

      return (
    <div>
        <div className="actions--bar">
          <div className="bounds">
            {buttons}
          </div>
        </div>
        <ErrorsDisplay errors={errors} />
        <div className="bounds course--detail">
            <div className="grid-66">
            <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{this.state.course.title}</h3>
                <p>By {`${this.props.context.authenticatedUser.name}`}</p>
            </div>
            <div className="course--description">
                <ReactMarkdown source={this.state.course.description} /> 
            </div>
            </div>
            <div className="grid-25 grid-right">
            <div className="course--stats">
                <ul className="course--stats--list">
                <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                        <ReactMarkdown source={this.state.course.materialsNeeded} /> 
                    </ul>
                </li>
                </ul>
            </div>
            </div>
        </div>
    </div>
      );
    }
  }



