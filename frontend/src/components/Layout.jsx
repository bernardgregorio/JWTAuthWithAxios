import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="font-roboto">
      <Outlet />
    </main>
  );
};

export default Layout;
