import { client } from "@/utils/fetchClient"
import { getUserId } from "@/utils/UserLocaleStorage"

export const getPosts = async () => {
  return client.get(`/posts?userId=${getUserId()}`);
}
