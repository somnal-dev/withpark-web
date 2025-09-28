import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { PlaceResponse } from "../../types/place";

export default function usePlace(documentId: string | null) {
  return useQuery({
    queryKey: ["place", documentId],
    queryFn: async () => {
      if (!documentId) return null;

      const response = await Fetcher.get<PlaceResponse>(
        `places/${documentId}?populate=*`
      );

      return response.data;
    },
    enabled: !!documentId,
  });
}
