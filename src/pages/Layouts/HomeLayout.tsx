import { Outlet } from "@tanstack/react-router";

const HomeLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#240046] to-[#3c096c] p-4">
      <Outlet />
    </div>
  );
};

export default HomeLayout;
