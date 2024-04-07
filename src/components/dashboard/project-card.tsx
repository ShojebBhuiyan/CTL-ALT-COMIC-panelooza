"use client";

import { deleteSelectedProject } from "@/actions/project/delete-selected-project";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@prisma/client";
import Link from "next/link";
import { useToast } from "../ui/use-toast";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { toast } = useToast();
  return (
    <Card
      key={project.id}
      className="w-[300px] h-[270px] rounded-none border-2 bg-white text-black"
    >
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center justify-center gap-4">
          <Skeleton className="h-[120px] w-[250px] rounded-none" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={async () => {
            await deleteSelectedProject(project.id).then(() => {
              toast({
                variant: "destructive",
                title: "Project deleted",
                description: "Your project has been deleted successfully.",
              });
            });
          }}
          className="w-1/4 bg-red rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow"
        >
          Delete
        </Button>
        <div className="w-1/4">
          <Link href={`/workspace/${project.id}`}>
            <Button className="w-full bg-green rounded-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] text-black hover:bg-yellow">
              Edit
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
