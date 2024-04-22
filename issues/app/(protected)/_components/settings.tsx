import { settings } from "@/actions/settings";
import NameSettings from "@/components/auth/(settings)/name";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { IconButton } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AiFillEdit } from "react-icons/ai";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmailSettings from "@/components/auth/(settings)/email";
import PasswordSettings from "@/components/auth/(settings)/password";
import TwoFactorSettings from "@/components/auth/(settings)/2fa";

interface SettinsProps {
  label: string;
}

export function openNamePopUp() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">
          <AiFillEdit className="cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <NameSettings />
      </PopoverContent>
    </Popover>
  );
}

export function openEmailPopUp() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">
          <AiFillEdit className="cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <EmailSettings />
      </PopoverContent>
    </Popover>
  );
}

export function openPasswordPopUp() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">
          <AiFillEdit className="cursor-pointer" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PasswordSettings />
      </PopoverContent>
    </Popover>
  );
}
const Settings = ({ label }: SettinsProps) => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorAuthEnabled: user?.isTwoFactorAuthEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      settings(values)
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
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <p className="font-mono text-pretty">{user?.name}</p>
          {openNamePopUp()}
        </div>
        <div className="flex flex-row justify-between">
          <p className="font-mono text-pretty">{user?.email}</p>
          {openEmailPopUp()}
        </div>
        <div className="flex flex-row justify-between">
          <p className="font-mono text-pretty">Edit password</p>
          {openPasswordPopUp()}
        </div>
        <TwoFactorSettings />
      </CardContent>
    </Card>
  );
};

export default Settings;
