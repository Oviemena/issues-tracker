import NameSettings from "@/components/auth/(settings)/name";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AiFillEdit } from "react-icons/ai";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmailSettings from "@/components/auth/(settings)/email";
import PasswordSettings from "@/components/auth/(settings)/password";
import TwoFactorSettings from "@/components/auth/(settings)/2fa";

interface SettinsProps {
  label: string;
}

export function openNamePopUp() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">
          <AiFillEdit className="cursor-pointer" color="blue" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <NameSettings />
      </PopoverContent>
    </Popover>
  );
}

export function openEmailPopUp() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">
          <AiFillEdit className="cursor-pointer" color="blue" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <EmailSettings />
      </PopoverContent>
    </Popover>
  );
}

export function openPasswordPopUp() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">
          <AiFillEdit className="cursor-pointer" color="blue" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PasswordSettings />
      </PopoverContent>
    </Popover>
  );
}

export function openTwoFactorAuthPopUp() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">
          <AiFillEdit className="cursor-pointer" color="blue" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <TwoFactorSettings />
      </PopoverContent>
    </Popover>
  );
}
const Settings = ({ label }: SettinsProps) => {
  const user = useCurrentUser();

  return (
    <Card>
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <p className="font-extralight text-pretty">Edit name</p>
          {openNamePopUp()}
        </div>
        <div className="flex flex-row justify-between">
          <p className="font-extralight text-pretty">Edit email</p>
          {user?.isOAuth === false && openEmailPopUp()}
        </div>
        {user?.isOAuth === false && (
          <>
            <div className="flex flex-row justify-between">
              <p className="font-extralight text-pretty">Edit password</p>
              {openPasswordPopUp()}
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <TwoFactorSettings />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Settings;
