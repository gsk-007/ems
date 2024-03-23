import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const HomePageLayout = ({ children }) => {
  return (
    <>
      <div style={{ height: "80px" }}>
        <Header />
      </div>
      <div style={{ height: `calc(100vh - 80px)` }} className="d-flex">
        <aside
          className="h-100% border-end border-black"
          style={{ width: "300px" }}
        >
          <SideBar />
        </aside>
        <div className="mt-2">{children}</div>
      </div>
    </>
  );
};

export default HomePageLayout;
