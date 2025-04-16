// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TaskLogResponse {
  _id: string;
  taskId: string;
  oldStatus: string;
  newStatus: string;
  updatedBy: UserResponse;
  updatedAt: string;
}
