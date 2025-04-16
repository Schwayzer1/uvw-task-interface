interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Developer";
}
