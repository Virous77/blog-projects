"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useServerAction } from "zsa-react";
import { formAction } from "@/action/use-form-action";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

const FormComp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const { isPending, isSuccess, data, execute, error, isError } =
    useServerAction(formAction);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await execute(values);
  }
  return (
    <section className="w-[600px] border shadow p-4 rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                {isSuccess && <FormDescription>{data.name}</FormDescription>}
                <FormMessage>
                  {(isError &&
                    error.fieldErrors &&
                    error.fieldErrors["name"]) ||
                    error?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default FormComp;
