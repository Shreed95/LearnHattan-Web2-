import { Outlet } from "react-router-dom";

const TutorLayout = () => {
  return (
    <div className="">
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default TutorLayout;