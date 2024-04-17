import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = async () => {
  return (
    <div>
      <Button>
        <Link href="/pages/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssuesPage;
