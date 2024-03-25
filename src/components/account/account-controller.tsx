"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AccountSettings from "./account-settings-form";
import PasswordSettings from "./password-settings-form";

interface AccountControllerProps {
  id: string;
  name: string;
  username: string;
  email: string;
}

export default function AccountController({
  id,
  name,
  username,
  email,
}: AccountControllerProps) {
  return (
    <>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full h-fit grid-cols-2 bg-white rounded-none border-2">
          <TabsTrigger value="account" className="text-xl rounded-none">
            Account
          </TabsTrigger>
          <TabsTrigger value="password" className="text-xl rounded-none">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountSettings
            id={id}
            name={name}
            username={username}
            email={email}
          />
        </TabsContent>
        <TabsContent value="password">
          <PasswordSettings id={id} />
        </TabsContent>
      </Tabs>
    </>
  );
}
