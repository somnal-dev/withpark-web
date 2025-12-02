import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { PlaceResponse } from "../../types/place";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";

export default function usePlace(documentId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.PLACE.detail(documentId),
    queryFn: async () => {
      if (!documentId) return null;

      const response = await Fetcher.get<PlaceResponse>(
        `places/${documentId}`
      );

      return response.data;
    },
    enabled: !!documentId,
  });
}
