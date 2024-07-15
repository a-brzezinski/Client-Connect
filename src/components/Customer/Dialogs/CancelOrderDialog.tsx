import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  orderCancellation: () => void;
  item: string;
};

const cancelOrderFormSchema = z.object({
  reason: z.string().min(2, { message: "Please provide a reason for cancellation." }),
});

type cancelOrderFormFields = z.infer<typeof cancelOrderFormSchema>;

const CancelOrderDialog = ({ orderCancellation, item }: Props) => {
  const form = useForm<cancelOrderFormFields>({
    resolver: zodResolver(cancelOrderFormSchema),
    defaultValues: {
      reason: "",
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setDialogOpen(isOpen);
  };

  const onSubmit = (values: cancelOrderFormFields) => {
    // send email to client with the reason for cancellation logic
    console.log(values);
    setDialogOpen(false);
    orderCancellation();
    form.reset();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="mt-auto bg-red-400 font-bold hover:bg-red-300">Cancel</Button>
      </DialogTrigger>
      <DialogContent className="flex w-3/4 flex-col gap-5 rounded-lg border-black bg-violet-900">
        <DialogHeader>
          <DialogTitle className="text-violet-300">
            Cancel order for <span className="text-red-300">{item}</span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    placeholder="Enter reason for cancellation"
                    className="border-black bg-violet-800/30 text-white shadow-xl placeholder:text-white"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4 bg-red-500 font-bold hover:bg-red-400">
              Cancel order
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CancelOrderDialog;
