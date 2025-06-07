import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { ApiResponse, Post } from "../../types/community";

export default function usePost(postId: number) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const response = await Fetcher.get<ApiResponse<Post>>(
        `community/posts/${postId}`
      );
      
      return response.data;
    },
    enabled: !!postId,
  });
} 