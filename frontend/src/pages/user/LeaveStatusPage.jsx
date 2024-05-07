import { useEffect, useState } from "react";
import HomePageLayout from "../../layouts/HomePageLayout";
import { useGetUserLeaveRequestsMutation } from "../../slices/leaveApiSlice";
import Spinner from "../../components/Spinner";

const LeaveStatusPage = () => {
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [getUserLeaveRequests, { isLoading: userRequestsLoading }] =
    useGetUserLeaveRequestsMutation();

  useEffect(() => {
    getUserLeaveRequests()
      .unwrap()
      .then((res) => {
        console.log(res);
        setPendingLeaves(res.filter((item) => item.status === "PENDING"));
        setApprovedLeaves(res.filter((item) => item.status === "APPROVED"));
      });
  }, []);

  return (
    <HomePageLayout>
      <div className="mx-auto w-25">
        <h2>Leave Status</h2>
      </div>
      {userRequestsLoading && <Spinner />}
      <div className="w-75 mx-auto">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Pendind Leaves
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {pendingLeaves.length > 0 ? (
                  <div>
                    {pendingLeaves.map((item, idx) => (
                      <div key={idx} class="card mx-2">
                        <div class="card-body">
                          <h5 class="card-title">
                            Leave{" "}
                            <span className="badge text-bg-primary ms-3 d-inline">
                              {item.status}
                            </span>
                          </h5>
                          <p>
                            {new Date(item.StartDate).toLocaleDateString()} -
                            {new Date(item.EndDate).toLocaleDateString()}
                          </p>
                          <div>
                            <p class="card-text"> Reason: {item.reason}</p>
                          </div>
                          <button className="btn btn-sm btn-outline-danger position-absolute bottom-0 end-0 me-4 mb-2">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No leaves to display</div>
                )}
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Approved Leaves
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {approvedLeaves.length > 0 ? (
                  <div>
                    {approvedLeaves.map((item, idx) => (
                      <div key={idx} class="card mx-2">
                        <div class="card-body">
                          <h5 class="card-title">
                            Leave{" "}
                            <span className="badge text-bg-primary ms-3 d-inline">
                              {item.status}
                            </span>
                          </h5>
                          <p>
                            {new Date(item.StartDate).toLocaleDateString()} -
                            {new Date(item.EndDate).toLocaleDateString()}
                          </p>
                          <div>
                            <p class="card-text"> Reason: {item.reason}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No leaves to display</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomePageLayout>
  );
};

export default LeaveStatusPage;
