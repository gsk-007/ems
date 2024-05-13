import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/userApiSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { isStrongPassword } from "../constants/auth";

const AdminRegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/user/home");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isStrongPassword.test(password)) {
      toast.info(
        "Password must be at least 8 characters long and contain at least one special character and numbers."
      );
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        await register({
          name,
          email,
          password,
          role: "ADMIN",
        }).unwrap();
        toast.success("Registered Successfully!");
        toast.info("Please Login To Continue!");
        navigate(`/login`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <section className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-5">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                  Sign Up As Admin
                </h2>
                <form onSubmit={submitHandler}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Name"
                          required
                        />
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          required
                        />
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          name="confirmpassword"
                          id="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm Password"
                          required
                        />
                        <label htmlFor="confirmpassword" className="form-label">
                          Confirm Password
                        </label>
                      </div>
                    </div>
                    {isLoading && <Spinner />}
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div>
                  <div>
                    Already Have An Account? <Link to="/login">Sign In</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminRegistrationPage;
