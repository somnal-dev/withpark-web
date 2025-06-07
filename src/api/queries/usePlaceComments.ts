import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { ApiResponse, PlaceCommentsResponse } from "../../types/place";

interface UsePlaceCommentsParams {
  placeId: number;
  page?: number;
  limit?: number;
}

export default function usePlaceComments({ 
  placeId, 
  page = 1, 
  limit = 20 
}: UsePlaceCommentsParams) {
  return useQuery({
    queryKey: ['placeComments', placeId, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      const response = await Fetcher.get<ApiResponse<PlaceCommentsResponse>>(
        `place/${placeId}/comments?${params.toString()}`
      );
      
      return response.data;
    },
    enabled: !!placeId,
  });
} 