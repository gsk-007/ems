import { Link } from "react-router-dom";
import HomePageLayout from "../layouts/HomePageLayout";
import { useSelector } from "react-redux";
import NormalLayout from "../layouts/NormalLayout";
import NotApproved from "../components/NotApproved";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const cardContent = [
    {
      cardTitle: "Attendance",
      cardText: "Manage Attendance",
      url: "/home/attendence",
    },
    {
      cardTitle: "Leave Management",
      cardText: "Check your leaves",
      url: "#",
    },
    {
      cardTitle: "Payroll",
      cardText: "Check your payroll",
      url: "#",
    },
  ];

  return userInfo.isApproved ? (
    <HomePageLayout>
      <div className="mx-2 row">
        {cardContent.map((card, idx) => (
          <div key={idx} className="card m-2 col-4" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{card.cardTitle}</h5>
              <p className="card-text">{card.cardText}</p>
              <Link to={card.url} className="btn btn-primary">
                Go
              </Link>
            </div>
          </div>
        ))}
      </div>
    </HomePageLayout>
  ) : (
    <NormalLayout>
      <NotApproved />
    </NormalLayout>
  );
};

export default HomePage;
