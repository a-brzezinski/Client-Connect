import { Button } from "@/components/ui/button";
import { customersPage } from "@/router";
import { Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <>
      <p className="text-center text-3xl font-bold text-white">
        Welcome to Client Connect, the place where you can easily manage your customers and their orders!
      </p>
      <Button variant="primary" asChild>
        <Link to={customersPage.to}>Browse customers</Link>
      </Button>
    </>
  );
};

export default Home;
