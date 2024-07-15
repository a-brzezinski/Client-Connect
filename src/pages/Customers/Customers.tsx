import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Customer } from "@/@types/vite-env";
import CustomersList from "@/components/Customers/CustomersList";
import Spinner from "@/components/Loaders/Spinner";
import { Button } from "@/components/ui/button";
import { fetchCustomers } from "@/lib/queries/api-functions";

const Customers = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["customers", { page }],
    queryFn: () => fetchCustomers(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p className="text-white text-center">{error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex w-full flex-col rounded-xl bg-gradient-to-tl from-violet-900 to-violet-800 ">
        <CustomersList customers={data as Customer[]} />
        <div className="flex items-center gap-x-4 self-center p-5">
          <Button
            className="bg-violet-500 hover:bg-violet-600 "
            size="sm"
            onClick={() => setPage(old => Math.max(old - 1, 1))}
            disabled={page === 1}>
            Previous
          </Button>
          <span className="font-bold tracking-wider text-white"> Page {page} </span>
          <Button
            size="sm"
            className="bg-violet-500 hover:bg-violet-600 "
            onClick={() => setPage(old => (!data || data.length === 0 ? old : old + 1))}
            disabled={!data || data.length === 0}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Customers;
