import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { PostResponse } from "../../types/community";
import qs from "qs";

export default function usePost(documentId: string) {
  return useQuery({
    queryKey: ["post", documentId],
    queryFn: async () => {
      const response = await Fetcher.get<PostResponse>(
        `posts/${documentId}?populate=*`
      );

      return response.data;
    },
    enabled: !!documentId,
  });
}
