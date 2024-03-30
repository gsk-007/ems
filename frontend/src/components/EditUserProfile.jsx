import React from "react";

const EditUserProfile = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <div>
      <form className="w-50 mx-auto" onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input type="text" className="form-control" placeholder="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Phone Number"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="about" className="form-label">
            About
          </label>
          <input type="text" className="form-control" placeholder="About" />
        </div>
      </form>
    </div>
  );
};

export default EditUserProfile;
