import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { ApiResponse, PopularPlacesResponse } from "../../types/place";

interface UsePopularPlacesParams {
  limit?: number;
  area?: string;
}

export default function usePopularPlaces({ 
  limit = 10, 
  area
}: UsePopularPlacesParams = {}) {
  return useQuery({
    queryKey: ['popularPlaces', limit, area],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: limit.toString(),
      });
      
      if (area) params.append('area', area);
      
      const response = await Fetcher.get<ApiResponse<PopularPlacesResponse>>(
        `place/popular?${params.toString()}`
      );
      
      return response.data.places;
    },
  });
} 