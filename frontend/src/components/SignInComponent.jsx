import { useEffect, useState } from "react";
import {
  useCreateAttendanceMutation,
  useUpdateAttendanceMutation,
} from "../slices/attendanceApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { getDay } from "date-fns";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { removeAttendance, setAttendance } from "../slices/attendanceSlice";

const SignInComponent = () => {
  const [attendanceState, setAttendanceState] = useState({
    id: "",
    signIn: false,
  });
  const [disabled, setDisabled] = useState(false);
  const [createAttendance, { isLoading: createAttendanceLoading }] =
    useCreateAttendanceMutation();
  const [updateAttendance, { isLoading: updateAttendanceLoading }] =
    useUpdateAttendanceMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { attendance } = useSelector((state) => state.attendance);
  const dispatch = useDispatch();
  console.log(attendance);
  useEffect(() => {
    if (getDay(new Date()) === 0 || getDay(new Date()) === 6) {
      setDisabled(true);
    }
    if (attendance && attendance.id) {
      setAttendanceState({ id: attendance.id, signIn: true });
    }
  }, []);
  const handleSignInClick = async () => {
    try {
      const d = new Date().setUTCHours(0, 0, 0, 0);
      const data = await createAttendance({
        id: userInfo.id,
        status: "PRESENT",
        date: new Date(d).toISOString(),
        time_in: new Date(),
      }).unwrap();

      setAttendanceState({ id: data.id, signIn: true });
      dispatch(setAttendance({ id: data.id }));
      toast.success("Attendance Recorded");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleSignOutClick = async () => {
    if (!attendanceState.id) {
      toast.error("Sorry! Can not be updated");
      return;
    }
    try {
      await updateAttendance({
        id: attendanceState.id,
        time_out: new Date(),
      }).unwrap();

      setAttendanceState({ id: "", signIn: true, signOut: true });
      dispatch(removeAttendance());
      toast.success("Attendance Recorded");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div>
      <div className="card m-2 col-4 border-primary" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Attendance</h5>
          {createAttendanceLoading && <Spinner />}
          {updateAttendanceLoading && <Spinner />}
          {!attendanceState.signIn ? (
            <button
              className="btn btn-primary"
              disabled={disabled}
              onClick={handleSignInClick}
            >
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
