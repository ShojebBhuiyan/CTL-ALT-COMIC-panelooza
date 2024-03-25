import { getServerSession } from "@/actions/auth/get-server-session";
import { getAllUserProjects } from "@/actions/project/get-all-user-projects";
import CreateProjectCard from "@/components/dashboard/create-project-card";
import ProjectCard from "@/components/dashboard/project-card";
import { redirect } from "next/navigation";

export default async function Dashboard({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerSession();

  if (params.username !== session?.user.username!) {
    redirect(`/${session?.user.username!}`);
  }

  const projects = await getAllUserProjects(session?.user.id!);

  return (
    <div className="w-full bg-white">
      <div className="container flex flex-wrap justify-start gap-x-8 py-8 gap-y-4">
        <CreateProjectCard userId={session?.user.id!} />
        {projects?.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
