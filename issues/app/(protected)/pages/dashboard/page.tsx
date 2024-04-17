import { signOut, auth } from "@/auth";
import { Button } from "@radix-ui/themes";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <>
      <div>DashboardPage</div>
      {JSON.stringify(session)}

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit" variant="outline" color="red">
          Sign out
        </Button>
      </form>
    </>
  );
};

export default DashboardPage;
