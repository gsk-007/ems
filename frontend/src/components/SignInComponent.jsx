import { useEffect, useState } from "react";
import { useCreateAttendanceMutation } from "../slices/attendanceApiSlice";
import { useSelector } from "react-redux";
import { getDay } from "date-fns";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const SignInComponent = () => {
  const [signIn, setSignIn] = useState(true);
  const [createAttendance, { isLoading }] = useCreateAttendanceMutation();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (getDay(new Date()) === 0 || getDay(new Date()) === 6) {
      set(true);
    }
  }, []);
  const handleSignInClick = async () => {
    try {
      const d = new Date().setUTCHours(0, 0, 0, 0);
      await createAttendance({
        id: userInfo.id,
        status: "PRESENT",
        date: new Date(d).toISOString(),
        time_in: new Date(d).toTimeString(),
      });
      setSignIn(true);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleSignOutClick = async () => {};
  return (
    <div>
      <div className="card m-2 col-4 border-primary" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Attendance</h5>
          {isLoading && <Spinner />}
          {signIn ? (
            <button className="btn btn-primary" onClick={handleSignInClick}>
              Sign In
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSignOutClick}>
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
