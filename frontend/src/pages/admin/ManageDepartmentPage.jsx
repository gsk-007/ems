import { useEffect, useState } from "react";
import HomePageLayout from "../../layouts/HomePageLayout";
import {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDepartmentsMutation,
  useUpdateDepartmentMutation,
} from "../../slices/departmentApiSlice";
import { FaPenToSquare, FaPlus, FaTrash } from "react-icons/fa6";
import Spinner from "../../components/Spinner";
import { useGetAllUsersMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";

const ManageDepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [modal, setModal] = useState({
    title: "",
    onSave: () => { },
  });
  const [department, setDepartment] = useState({
    name: "",
    type: "",
    superviserId: undefined,
  });
  const [users, setUsers] = useState([]);

  const [getDepartments, { isLoading: getDepartmentLoading }] =
    useGetDepartmentsMutation();
  const [deleteDepartment, { isLoading: deleteDepartmentLoading }] =
    useDeleteDepartmentMutation();
  const [createDepartment, { isLoading: createDepartmentLoading }] =
    useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: updateDepartmentLoading }] = useUpdateDepartmentMutation()
  const [getAllUsers, { isLoading: getAllUsersLoading }] =
    useGetAllUsersMutation();

  useEffect(() => {
    getDepartments()
      .unwrap()
      .then((res) => {
        setDepartments(res);
      });
  }, []);

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const onAddDepartmentClick = () => {
    setModal({
      title: "Add Department",
      onSave: async (item) => {
        try {
          await createDepartment(item).unwrap();
          toast.success("New Department Created");
          getDepartments()
            .unwrap()
            .then((res) => {
              setDepartments(res);
            });
          setDepartment({ name: "", type: "", superviserId: 0 });
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      },
    });
    getAllUsers()
      .unwrap()
      .then((res) => {
        setUsers(res);
      });
  };

  const handleEdit = async (id) => {
    const [editDepartment] = departments.filter(item => item.id === id)
    setDepartment({ ...editDepartment, superviserId: editDepartment.superviserId || 0 })
    setModal({
      title: "Edit Department",
      onSave: async (item) => {
        try {
          await updateDepartment({ id, data: { name: item.name, type: item.type, superviserId: item.superviserId === 0 ? null : item.superviserId } }).unwrap()
          toast.success("Department Updated Succesfully");
          getDepartments()
            .unwrap()
            .then((res) => {
              setDepartments(res);
            });
          setDepartment({ name: "", type: "", superviserId: 0 });
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    })
    getAllUsers()
      .unwrap()
      .then((res) => {
        setUsers(res);
      });
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartment({ id }).unwrap();
      toast.success("Department Deleted");
      getDepartments()
        .unwrap()
        .then((res) => {
          setDepartments(res);
        });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <HomePageLayout>
      <div className="w-50 mx-auto">
        <h2>Manage Department</h2>
      </div>
      {getDepartmentLoading && <Spinner />}
      <div className="w-75 h-75 overflow-y-scroll mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>
                  <div
                    onClick={() => handleEdit(item.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#departmentModal"
                    className="bg-success-subtle p-1 rounded btn"
                  >
                    <FaPenToSquare />
                  </div>
                </td>
                <td>
                  <div
                    onClick={() => handleDelete(item.id)}
                    className="bg-danger-subtle p-1 rounded btn"
                  >
                    <FaTrash />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-25 mx-auto mt-4">
        <button
          className="btn btn-success btn-sm ms-2"
          data-bs-toggle="modal"
          onClick={onAddDepartmentClick}
          data-bs-target="#departmentModal"
        >
          <FaPlus /> Add Department
        </button>
      </div>
      {/* Add Department Modal */}
      <div
        className="modal fade"
        id="departmentModal"
        tabIndex="-1"
        aria-labelledby="departmentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="departmentModalLabel">
                {modal.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Department Name
                </label>
                <input
                  name="name"
                  value={department.name || ""}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  placeholder="About"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Department Type
                </label>
                <select
                  className="form-select"
                  name="type"
                  value={department.type}
                  onChange={handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="TEACHING">Teaching</option>
                  <option value="NONTEACHING">Non Teaching</option>
                </select>
              </div>
              <div className="mb-5">
                <label htmlFor="superviserId" className="form-label">
                  Superviser
                </label>
                <select
                  className="form-select"
                  name="superviserId"
                  value={department.superviserId}
                  onChange={handleChange}
                >
                  {users.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => modal.onSave(department)}
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

export default ManageDepartmentPage;
