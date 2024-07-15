import Navigation from "@/components/Navigation/Navigation";
import { Outlet } from "@tanstack/react-router";

const CustomersLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-[#240046] to-[#3c096c]">
      <div className="w-full max-w-screen-2xl">
        <Navigation />
      </div>
      <div className="mt-20 w-full max-w-screen-2xl px-5 py-5">
        <Outlet />
      </div>
    </div>
  );
};
export default CustomersLayout;
