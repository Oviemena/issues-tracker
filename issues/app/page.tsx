import { Button } from "@radix-ui/themes";
import { LoginButton } from "../components/auth/login-button";

export default function Home() {
  return (
    <div className="items-center justify-center space-y-4">
      <h1>🔐Issues</h1>
      <LoginButton mode="redirect">
        <Button variant="soft">Sign in</Button>
      </LoginButton>
    </div>
  );
}
