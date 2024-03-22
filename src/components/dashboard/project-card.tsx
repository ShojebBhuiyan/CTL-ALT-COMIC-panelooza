import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function ProjectCard({
  workspace,
  index,
}: {
  workspace: { title: string; name: string };
  index: number;
}) {
  return (
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
  );
}
