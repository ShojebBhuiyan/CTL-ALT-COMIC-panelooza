"use client";

import CreateProjectCard from "@/components/dashboard/create-project-card";
import ProjectCard from "@/components/dashboard/project-card";

export default function Dashboard() {
  const workspaces = Array(10).fill({
    title: "Workspace",
    name: "Name of your project",
  });

  return (
    <div className="w-full bg-white">
      <div className="container flex flex-wrap py-8 gap-x-8 gap-y-4">
        <CreateProjectCard />
        {workspaces.map((workspace, index) => (
          <ProjectCard key={index} workspace={workspace} index={index} />
        ))}
      </div>
    </div>
  );
}
