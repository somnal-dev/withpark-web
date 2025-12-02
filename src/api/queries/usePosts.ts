import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { PostsResponse } from "../../types/post";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";

interface UsePostsParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
}

export default function usePosts({
  page = 1,
  pageSize = 10,
  sort = "createdAt:desc",
  search = "",
}: UsePostsParams = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.POST.lists(), page, pageSize, sort, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (sort) {
        params.append("sort", sort);
      }

      if (search && search.trim()) {
        params.append("search", search.trim());
      }

      const response = await Fetcher.get<PostsResponse>(
        `posts?${params.toString()}`
      );

      return response;
    },
  });
}
