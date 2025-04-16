// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ProjectResponse {
  _id: string;
  title: string;
  description: string;
  createdBy: UserResponse;
  members: UserResponse[];
  createdAt: string;
  updatedAt: string;
}
