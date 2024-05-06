import { useEffect, useState } from "react";
import HomePageLayout from "../../layouts/HomePageLayout";
import { useGetUserLeavesMutation } from "../../slices/leaveApiSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const LeaveBalancePage = () => {
  const [userLeaves, setUserLeaves] = useState([]);
  const [getUserLeaves, { isLoading }] = useGetUserLeavesMutation();

  useEffect(() => {
    getUserLeaves()
      .unwrap()
      .then((res) => {
        setUserLeaves(res);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Unable to Fetch Data!");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomePageLayout>
      <div className="d-flex align-items-center justify-content-center">
        <h2>Leave balances</h2>
      </div>
      {isLoading && <Spinner />}
      <div className="row mx-2">
        {userLeaves &&
          userLeaves.map((item, idx) => (
            <div
              key={idx}
              className="card m-2 col-3"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">{item.leaveType.type}</h5>
                <p className="card-text">
                  Count:{" "}
                  <span className="fs-5 fw-medium">{item.leaveCount}</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </HomePageLayout>
  );
};

export default LeaveBalancePage;
