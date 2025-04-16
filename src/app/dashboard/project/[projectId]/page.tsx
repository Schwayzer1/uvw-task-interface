import { getProjectById } from "@/actions/projects/get-project-by-id";
import ProjectDetailTable from "./_components/ProjectDetailTable";
import { getTasksByProjectId } from "@/actions/tasks/get-tasks-by-projectId";
import { getAllUser } from "@/actions/auth/get-all-user";

type tParams = Promise<{ slug: string[] }>;

export default async function ProjectDetailPage(props: { params: tParams }) {
  const { slug } = await props.params;
  const projectId = slug[1];

  const project = await getProjectById(projectId);
  const tasks = await getTasksByProjectId(projectId);
  const userList = await getAllUser();

  return (
    <div className="mx-auto flex pt-16 justify-center lg:items-start">
      <ProjectDetailTable
        project={project}
        projectId={projectId}
        tasks={tasks}
        userList={userList}
      />
    </div>
  );
}
