import { email } from "@/actions/email";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EmailSettings = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      email: user?.email || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      email(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {user?.isOAuth === false && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <em>Edit email</em>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="johndoe@doe.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          type="submit"
          className="cursor-pointer text-green-600"
          variant="secondary"
          size="sm"
          disabled={isPending}
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default EmailSettings;
