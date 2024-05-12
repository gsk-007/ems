import { useEffect, useState, useRef } from "react";
import HomePageLayout from "../../layouts/HomePageLayout";
import DatePicker from "react-date-picker";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateUserLeavesMutation,
  useGetUserLeavesMutation,
} from "../../slices/leaveApiSlice";
import { useUploadFileMutation } from "../../slices/fileUploadApiSlice";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersMutation } from "../../slices/userApiSlice";
import Select from "react-dropdown-select";

const LeaveApplyPage = () => {
  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const [userLeaves, setUserLeaves] = useState([]);
  const [leaveCount, setLeaveCount] = useState(0);
  const [formData, setFormData] = useState({
    leaveTypeId: "",
    reason: "",
    documents: [],
  });
  const [image, setImage] = useState("");
  const [options, setOptions] = useState([]);
  const [applyingTo, setApplyingTo] = useState();

  const navigate = useNavigate();

  const ref = useRef();
  const reset = () => {
    ref.current.value = "";
  };

  const { userInfo } = useSelector((state) => state.auth);

  const [getUserLeaves, { isLoading: gettingUserLeavesLoading }] =
    useGetUserLeavesMutation();
  const [uploadFile, { isLoading: fileUploadLoading }] =
    useUploadFileMutation();
  const [createLeave, { isLoading: creatingLeaveLoading }] =
    useCreateUserLeavesMutation();
  const [getAllUsers, { isLoading: gettingAllUsersLoading }] =
    useGetAllUsersMutation();

  useEffect(() => {
    getUserLeaves()
      .unwrap()
      .then((res) => {
        // console.log(res);
        setUserLeaves(res);
      });
    getAllUsers()
      .unwrap()
      .then((res) => {
        setOptions(res.filter((item) => item.id !== userInfo.id));
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name == "leaveTypeId") {
      const data = userLeaves.find((item) => item.id == e.target.value);
      setLeaveCount(data.leaveCount);
    }
  };

  const uploadFileHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const data = await uploadFile(formData).unwrap();
      setImage("");
      setFormData({ ...formData, documents: [data] });
      toast.success("file Uploaded Successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSubmit = async (e) => {
    // TODO: HANDLE VALIDATION
    e.preventDefault();
    try {
      const data = {
        ...formData,
        StartDate,
        EndDate,
        leaveTypeId: Number(formData.leaveTypeId),
        supervisorId: applyingTo,
      };
      await createLeave(data);
      toast.success("Leave Applied Successfully");
      navigate("/user/leave/status");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <HomePageLayout>
      <div className="w-75 mx-auto border border-primary">
        <div className="text-center">
          <h2>Applying For Leave</h2>
        </div>
        <form className="mx-4 my-4 " onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="selectLeaveType" className="form-label">
              Leave Type
            </label>
            <div className="d-flex">
              {gettingUserLeavesLoading && <Spinner />}
              <select
                className="form-select w-50 me-2"
                aria-label="Default select example"
                value={formData.leaveTypeId}
                onChange={handleChange}
                name="leaveTypeId"
                required
              >
                <option value="">Leave</option>
                {userLeaves.map((item, idx) => (
                  <option key={idx} value={item.id}>
                    {item.leaveType.type}
                  </option>
                ))}
              </select>
              <p className="mt-2">Balance: {leaveCount}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="=" className="form-label">
                Start Date
              </label>
              <div>
                <DatePicker onChange={setStartDate} value={StartDate} />
              </div>
            </div>
            <div className="col-lg-4">
              <label htmlFor="=" className="form-label">
                End Date
              </label>
              <div>
                <DatePicker onChange={setEndDate} value={EndDate} />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="selectLeaveType" className="form-label">
              Applying To
            </label>
            {gettingAllUsersLoading && <Spinner />}
            <div>
              <Select
                options={options}
                labelField="name"
                valueField="id"
                searchable
                searchBy="name"
                closeOnSelect
                onChange={(values) => {
                  setApplyingTo(values[0].id);
                }}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="selectLeaveType" className="form-label">
              Reason
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4 ">
            <label htmlFor="formFile" className="form-label">
              Attach File
            </label>
            <div className="d-flex">
              <input
                ref={ref}
                className="form-control w-50 me-3"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                type="file"
                id="formFile"
              />
              <button
                onClick={uploadFileHandler}
                className=" btn btn-sm btn-outline-primary me-3"
              >
                Upload File
              </button>
              <button
                onClick={() => reset()}
                className=" btn btn-sm btn-outline-danger"
              >
                Reset
              </button>
              {fileUploadLoading && <Spinner />}
            </div>
          </div>
          {creatingLeaveLoading && <Spinner />}
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn btn-success me-2">
              Submit
            </button>
            <button type="button" className="btn btn-outline-danger">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </HomePageLayout>
  );
};

export default LeaveApplyPage;
