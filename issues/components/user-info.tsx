"use client";

import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Settings from "@/app/(protected)/_components/settings";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <p className="text-2xl font-semibold text-center">{label}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 ">
              <p className="text-sm font-medium">Name</p>
              <p className="truncate text-xs max-w-[180px] font-mono p-1 rounded-md ml-4">
                {user?.name}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3">
              <p className="text-sm font-medium">Email</p>
              <p className="truncate text-xs max-w-[180px] font-mono p-1 rounded-md ml-4">
                {user?.email}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3">
              <p className="text-sm font-medium">Two Factor Authentication</p>

              <Badge
                className="ml-4"
                variant={
                  user?.isTwoFactorAuthEnabled ? "success" : "destructive"
                }
              >
                {user?.isTwoFactorAuthEnabled ? "ON" : "OFF"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings">
        <Settings label="Settings"/>
      </TabsContent>
    </Tabs>
  );
};
