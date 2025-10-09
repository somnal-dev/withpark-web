import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { CommentsResponse } from "../../types/post";
import qs from "qs";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";

interface UseCommentsParams {
  postDocumentId: string;
  page?: number;
  limit?: number;
}

export default function useComments({
  postDocumentId,
  page = 1,
  limit = 20,
}: UseCommentsParams) {
  return useQuery({
    queryKey: QUERY_KEYS.COMMENT.all,
    queryFn: async () => {
      const query = qs.stringify(
        {
          filters: {
            post: {
              documentId: { $eq: postDocumentId },
            },
          },
          sort: ["createdAt:desc"],
          pagination: {
            page,
            pageSize: limit,
          },
          populate: "*",
        },
        {
          encodeValuesOnly: true,
        }
      );

      const response = await Fetcher.get<CommentsResponse>(`comments?${query}`);

      return response;
    },
    enabled: !!postDocumentId,
  });
}
