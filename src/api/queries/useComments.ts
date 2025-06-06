import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { ApiResponse, CommentsResponse } from "../../types/community";

interface UseCommentsParams {
  postId: number;
  page?: number;
  limit?: number;
}

export default function useComments({ postId, page = 1, limit = 20 }: UseCommentsParams) {
  return useQuery({
    queryKey: ['comments', postId, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      const response = await Fetcher.get<ApiResponse<CommentsResponse>>(
        `community/posts/${postId}/comments?${params.toString()}`
      );
      
      return response.data;
    },
    enabled: !!postId,
  });
} 