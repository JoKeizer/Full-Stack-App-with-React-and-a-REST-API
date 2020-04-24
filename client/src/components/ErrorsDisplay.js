import React from 'react';

/**
 * Renders the HTML for errors
 * @param {props} Errors - validation errors 
 */
function ErrorsDisplay(props) {
    let errorsDisplay = null;
    const errors = props.errors;

    if (errors.length) {
        errorsDisplay = (
        <div>
            <h2 className="validation--errors--label">Oh Oh! There was an Error</h2>
            <div className="validation-errors">
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
            </div>
        </div>
        );
    }
    return errorsDisplay;
}

export default ErrorsDisplay;