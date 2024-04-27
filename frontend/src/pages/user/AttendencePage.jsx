import { useEffect, useState } from "react";
import HomePageLayout from "../../layouts/HomePageLayout";
import { useGetAttendanceMutation } from "../../slices/attendanceApiSlice";
import CalendarMonth from "../../components/CalendarMonth";
import { getDate } from "date-fns";
import Spinner from "../../components/Spinner";

const AttendencePage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const months = [];

  const [getAttendance, { isLoading }] = useGetAttendanceMutation();

  useEffect(() => {
    getAttendance({ month, year })
      .unwrap()
      .then((res) => {
        const temp = new Array(new Date(year, month, 0).getDate()).fill("");
        res.forEach((item) => {
          const idx = getDate(new Date(item.date));
          temp[idx] = item.status.substring(0, 1);
        });
        setAttendanceData(temp);
      });
  }, [month, year]);

  const nextMonth = () => {
    if (month == 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const previousMonth = () => {
    if (month == 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <HomePageLayout>
      <div className=" mx-auto w-75 d-flex align-item-center justify-content-between">
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={previousMonth}
        >
          Previous
        </button>
        <button type="button" className="btn btn-primary" onClick={nextMonth}>
          Next
        </button>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <CalendarMonth month={month} year={year} data={attendanceData} />
      )}
    </HomePageLayout>
  );
};

export default AttendencePage;
