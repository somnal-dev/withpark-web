import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import qs from "qs";
import type { PopularPlacesResponse } from "../../types/place";

interface UsePopularPlacesParams {
  limit?: number;
  area?: string;
}

export default function usePopularPlaces({
  area,
}: UsePopularPlacesParams = {}) {
  return useQuery({
    queryKey: ["popularPlaces", area],
    queryFn: async () => {
      const filters: any = {};

      if (area) {
        filters.area = { $eq: area };
      }

      const query = qs.stringify(
        {
          filters,
          sort: ["likeCount:desc"],
          pagination: {
            page: 1,
            pageSize: 5,
          },
        },
        {
          encode: true,
        }
      );

      const response = await Fetcher.get<PopularPlacesResponse>(
        `places?${query}`
      );

      return response;
    },
  });
}
