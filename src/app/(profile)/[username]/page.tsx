"use client";

import CreateProjectCard from "@/components/dashboard/create-project-card";
import ProjectCard from "@/components/dashboard/project-card";

export default function Dashboard() {
  const workspaces = Array(10).fill({
    title: "Workspace",
    name: "Name of your project",
  });

  return (
    <div className="bg-white p-16 grid md:grid-cols-4 sm:grid-cols-1 gap-x-12 gap-y-2">
      <CreateProjectCard />
      {workspaces.map((workspace, index) => (
        <ProjectCard key={index} workspace={workspace} index={index} />
      ))}
    </div>
  );
}
