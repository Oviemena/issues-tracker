"use client";
 
import { useCurrentUser } from "@/hooks/use-current-user";


const DashboardPage = () => {
  const user = useCurrentUser();
  return <div>{JSON.stringify(user)}</div>;
};

export default DashboardPage;
