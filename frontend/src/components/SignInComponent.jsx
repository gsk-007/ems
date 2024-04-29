import React, { useEffect, useState } from "react";
import { useCreateAttendanceMutation } from "../slices/attendanceApiSlice";
import { useSelector } from "react-redux";
import { getDay } from "date-fns";
import Spinner from "./Spinner";

const SignInComponent = () => {
  const [disabled, setDisabled] = useState(false);
  const [createAttendance, { isLoading }] = useCreateAttendanceMutation();

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (getDay(new Date()) === 0 || getDay(new Date()) === 6) {
      setDisabled(true);
    }
  }, []);
  const handleClick = async () => {
    if (disabled === true) {
      // TODO: ADD login
    } else {
      const d = new Date().setUTCHours(0, 0, 0, 0);
      await createAttendance({
        id: userInfo.id,
        status: "PRESENT",
        date: new Date(d).toISOString(),
      });
      setDisabled(true);
    }
  };
  return (
    <div>
      <div className="card m-2 col-4 border-primary" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Attendance</h5>
          {isLoading && <Spinner />}
          <button
            className="btn btn-primary"
            onClick={handleClick}
            disabled={disabled}
          >
            {" "}
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;