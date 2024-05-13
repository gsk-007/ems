import React, { useEffect, useState } from "react";
import HomePageLayout from "../../layouts/HomePageLayout";
import {
  useGetUserLeaveApprovalRequestsMutation,
  useUpdateLeaveRequestMutation,
  useUpdateUserLeaveApprovalRequestMutation,
} from "../../slices/leaveApiSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import Select from "react-dropdown-select";
import { useSelector } from "react-redux";
import { useGetAllUsersMutation } from "../../slices/userApiSlice";

const LeaveRequestsPage = () => {
  const [leaveApprovals, setLeaveApprovals] = useState([]);
  const [modalData, setModalData] = useState({
    id: "",
    name: "",
    leaveCount: "",
    start: "",
    end: "",
    reason: "",
    documents: [],
  });
  const [options, setOptions] = useState([]);
  const [transferLeaveData, setTransferLeaveData] = useState({
    id: "",
    supervisorId: "",
  });

  // Importing userInfo from state
  const { userInfo } = useSelector((state) => state.auth);

  const [getUserLeaveApproval, { isLoading: userLeaveApprovalLoading }] =
    useGetUserLeaveApprovalRequestsMutation();
  const [updateLeave, { isLoading: updateLeaveRequest }] =
    useUpdateLeaveRequestMutation();
  const [getAllUsers, { isLoading: gettingAllUsersLoading }] =
    useGetAllUsersMutation();
  const [updateUserLeaveApproval, { isLoading: updateLeaveApprovalLoading }] =
    useUpdateUserLeaveApprovalRequestMutation();

  useEffect(() => {
    getUserLeaveApproval()
      .unwrap()
      .then((res) => {
        // console.log(res);
        setLeaveApprovals(res);
      });
  }, []);

  const onApprove = async () => {
    const difference =
      getNumberOfDays(new Date(modalData.start), new Date(modalData.end)) + 1;
    try {
      await updateLeave({
        id: modalData.id,
        status: "APPROVED",
        newLeaveCount: modalData.leaveCount - difference,
      }).unwrap();
      const res = await getUserLeaveApproval().unwrap();
      setLeaveApprovals(res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const onReject = async () => {
    try {
      await updateLeave({
        id: modalData.id,
        status: "REJECTED",
        newLeaveCount: modalData.leaveCount,
      }).unwrap();
      const res = await getUserLeaveApproval().unwrap();
      setLeaveApprovals(res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const getNumberOfDays = (startDate, endDate) => {
    // Convert both dates to milliseconds
    var startMs = startDate.getTime();
    var endMs = endDate.getTime();

    // Calculate the difference in milliseconds
    var differenceMs = endMs - startMs;

    // Convert the difference from milliseconds to days
    var daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return daysDifference;
  };

  const handleViewClick = (idx) => {
    const { leaveRequestId, leaveRequest } = leaveApprovals[idx];
    setModalData({
      id: leaveRequestId,
      name: leaveRequest.user.name,
      start: leaveRequest.StartDate,
      end: leaveRequest.EndDate,
      reason: leaveRequest.reason,
      leaveCount: leaveRequest.leaveType.leaveCount,
      documents: leaveRequest.documents,
    });
  };

  const handleTransferClick = (idx) => {
    getAllUsers()
      .unwrap()
      .then((res) => {
        setOptions(res.filter((item) => item.id !== userInfo.id));
      });
    setTransferLeaveData({ ...transferLeaveData, id: leaveApprovals[idx].id });
  };

  const handleTransferLeaveModalSave = async () => {
    try {
      await updateUserLeaveApproval(transferLeaveData);
      toast.success("Leave Transferred Succesfully!");
      setTransferLeaveData({ id: "", supervisorId: "" });
      const res = await getUserLeaveApproval().unwrap();
      setLeaveApprovals(res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <HomePageLayout>
      <div className="d-flex align-items-center justify-content-center">
        <h2>Leave Requests</h2>
      </div>
      <div className="w-75 mx-auto">
        {userLeaveApprovalLoading && <Spinner />}
        {leaveApprovals.length > 0 ? (
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
                      className="btn btn-sm btn-outline-primary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#approveModal"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleTransferClick(idx)}
                      className="btn btn-sm btn-outline-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#transferLeaveModal"
                    >
                      Transfer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No Requests To Show!</p>
        )}
      </div>
      {/* Leave View Modal */}
      <div
        className="modal fade"
        id="approveModal"
        tabIndex="-1"
        aria-labelledby="approveModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Leave Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <p>Name: {modalData.name}</p>
                <p>
                  Start Date: {new Date(modalData.start).toLocaleDateString()}
                </p>
                <p>End Date: {new Date(modalData.end).toLocaleDateString()}</p>
                <p>Reason:{modalData.reason}</p>
                <div>
                  <p>Docs:</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={onApprove}
              >
                Approve
              </button>
              <button
                onClick={onReject}
                type="button"
                className="btn btn-outline-danger"
                data-bs-dismiss="modal"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Leave Transfer Modal */}
      <div
        className="modal fade"
        id="transferLeaveModal"
        tabIndex="-1"
        aria-labelledby="transferLeaveModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Transfer Leave
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ height: "200px" }}>
              <div className="mb-3">
                <label htmlFor="selectLeaveType" className="form-label">
                  Applying To
                </label>
                <div>
                  <Select
                    options={options}
                    labelField="name"
                    valueField="id"
                    searchable
                    dropdownPosition="auto"
                    dropdownHeight="100px"
                    loading={gettingAllUsersLoading}
                    searchBy="name"
                    placeholder="Search Name"
                    closeOnSelect
                    onChange={(values) => {
                      setTransferLeaveData({
                        ...transferLeaveData,
                        supervisorId: values[0].id,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleTransferLeaveModalSave}
                data-bs-dismiss="modal"
                className="btn btn-outline-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </HomePageLayout>
  );
};

export default LeaveRequestsPage;
