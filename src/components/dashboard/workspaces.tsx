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

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Workspace() {
  const workspaces = Array(10).fill({
    title: "Workspace",
    name: "Name of your project",
  });

  return (
    <div className="bg-white p-16 flex flex-wrap justify-between space-y-1">
      <Card className="w-[300px] h-[270px] rounded-none border-2 bg-violet text-black">
        <CardHeader>
          <CardTitle>Add New</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  className="bg-white"
                  id="name"
                  placeholder="Name of your project"
                />
                <Label htmlFor="description">Description</Label>
                <Input
                  className="bg-white"
                  id="description"
                  placeholder="Description of your project"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-1/4 bg-red rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow">
            Cancel
          </Button>
          <Button className="w-1/4 bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow">
            Create
          </Button>
        </CardFooter>
      </Card>
      {workspaces.map((workspace, index) => (
        <Card
          key={index}
          className="w-[300px] h-[270px] rounded-none border-2 bg-white text-black"
        >
          <CardHeader>
            <CardTitle>
              {workspace.title} {index + 1}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center justify-center gap-4">
              <Skeleton className="h-[120px] w-[250px] rounded-none" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-1/4 bg-red rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow">
              Delete
            </Button>
            <div className="w-1/4">
              <Link href={`/workspace/${index}`}>
                <Button className="w-full bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow">
                  Edit
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
