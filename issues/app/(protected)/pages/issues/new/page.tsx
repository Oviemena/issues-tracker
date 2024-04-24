"use client";

import { Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueCreationSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { createIssue } from "@/actions/create-issue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Status } from "@prisma/client";
import { Button } from "@/components/ui/button";

type IssueForm = z.infer<typeof issueCreationSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<IssueForm>({
    resolver: zodResolver(issueCreationSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "OPEN",
    },
  });

  const onSubmit = (values: IssueForm) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createIssue(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
            router.push("/pages/issues");
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>
            <div className="flex gap-x-2  items-center text-sm">
              <ExclamationTriangleIcon />
              {error ? error : success}
            </div>
          </Callout.Text>
        </Callout.Root>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="title..."
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <SimpleMDE placeholder="Description..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Status.OPEN}>Open</SelectItem>
                      <SelectItem value={Status.IN_PROGRESS}>
                        In-Progress
                      </SelectItem>
                      <SelectItem value={Status.COMPLETED}>
                        Completed
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button variant="ghost" type="submit">
            {isPending ? (
              <>
                <div className="flex flex-row space-x-2">
                  <Spinner />
                  <span>Creating Issue...</span>
                </div>
              </>
            ) : (
              "Create Issue"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewIssuePage;
