interface TaskResponse {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  assignedTo?: UserResponse | null;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}
