import NormalLayout from "../layouts/NormalLayout";

const EditPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <NormalLayout>
      <div className="w-50 mx-auto">
        <h2>Change your password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="password"
              minLength={8}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </NormalLayout>
  );
};

export default EditPassword;
