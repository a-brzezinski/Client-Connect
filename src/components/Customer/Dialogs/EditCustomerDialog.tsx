import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { Customer } from "@/@types/vite-env";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { updateCustomer } from "@/lib/queries/api-functions";

const editFormSchema = z.object({
  name: z.string().min(2, { message: "Please provide a valid name." }),
  phone: z.string().min(9).max(14, { message: "Please provide a valid phone number." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
});

type EditFormFields = z.infer<typeof editFormSchema>;

const EditCustomerDialog = ({ customer }: { customer: Customer }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      toast({
        title: "Customer updated",
      });
    },
    onError: () => {
      toast({
        title: "Error updating customer",
      });
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<EditFormFields>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
    },
  });

  const onSubmit = (values: EditFormFields) => {
    setDialogOpen(false);
    const updatedCustomer = { ...customer, ...values };
    mutation.mutate(updatedCustomer);
  };

  const handleDialogChange = (isOpen: boolean) => {
    setDialogOpen(isOpen);
    if (!isOpen) {
      form.reset({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-500">Edit Customer</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-md border-violet-800 bg-violet-900">
        <DialogHeader>
          <DialogTitle className="text-center text-lg uppercase tracking-widest text-white">Edit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="fullName" className="font-bold text-white">
                    Full Name
                  </Label>
                  <Input {...field} id="fullName" className="bg-black/40 text-white" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="fullName" className="font-bold text-white">
                    Phone Number
                  </Label>
                  <Input {...field} id="fullName" className="bg-black/40 text-white" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="fullName" className="font-bold text-white">
                    Email
                  </Label>
                  <Input {...field} id="fullName" className="bg-black/40 text-white" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EditCustomerDialog;
