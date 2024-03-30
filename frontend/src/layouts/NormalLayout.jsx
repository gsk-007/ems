import Header from "../components/Header";

const NormalLayout = ({ children }) => {
  return (
    <>
      <div style={{ height: "70px" }}>
        <Header />
      </div>
      <div style={{ height: `calc(100vh - 70px)` }} className="d-flex">
        <div className="mt-2 w-100">{children}</div>
      </div>
    </>
  );
};

export default NormalLayout;
