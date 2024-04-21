import { Button } from "@radix-ui/themes";
import { LoginButton } from "../components/auth/login-button";
import { AiFillBug } from "react-icons/ai";

import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["cyrillic"],
  weight: "800",
});
export default function Home() {
  return (
    <div
      className="flex flex-row h-screen items-center justify-around space-y-4 bg-contain"
      style={{ backgroundImage: "url('/pexels-rahulp9800-1933900.jpg')" }}
    >
      <section className="gap-y-4 flex flex-col justify-center items-center">
        <div className="justify-center flex flex-col items-center">
          <div className="flex flex-row">
            <AiFillBug color="gold" size="40px" />
            <h1
              className={`text-3xl font-mono, ${rubik.className}`}
            >
              <big>Issues </big>
            </h1>
          </div>
          <p className="text-2xl text-pretty font-semibold my-4">
            <em>
              An app that allows you to colaborate and report issues with no
              stress
            </em>
          </p>
        </div>

        <div>
          <LoginButton mode="redirect" asChild>
            <Button variant="solid" size="4" color="blue">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </section>
    </div>
  );
}
