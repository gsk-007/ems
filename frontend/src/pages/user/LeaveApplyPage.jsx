import { useState } from "react";
import HomePageLayout from "../../layouts/HomePageLayout";
import DatePicker from "react-date-picker";

const LeaveApplyPage = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fromDate.toISOString().substring(0, 10));
    console.log(toDate.toISOString().substring(0, 10));
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
            <select
              className="form-select w-25"
              aria-label="Default select example"
            >
              <option selected>Select Type</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="=" className="form-label">
                From Date
              </label>
              <div>
                <DatePicker onChange={setFromDate} value={fromDate} />
              </div>
            </div>
            <div className="col-lg-4">
              <label htmlFor="=" className="form-label">
                To Date
              </label>
              <div>
                <DatePicker onChange={setToDate} value={toDate} />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="selectLeaveType" className="form-label">
              Applying To
            </label>
            <select
              className="form-select w-25"
              aria-label="Default select example"
            >
              <option selected>Select Type</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="selectLeaveType" className="form-label">
              Reason
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Attach FIle
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
          <div className="w-25 mx-auto">
            <button type="submit" className="btn btn-primary me-2">
              Submit
            </button>
            <button type="button" className="btn btn-outline-primary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </HomePageLayout>
  );
};

export default LeaveApplyPage;
