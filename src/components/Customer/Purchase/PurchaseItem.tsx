import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

import CancelOrderDialog from "../Dialogs/CancelOrderDialog";

import { Customer, PurchaseHistory } from "@/@types/vite-env";
import { useToast } from "@/components/ui/use-toast";
import { updateCustomer } from "@/lib/queries/api-functions";

const PurchaseItem = ({ purchase, customer }: { purchase: PurchaseHistory; customer: Customer }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const date = new Date(purchase.purchaseDate);
  const formattedDate = format(date, "dd/MM/yyyy, HH:mm");

  const mutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      toast({
        title: "Order canceled",
        description: "The order has been canceled successfully",
      });
    },
  });

  const orderCancellation = () => {
    if (!customer) {
      return;
    }
    const updatedPurchaseHistory = customer.purchaseHistory.filter(item => item.itemId !== purchase.itemId);
    mutation.mutate({ ...customer, purchaseHistory: updatedPurchaseHistory });
  };

  return (
    <li className="flex flex-col gap-y-2 rounded-sm bg-purple-900/40 p-4 shadow-2xl">
      <div className="flex flex-col gap-y-4">
        <p className="text-xl font-bold text-purple-300">{purchase.item}</p>
        <p className="italic text-green-300">{purchase.price} $</p>
        <p className="italic text-purple-200">{formattedDate}</p>
      </div>
      <CancelOrderDialog orderCancellation={orderCancellation} item={purchase.item} />
    </li>
  );
};
export default PurchaseItem;
