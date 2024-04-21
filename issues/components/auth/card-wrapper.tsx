"use client";

import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  title: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  title,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header title={title} label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <div className="flex space-x-2 p-2 items-center justify-center">
        <Separator className="my-4 w-[40%]" />
        <p>OR</p>
        <Separator className="my-4 w-[40%]" />
      </div>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
