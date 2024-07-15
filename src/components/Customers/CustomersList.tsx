import CustomersItem from "./CustomersItem";

import { Customer } from "@/@types/vite-env";

const CustomersList = ({ customers }: { customers: Customer[] }) => {
  return (
    <ul className="flex flex-col gap-y-10 p-5">
      {customers.map(customer => (
        <CustomersItem
          key={customer.id}
          id={customer.id}
          email={customer.email}
          name={customer.name}
          phone={customer.phone}
        />
      ))}
      {customers.length === 0 && <p className="text-center text-white">No more customers</p>}
    </ul>
  );
};
export default CustomersList;
