
import React from "react";

// AuthenticatedUser is used to display the SignedIn User's Information
export default ({ context }) => {
  const authUser = context.authenticatedUser;
  return (
    <div className="bounds">
      <div className="grid-100">
        <h1>
          {authUser.name}is authenticated!
        </h1>
        <p>Your Email is {authUser.email}.</p>
      </div>
    </div>
  );
};
