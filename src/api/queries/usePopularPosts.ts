import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { ApiResponse, PopularPostsResponse, PopularPeriod } from "../../types/community";

interface UsePopularPostsParams {
  page?: number;
  limit?: number;
  period?: PopularPeriod;
}

export default function usePopularPosts({ 
  page = 1, 
  limit = 10, 
  period = 'all' 
}: UsePopularPostsParams = {}) {
  return useQuery({
    queryKey: ['popularPosts', page, limit, period],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        period: period,
      });
      
      const response = await Fetcher.get<ApiResponse<PopularPostsResponse>>(
        `community/posts/popular?${params.toString()}`
      );
      
      return response.data;
    },
  });
} 