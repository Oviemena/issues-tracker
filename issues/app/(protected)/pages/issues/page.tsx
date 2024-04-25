import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { issueSchema } from "@/app/validationSchema";
import { getAllIssues } from "@/data/issues";
import { z } from "zod";

interface IssueData {
  issues: z.infer<typeof issueSchema>[];
}

async function getData(): Promise<IssueData> {
  const allIssues = await getAllIssues();
  let issues: z.infer<typeof issueSchema>[] = [];
  if (allIssues) {
    issues = allIssues.map((issue) => ({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      status: issue.status,
      email: issue.user.email,
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt
    }));
  }
  return {
    issues,
  };
}

export default async function IssuePage() {
  const data = await getData();
  // console.log(data.issues);
  return (
    <>
      <div>
        <Button className="flex flex-row">
          <PlusIcon />
          <Link href="/pages/issues/new">New Issue</Link>
        </Button>
      </div>
      <div className="container mx-auto py-10 ">
        <DataTable columns={columns} data={data.issues} />
      </div>
    </>
  );
}
