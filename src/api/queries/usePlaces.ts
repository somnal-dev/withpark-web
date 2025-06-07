import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { ApiResponse, PlacesResponse } from "../../types/place";

interface UsePlacesParams {
  page?: number;
  limit?: number;
  search?: string;
  area?: string;
}

export default function usePlaces({ 
  page = 1, 
  limit = 10, 
  search,
  area
}: UsePlacesParams = {}) {
  return useQuery({
    queryKey: ['places', page, limit, search, area],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (search) params.append('search', search);
      if (area) params.append('area', area);
      
      const response = await Fetcher.get<ApiResponse<PlacesResponse>>(
        `place?${params.toString()}`
      );
      
      return response.data;
    },
  });
} 