import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { ApiResponse, PostsResponse } from "../../types/community";

interface UsePostsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export default function usePosts({ page = 1, limit = 10, search = '' }: UsePostsParams = {}) {
  return useQuery({
    queryKey: ['posts', page, limit, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (search) {
        params.append('search', search);
      }
      
      const response = await Fetcher.get<ApiResponse<PostsResponse>>(
        `community/posts?${params.toString()}`
      );
      
      return response.data;
    },
  });
} 