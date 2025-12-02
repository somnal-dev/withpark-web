import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { PopularPostsResponse, PopularPeriod } from "../../types/post";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";
import qs from "qs";

interface UsePopularPostsParams {
  page?: number;
  limit?: number;
  period?: PopularPeriod;
}

export default function usePopularPosts({
  page = 1,
  limit = 10,
  period = "all",
}: UsePopularPostsParams = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.POST.lists(), "popular", page, limit, period],
    queryFn: async () => {
      const filters: any = {};

      const query = qs.stringify(
        {
          filters,
          sort: ["viewCount:desc"],
          pagination: {
            page: 1,
            pageSize: 5,
          },
        },
        {
          encode: true,
        }
      );

      const response = await Fetcher.get<PopularPostsResponse>(
        `posts?${query}`
      );

      return response;
    },
  });
}
