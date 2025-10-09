import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { PostsResponse } from "../../types/post";
import qs from "qs";

interface UsePostsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export default function usePosts({
  page = 1,
  limit = 10,
  search = "",
}: UsePostsParams = {}) {
  return useQuery({
    queryKey: ["posts", page, limit, search],
    queryFn: async () => {
      const filters: any = {
        user: { $notNull: true },
      };

      // search가 있을 때만 필터 추가
      if (search && search.trim()) {
        filters.title = { $containsi: search };
      }

      const queryParams: any = {
        filters,
        sort: ["createdAt:desc"],
        pagination: {
          page: page,
          pageSize: limit,
        },
      };

      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true,
      });

      const response = await Fetcher.get<PostsResponse>(
        `posts?${query}&populate=*`
      );

      return response;
    },
  });
}
