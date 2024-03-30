import React from "react";

const EditUserProfile = ({ user }) => {
  console.log(user);
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
          <textarea type="text" className="form-control" placeholder="About" />
        </div>
        <div className="mb-3">
          <label htmlFor="qulaification" className="form-label">
            Qualifications
          </label>
          <div className="d-flex ">
            {user.qualifications.map((item, idx) => (
              <div key={idx} className="card mx-1">
                <div className="card-body">
                  {item.degree} ({item.graduation_year})
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUserProfile;
