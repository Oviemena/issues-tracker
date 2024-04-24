import { IssuesWrapper } from "@/components/auth/issues-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getAllIssues } from "@/data/issues";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { CaretDownIcon } from "@radix-ui/react-icons";

const CompletedIssues = async () => {
  const issues = await getAllIssues();
  return (
    <div className="w-[400px] space-y-2">
      <div className="font-semibold text-2xl bg-green-600 items-center  justify-between p-4 flex flex-row">
        <h1>Completed</h1>
        <span>
          <CaretDownIcon />
        </span>
      </div>
      <Input pattern="rounded" placeholder="search for open issues..." />
      {issues?.map((issue) => (
        <IssuesWrapper
          key={issue.id}
          title={issue.title}
          description={issue.description}
        >
          <div className="flex flex-row space-x-2 font-mono text-sm">
            <span>by</span>
            {issue.user.image && (
              <Avatar className="w-5 h-5">
                <AvatarImage src={issue.user.image || ""} />
                <AvatarFallback className="bg-blue-500">
                  <FaUser className="text-white" />
                </AvatarFallback>
              </Avatar>
            )}
            <p>{issue.user.name}</p>
          </div>
        </IssuesWrapper>
      ))}
    </div>
  );
};

export default CompletedIssues;
