import React, { useEffect, useState } from "react";
import HomePageLayout from "../../layouts/HomePageLayout";
import {
  useGetAllUsersMutation,
  useUpdateUserByIdMutation,
} from "../../slices/userApiSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const NewUserScreen = () => {
  const [data, setData] = useState([]);
  const [getAllUsers, { isLoading }] = useGetAllUsersMutation();
  const [updateUser, { isLoading: isProfileUpdateLoading }] =
    useUpdateUserByIdMutation();

  useEffect(() => {
    getAllUsers()
      .unwrap()
      .then((data) => {
        setData(data);
      });
  }, [getAllUsers]);

  const handleApprove = async (id) => {
    try {
      const res = await updateUser({ id, isApproved: true }).unwrap();
      toast.success("User Approved");
      getAllUsers()
        .unwrap()
        .then((data) => {
          setData(data);
        });
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleReject = () => {};

  return (
    <HomePageLayout>
      {isLoading || isProfileUpdateLoading ? (
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
                  <td colSpan="2">
                    <button
                      onClick={() => handleApprove(item.id)}
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
