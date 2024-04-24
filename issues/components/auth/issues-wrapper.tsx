"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

interface IssuesWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const IssuesWrapper = ({
  title,
  description,
  children,
}: IssuesWrapperProps) => {
  return (
    <>
      <Card className="bg-[whitesmoke] text-slate-900">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </>
  );
};
