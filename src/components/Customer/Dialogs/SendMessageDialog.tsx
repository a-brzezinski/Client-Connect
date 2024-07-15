import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  email: string;
};

const messageFormSchema = z.object({
  email: z.string().email(),
  message: z.string().min(2, { message: "Please provide a message." }),
});

type messageFormFields = z.infer<typeof messageFormSchema>;

const SendMessageDialog = ({ email }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<messageFormFields>({
    resolver: zodResolver(messageFormSchema),
    defaultValues: {
      email: email,
      message: "",
    },
  });

  const onSubmit = (values: messageFormFields) => {
    // send message logic
    console.log(values);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className=" text-lg text-purple-400 md:p-0">
          Send Message
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-violet-900">
        <DialogHeader>
          <DialogTitle className="text-white">Send a message </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex items-center">
                  <Input disabled value={field.value} className="" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <Textarea {...field} className="bg-violet-300" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-violet-600 hover:bg-violet-500">
              Send Message
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default SendMessageDialog;
