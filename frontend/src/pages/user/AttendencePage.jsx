import TimeComponent from "../../components/TimeComponent";
import HomePageLayout from "../../layouts/HomePageLayout";

const AttendencePage = () => {
  return (
    <HomePageLayout>
      <div className="mx-2">
        <TimeComponent />
      </div>
    </HomePageLayout>
  );
};

export default AttendencePage;
