import { Phone } from "lucide-react";

import EditCustomerDialog from "./Dialogs/EditCustomerDialog";
import RemoveCustomerDialog from "./Dialogs/RemoveCustomerDialog";
import SendMessageDialog from "./Dialogs/SendMessageDialog";
import PurchaseList from "./Purchase/PurchaseList";

import { Customer } from "@/@types/vite-env";

type Props = {
  customer: Customer;
};

const CustomerItem = ({ customer }: Props) => {
  return (
    <div className="flex flex-col gap-10 rounded-sm bg-gradient-to-tr from-violet-950 to-violet-700 p-5 text-white shadow-xl">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <img className="max-w-[150px] rounded-xl" src={customer.avatar} />
        <div className="flex flex-col items-center justify-around md:items-start">
          <div className="flex items-center  gap-x-1">
            <p className="text-xl font-bold">{customer.name}</p>
          </div>
          <div className="flex items-center gap-x-1 pt-2">
            <Phone />
            <p className="text-lg">{customer.phone}</p>
          </div>
          <div className="flex items-center gap-x-1 pt-2">
            <SendMessageDialog email={customer.email} />
          </div>
        </div>
      </div>
      <div>
        <hr />
        <p className="p-2 text-xl font-bold text-purple-400">Purchase History</p>
        <PurchaseList customer={customer} />
      </div>
      <div className="flex gap-2">
        <EditCustomerDialog customer={customer} />
        <RemoveCustomerDialog customerId={customer.id} />
      </div>
    </div>
  );
};

export default CustomerItem;
