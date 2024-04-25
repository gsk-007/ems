import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = () => {
  const [sideBarOptions, setSideBarOptions] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const adminSideBarOptions = [
    {
      title: "User",
      tabs: [{ title: "View New User Requests", url: "/admin/new-user" }],
    },
  ];
  const userSideBarOptions = [
    {
      title: "Leave",
      tabs: [
        { title: "Leave Apply", url: "/user/leave/apply" },
        { title: "Leave status", url: "/user/leave/status" },
        { title: "Leave Balance", url: "#" },
        { title: "Holiday Calendar", url: "#" },
      ],
    },
    {
      title: "Attendance",
      tabs: [{ title: "Attendance Info", url: "/user/attendance" }],
    },
  ];

  useEffect(() => {
    setSideBarOptions(
      userInfo.role === "ADMIN" ? adminSideBarOptions : userSideBarOptions
    );
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
