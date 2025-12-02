import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { CommentsResponse } from "../../types/post";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";

interface UseCommentsParams {
  postId: number;
  page?: number;
  pageSize?: number;
}

export default function useComments({
  postId,
  page = 1,
  pageSize = 20,
}: UseCommentsParams) {
  return useQuery({
    queryKey: QUERY_KEYS.COMMENT.all,
    queryFn: async () => {
      const response = await Fetcher.get<CommentsResponse>(
        `comments?postId=${postId}&page=${page}&pageSize=${pageSize}`
      );

      return response;
    },
    enabled: !!postId,
  });
}
