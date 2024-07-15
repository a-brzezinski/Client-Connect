import PurchaseItem from "./PurchaseItem";

import { Customer } from "@/@types/vite-env";

const PurchaseList = ({ customer }: { customer: Customer }) => {
  return (
    <ul className="flex flex-col flex-wrap gap-6 p-2 md:flex-row">
      {customer.purchaseHistory.map(item => (
        <PurchaseItem key={item.itemId} purchase={item} customer={customer} />
      ))}
      {customer.purchaseHistory.length === 0 && <p>The customer does not have any orders yet.</p>}
    </ul>
  );
};
export default PurchaseList;
