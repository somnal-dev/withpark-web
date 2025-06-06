import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { ApiResponse, Place } from "../../types/place";

export default function usePlace(placeId: number | null) {
  return useQuery({
    queryKey: ['place', placeId],
    queryFn: async () => {
      if (!placeId) return null;
      
      const response = await Fetcher.get<ApiResponse<Place>>(
        `place/${placeId}`
      );
      
      return response.data;
    },
    enabled: !!placeId,
  });
} 