export default async function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = await params;

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-5 pt-16 lg:flex-row lg:items-start">
      {projectId}
    </div>
  );
}
