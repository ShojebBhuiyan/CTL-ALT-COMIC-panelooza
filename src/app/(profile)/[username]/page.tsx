import { auth } from "@/auth";
import CreateProjectCard from "@/components/dashboard/create-project-card";
import ProjectCard from "@/components/dashboard/project-card";
import { redirect } from "next/navigation";

export default async function Dashboard({
  params,
}: {
  params: { username: string };
}) {
  const session = await auth();

  if (params.username !== session?.user.username!) {
    redirect(`/${session?.user.username!}`);
  }

  const workspaces = Array(10).fill({
    title: "Workspace",
    name: "Name of your project",
  });

  return (
    <div className="w-full bg-white">
      <div className="container flex flex-wrap justify-start gap-x-8 py-8 gap-y-4">
        <CreateProjectCard />
        {workspaces.map((workspace, index) => (
          <ProjectCard key={index} workspace={workspace} index={index} />
        ))}
      </div>
    </div>
  );
}
