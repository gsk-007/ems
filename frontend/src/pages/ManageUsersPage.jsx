import { useEffect, useState } from "react";
import NormalLayout from "../layouts/NormalLayout";
import { useGetAllUsersMutation } from "../slices/userApiSlice";
import DataTable from "react-data-table-component";

const ManageUsersPage = () => {
  const [data, setData] = useState([]);
  const [getAllUsers, { isLoading }] = useGetAllUsersMutation();

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
  ];
  useEffect(() => {
    getAllUsers()
      .unwrap()
      .then((data) => {
        setData(data);
      });
  }, [getAllUsers]);

  return (
    <NormalLayout>
      <div className="w-50 mx-auto">
        <h2>Manage Users</h2>
        <DataTable data={data} columns={columns} />
      </div>
    </NormalLayout>
  );
};

export default ManageUsersPage;
