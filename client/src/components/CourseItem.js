import React from 'react';
import {NavLink} from 'react-router-dom';

//props course from Courses.js
const CourseItem = ({course}) => {
    return(
        <div className="grid-33">
            <NavLink className="course--module course--link" to={`/courses/${course._id}`}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
            </NavLink>
        </div>
    );
}

export default CourseItem;