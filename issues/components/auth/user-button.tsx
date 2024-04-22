"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "./logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { UserInfo } from "../user-info";
import { Table, TableFooter, TableRow, TableCell } from "../ui/table";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-blue-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50" align="end">
        <UserInfo label="My Account" user={user} />
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>
                <LogoutButton>
                  <DropdownMenuItem className="cursor-pointer">
                    <ExitIcon className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </LogoutButton>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
