import { useState } from "react";
import HomePageLayout from "../layouts/HomePageLayout";

const CreateUserPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Submit");
    console.log(email, password, role);
    // TODO: ADD Backend Logic
  };

  return (
    <HomePageLayout>
      <form className="w-50 mt-5 mx-auto" onSubmit={formSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
          />
          <div id="passwordHelpBlock" className="form-text">
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="Role">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div className="w-25 mx-auto">
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </div>
      </form>
    </HomePageLayout>
  );
};

export default CreateUserPage;
