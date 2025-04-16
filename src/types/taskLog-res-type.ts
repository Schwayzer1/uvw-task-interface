interface TaskLogResponse {
  _id: string;
  taskId: string;
  oldStatus: string;
  newStatus: string;
  updatedBy: UserResponse;
  updatedAt: string;
}
