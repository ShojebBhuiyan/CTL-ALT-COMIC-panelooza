import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { FiEdit, FiEdit2 } from "react-icons/fi";

export default function Profile() {
  const { data: session } = useSession();
  const [image, setImage] = useState(session?.user?.image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white p-16 flex justify-between gap-16">
      <div className="group relative w-32 h-32">
        <Avatar className="w-32 h-32 relative">
          <AvatarImage src={image!} />
          <AvatarFallback className="bg-yellow border-2 border-black text-black text-8xl">
            {session?.user?.name![0].toUpperCase()}
          </AvatarFallback>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
        </Avatar>
        <div className="z-10 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FiEdit2
            className="w-6 h-6 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

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
          <Card className="bg-white border-none rounded-none text-black">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                {"Make changes to your account here. Click save when you\'re done."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={session?.user?.name!} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue={session?.user?.username!} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={session?.user?.email!} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-1/4 bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black text-lg hover:bg-yellow">
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card className="bg-white border-none  rounded-none text-black">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                {"Change your password here. After saving, you\'ll be logged out."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-1/4 bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black text-lg hover:bg-yellow">
                Save password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
