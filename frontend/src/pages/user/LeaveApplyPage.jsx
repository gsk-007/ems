import React, { useState } from "react";
import HomePageLayout from "../../layouts/HomePageLayout";

import { addDays } from "date-fns";

const LeaveApplyPage = () => {
  const handleSubmit = (e) => {};

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
        </form>
      </div>
    </HomePageLayout>
  );
};

export default LeaveApplyPage;
