import { useSelector } from "react-redux";
import HomePageLayout from "../../layouts/HomePageLayout";
import NotApproved from "../../components/NotApproved";
import NormalLayout from "../../layouts/NormalLayout";
import SignInComponent from "../../components/SignInComponent";

const UserHomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo.isApproved ? (
    <HomePageLayout>
      <div className="mx-2 my-4">
        <h2>Good Morning!</h2>
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
