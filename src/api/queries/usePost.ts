import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { PostResponse } from "../../types/post";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";

export default function usePost(documentId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.POST.detail(documentId),
    queryFn: async () => {
      const response = await Fetcher.get<PostResponse>(
        `posts/${documentId}?populate=*`
      );

      return response.data;
    },
    enabled: !!documentId,
  });
}
