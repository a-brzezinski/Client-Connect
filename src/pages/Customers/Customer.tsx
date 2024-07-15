import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import CustomerItem from "@/components/Customer/CustomerItem";
import Spinner from "@/components/Loaders/Spinner";
import { Button } from "@/components/ui/button";
import { fetchCustomer } from "@/lib/queries/api-functions";
import { customerPage, customersPage } from "@/router";

const Customer = () => {
  const { id } = customerPage.useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customer", { id }],
    queryFn: () => fetchCustomer(id),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div
        className="ronded-sm e flex h-96 flex-col items-center justify-center gap-4 bg-purple-900/30 px-5 text-xl
      text-white">
        <p className="  text-center ">{error.message}</p>
        <Button asChild variant="primary" className="font-bold ">
          <Link to={customersPage.to}>All Customers</Link>
        </Button>
      </div>
    );
  }

  if (!data) {
    return <p className="text-white">Such a client does not exist.</p>;
  }

  return <CustomerItem customer={data} />;
};

export default Customer;
