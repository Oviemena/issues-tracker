"use client";

import { TextField, Button, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueCreationSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { createIssue } from "@/actions/issues";
import { getUserById } from "@/data/user";

type IssueForm = z.infer<typeof issueCreationSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isLoading },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueCreationSchema),
  });

  const submitForm = handleSubmit(async (data: IssueForm) => {
  //   try {

  //     await axios.post("/api/issues", data);
  //     router.push("/pages/issues");
  //   } catch (error) {
  //     setError("An Unexpected error occurred!");
  //     console.log(error);
  //   }
  // });
    

  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>
            <div className="flex gap-x-2  items-center text-sm">
              <ExclamationTriangleIcon />
              {error}
            </div>
          </Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={submitForm}>
        <TextField.Root
          color="indigo"
          variant="soft"
          placeholder="Search the docs…"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description..." {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {isSubmitting && <Spinner />} Submit New Issue
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
