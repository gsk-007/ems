import { Link } from "react-router-dom";

const SideBar = () => {
  const sideBarOptions = [
    {
      title: "User",
      tabs: [
        { title: "Create User", url: "/home/create-user" },
        { title: "Manage Users", url: "/home/manage-user" },
      ],
    },
  ];
  return (
    <div className="h-100">
      <div className="h-25 border border-primary">Top Section</div>

      <div className="accordion accordion-flush" id="accordionFlushExample">
        {sideBarOptions.map((item, idx) => (
          <div key={idx} className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                {item.title}
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
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
