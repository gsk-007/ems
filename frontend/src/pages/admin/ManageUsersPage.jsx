import { useEffect, useState } from "react";
import { useGetAllUsersMutation } from "../../slices/userApiSlice";
import HomePageLayout from "../../layouts/HomePageLayout";

const ManageUsersPage = () => {
  const [data, setData] = useState([]);
  const [getAllUsers, { isLoading }] = useGetAllUsersMutation();

  useEffect(() => {
    getAllUsers()
      .unwrap()
      .then((data) => {
        setData(data);
      });
  }, [getAllUsers]);

  return (
    <HomePageLayout>
      <div className="w-25 mx-auto">
        <h2>Manage Users</h2>
      </div>
    </HomePageLayout>
  );
};

export default ManageUsersPage;
