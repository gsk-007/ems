import Header from "../components/Header";
import SideBar from "../components/SideBar";

const HomePageLayout = ({ children }) => {
  const asideWidth = 300;
  return (
    <>
      <div style={{ height: "70px" }}>
        <Header />
      </div>
      <div style={{ height: `calc(100vh - 70px)` }} className="d-flex">
        <aside
          className="h-100% border-end border-black"
          style={{ width: `${asideWidth}px` }}
        >
          <SideBar />
        </aside>
        <div style={{ width: `calc(100% - ${asideWidth}px)` }} className="mt-2">
          {children}
        </div>
      </div>
    </>
  );
};

export default HomePageLayout;
