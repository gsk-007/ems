import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePageLayout from "../../layouts/HomePageLayout";
import NotApproved from "../../components/NotApproved";
import NormalLayout from "../../layouts/NormalLayout";
import SignInComponent from "../../components/SignInComponent";

const UserHomePage = () => {
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
      <div>
        <SignInComponent />
      </div>
    </HomePageLayout>
  ) : (
    <NormalLayout>
      <NotApproved />
    </NormalLayout>
  );
};

export default UserHomePage;
