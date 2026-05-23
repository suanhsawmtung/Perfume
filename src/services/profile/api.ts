import api from "@/lib/api";
import type { MyProfileT } from "@/types/profile";

export async function fetchProfile(): Promise<MyProfileT> {
  const response = await api.get("/users/me/profile");
  return response.data?.data;
}
