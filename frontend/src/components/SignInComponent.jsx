import { useEffect, useState } from "react";
import {
  useCreateAttendanceMutation,
  useGetTodayAttendanceMutation,
  useUpdateAttendanceMutation,
} from "../slices/attendanceApiSlice";
import { useSelector } from "react-redux";
import { getDay } from "date-fns";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const SignInComponent = () => {
  const [signIn, setSignIn] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [createAttendance, { isLoading: createAttendanceLoadign }] =
    useCreateAttendanceMutation();
  const [updateAttendance, { isLoading: updateAttendanceLoading }] =
    useUpdateAttendanceMutation();
  const [getTodayAttendance, { isLoading: todayAttendance }] =
    useGetTodayAttendanceMutation();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (getDay(new Date()) === 0 || getDay(new Date()) === 6) {
      setDisabled(true);
    }
    getTodayAttendance()
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSignInClick = async () => {
    try {
      const d = new Date().setUTCHours(0, 0, 0, 0);
      await createAttendance({
        id: userInfo.id,
        status: "PRESENT",
        date: new Date(d).toISOString(),
        time_in: new Date(),
      });
      setSignIn(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleSignOutClick = async () => {
    try {
      const d = new Date().setUTCHours(0, 0, 0, 0);
      await updateAttendance({
        id: userInfo.id,
        date: new Date(d).toISOString(),
        time_out: new Date(),
      });
      setSignIn(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div>
      <div className="card m-2 col-4 border-primary" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Attendance</h5>
          {signIn ? (
            <button className="btn btn-primary" onClick={handleSignInClick}>
              Sign In
            </button>
          ) : (
            <p>Attendance Recorded</p>
            // <button className="btn btn-primary" onClick={handleSignOutClick}>
            //   Sign Out
            // </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
