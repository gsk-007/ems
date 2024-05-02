import { useEffect, useState } from "react";
import { useGetAllUsersMutation, useUpdateUserMutation } from "../../slices/userApiSlice";
import HomePageLayout from "../../layouts/HomePageLayout";
import { useSelector } from "react-redux";

const ManageUsersPage = () => {
  const [data, setData] = useState([]);
  const [adminUserId, setAdminUserId] = useState("")
  const [getAllUsers, { isLoading }] = useGetAllUsersMutation();
  const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation()

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllUsers()
      .unwrap()
      .then((data) => {
        setData(data);
      });
  }, [getAllUsers]);

  const handleSave = () => {

    setAdminUserId("")
  }

  return (
    <HomePageLayout>
      <div className="w-25 mx-auto">
        <h2>Manage Users</h2>
      </div>
      <div className="w-50 mx-auto" >
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>
                  <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#confirmModal" onClick={() => setAdminUserId(item.id)}> Make Admin </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Do you want to make the user as admin?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSave}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </HomePageLayout>
  );
};

export default ManageUsersPage;
