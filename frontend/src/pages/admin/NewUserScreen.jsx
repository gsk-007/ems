import React, { useEffect, useState } from "react";
import HomePageLayout from "../../layouts/HomePageLayout";
import { useGetAllUsersMutation } from "../../slices/userApiSlice";
import Spinner from "../../components/Spinner";

const NewUserScreen = () => {
  const [data, setData] = useState([]);
  const [getAllUsers, { isLoading }] = useGetAllUsersMutation();

  useEffect(() => {
    getAllUsers()
      .unwrap()
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, [getAllUsers]);

  const handleApprove = () => {};

  const handleReject = () => {};

  return (
    <HomePageLayout>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-100">
          <div className="text-center">
            <h1>New User Requests</h1>
          </div>
          <table className=" w-50 mx-auto mt-5 table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action Button</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td colspan="2">
                    <button
                      onClick={handleApprove}
                      className="btn btn-sm btn-success me-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={handleReject}
                      className="btn btn-sm btn-danger"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </HomePageLayout>
  );
};

export default NewUserScreen;
