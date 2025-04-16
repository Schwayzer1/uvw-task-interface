import { getProjectById } from "@/actions/projects/get-project-by-id";
import ProjectDetailTable from "./_components/ProjectDetailTable";

export default async function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;

  const project = await getProjectById(projectId);

  return (
    <div className="mx-auto flex pt-16 justify-center lg:items-start">
      <ProjectDetailTable project={project} />
    </div>
  );
}
