import { Link } from "@tanstack/react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-x-2">
        <img src="logo.svg" className="w-7 md:w-10" />
        <p className="text-lg font-bold tracking-wider text-white md:text-xl"> Client Connect</p>
      </div>
    </Link>
  );
};
export default Logo;
