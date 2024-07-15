import { Link } from "@tanstack/react-router";

import { Button } from "../ui/button";

import Logo from "./Logo";

import { customersPage } from "@/router";

const Navigation = () => {
  return (
    <nav className="fixed flex w-full items-center justify-around rounded-2xl   bg-black/60 py-5 md:max-w-screen-2xl">
      <Logo />
      <Button asChild variant="primary" className="px-5 text-base text-white">
        <Link to={customersPage.to}>Customers</Link>
      </Button>
    </nav>
  );
};
export default Navigation;
