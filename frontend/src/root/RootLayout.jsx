// import Sidebar from "../components/Sidebar";
// import TopNavBar from "../components/TopNavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="">
      {/* <TopNavBar /> */}
      {/* <Sidebar /> */}
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default RootLayout;
