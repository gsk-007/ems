import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HomePageLayout from "../../layouts/HomePageLayout";
import { useGetUserLeaveApprovalRequestsMutation } from "../../slices/leaveApiSlice";
import Spinner from "../../components/Spinner";

const LeaveRequestsPage = () => {
  const [leaveApprovals, setLeaveApprovals] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  const [getUserLeaveApproval, { isLoading: userLeaveApprovalLoading }] =
    useGetUserLeaveApprovalRequestsMutation();

  useEffect(() => {
    getUserLeaveApproval()
      .unwrap()
      .then((res) => {
        console.log(res);
        setLeaveApprovals(res);
      });
  }, []);

  const handleViewClick = (idx) => {
    console.log(idx);
  };

  return (
    <HomePageLayout>
      <div className="d-flex align-items-center justify-content-center">
        <h2>Leave Requests</h2>
      </div>
      <div className="w-75 mx-auto">
        {userLeaveApprovalLoading && <Spinner />}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Idx</th>
              <th scope="col">Name</th>
              <th scope="col">Leave Type</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveApprovals.map((item, idx) => (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{item.leaveRequest.user.name}</td>
                <td>{item.leaveRequest.leaveType.leaveType.type}</td>
                <td>{item.leaveRequest.status}</td>
                <td>
                  <button
                    onClick={() => handleViewClick(idx)}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View
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

export default LeaveRequestsPage;
