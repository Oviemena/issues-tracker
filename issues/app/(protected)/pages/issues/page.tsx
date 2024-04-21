import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";

const IssuesPage = async () => {
  return (
    <div>
      <Button className="flex flex-row">
        <PlusIcon />
        <Link href="/pages/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssuesPage;
