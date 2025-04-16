import { getProjectById } from "@/actions/projects/get-project-by-id";
import ProjectDetailTable from "./_components/ProjectDetailTable";
import { getTasksByProjectId } from "@/actions/tasks/get-tasks-by-projectId";

export default async function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = await params;

  const project = await getProjectById(projectId);
  const tasks = await getTasksByProjectId(projectId);
  console.log(tasks);

  return (
    <div className="mx-auto flex pt-16 justify-center lg:items-start">
      <ProjectDetailTable
        project={project}
        projectId={projectId}
        tasks={tasks}
      />
    </div>
  );
}
