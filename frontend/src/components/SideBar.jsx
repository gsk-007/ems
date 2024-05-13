import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const [sideBarOptions, setSideBarOptions] = useState([]);

  const location = useLocation();
  const adminSideBarOptions = [
    {
      title: "User Management",
      tabs: [
        { title: "View New User Requests", url: "/admin/new-user" },
        { title: "Manage User Profile", url: "/admin/manage-user" },
      ],
    },
    {
      title: "Department Management",
      tabs: [{ title: "Manage Department", url: "/admin/department" }],
    },
    {
      title: "Leave Management",
      tabs: [{ title: "Holiday Management", url: "/admin/leave/holiday" }],
    },
  ];
  const userLeaveTabs = [
    { title: "Leave Apply", url: "/user/leave/apply" },
    { title: "Leave status", url: "/user/leave/status" },
    { title: "Leave Balance", url: "/user/leave/balance" },
    { title: "Holiday Calendar", url: "#" },
  ];
  const userLeaveApprovalTabs = [
    ...userLeaveTabs,
    { title: "Leave Requests", url: "/user/leave/requests" },
  ];

  const userSideBarOptions = [
    {
      title: "Leave",
      tabs: userLeaveApprovalTabs,
    },
    {
      title: "Attendance",
      tabs: [{ title: "Attendance Info", url: "/user/attendance" }],
    },
  ];

  useEffect(() => {
    if (location.pathname.includes("admin")) {
      setSideBarOptions(adminSideBarOptions);
    } else {
      setSideBarOptions(userSideBarOptions);
    }
  }, []);

  return (
    <div className="h-100">
      <div className="h-25 border border-primary">Top Section</div>

      <div className="accordion" id="accordionExample">
        {sideBarOptions.map((item, idx) => (
          <div key={idx} className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${idx}`}
                aria-expanded="false"
                aria-controls={`collapse${idx}`}
              >
                {item.title}
              </button>
            </h2>
            <div
              id={`collapse${idx}`}
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <ul className="list-group  list-group-flush">
                  {item.tabs.map((tab, idx) => (
                    <li
                      className="list-group-item list-group-item-action "
                      key={idx}
                    >
                      <Link
                        className="text-decoration-none text-dark"
                        to={tab.url}
                      >
                        {tab.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
