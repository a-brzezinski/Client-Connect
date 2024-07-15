import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "../../ui/button";
import { useToast } from "../../ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCustomer } from "@/lib/queries/api-functions";

const RemoveCustomerDialog = ({ customerId }: { customerId: string }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: () => deleteCustomer(customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      navigate({
        to: "/customers",
      });
      toast({
        title: "Customer removed",
        description: "The customer has been removed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error removing customer",
        description: "An error occurred while removing the customer",
      });
    },
  });

  const handleDeleteCustomer = () => {
    mutation.mutate();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-500">Remove Customer</Button>
      </DialogTrigger>
      <DialogContent className="w-3/4 rounded-lg border-violet-700 bg-violet-800">
        <DialogHeader>
          <DialogTitle className="text-white">Are you absolutely sure?</DialogTitle>
          <DialogDescription className="pt-4 text-violet-300">
            This action cannot be undone. This will permanently delete account and remove data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="bg-red-500 hover:bg-red-400" onClick={handleDeleteCustomer}>
            Delete Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default RemoveCustomerDialog;
