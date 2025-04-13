import axios from "axios";
import { getSession } from "next-auth/react";

const apiAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Her istekten önce token'ı header'a ekle
apiAuth.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.user?.token) {
    config.headers.Authorization = `Bearer ${session.user.token}`;
  }

  return config;
});

export default apiAuth;
