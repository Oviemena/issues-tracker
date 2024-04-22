import { TwoFactor } from "@/actions/2fa";
import { FormError } from "@/components/form-error";
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
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TwoFactorSettings = () => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      isTwoFactorAuthEnabled: user?.isTwoFactorAuthEnabled || undefined,
    },
  });

  const handleSwitchChange = (value: boolean) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      TwoFactor({ isTwoFactorAuthEnabled: value })
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="space-y-4">
          {user?.isOAuth === false && (
            <FormField
              control={form.control}
              name="isTwoFactorAuthEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Two Factor Authentication</FormLabel>
                    <FormDescription>
                      Enable two factor authentication for your account
                    </FormDescription>
                    <FormControl>
                      <Switch
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          handleSwitchChange(checked);
                        }}
                      ></Switch>
                    </FormControl>
                    <FormMessage>
                      {success ||
                        (field.value ? (
                          <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
                            <CheckCircledIcon className="h-4 w-4" />

                            <p>Two Factor Authentication enabled!</p>
                          </div>
                        ) : (
                          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                            <ExclamationTriangleIcon className="h-4 w-4" />
                            <p>Two Factor Authentication disabled!</p>
                          </div>
                        ))}
                    </FormMessage>
                  </div>
                </FormItem>
              )}
            />
          )}
        </div>
        <FormError message={error} />
      </form>
    </Form>
  );
};

export default TwoFactorSettings;
