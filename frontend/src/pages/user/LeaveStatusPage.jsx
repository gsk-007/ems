import { useEffect, useState } from "react";
import HomePageLayout from "../../layouts/HomePageLayout";
import { useGetUserLeaveRequestsMutation } from "../../slices/leaveApiSlice";
import Spinner from "../../components/Spinner";

const LeaveStatusPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [getUserLeaveRequests, { isLoading: userRequestsLoading }] =
    useGetUserLeaveRequestsMutation();

  useEffect(() => {
    getUserLeaveRequests()
      .unwrap()
      .then((res) => {
        // console.log(res);
        setLeaves(res);
      });
  }, []);

  return (
    <HomePageLayout>
      <div className="mx-auto w-25">
        <h2>Leave Status</h2>
      </div>
      {userRequestsLoading && <Spinner />}
      <div className="w-75 mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Status</th>
              <th scope="col">Approved By</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.StartDate.substring(0, 10)}</td>
                <td>{item.EndDate.substring(0, 10)}</td>
                <td>
                  {item.status === "PENDING" ? (
                    <span className="badge text-bg-primary">{item.status}</span>
                  ) : item.status === "APPROVED" ? (
                    <span className="badge text-bg-success">{item.status}</span>
                  ) : (
                    <span className="badge text-bg-danger">{item.status}</span>
                  )}
                </td>
                <td>{item.approval.supervisor.name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    disabled={item.status !== "PENDING"}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </HomePageLayout>
  );
};

export default LeaveStatusPage;
