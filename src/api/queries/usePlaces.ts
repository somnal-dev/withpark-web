import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { PlacesResponse } from "../../types/place";
import qs from "qs";

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
  area,
}: UsePlacesParams = {}) {
  return useQuery({
    queryKey: ["places", page, limit, search, area],
    queryFn: async () => {
      const filters: any = {};

      if (area && area.length > 0) {
        filters.area = { $eq: area };
      }

      if (search && search.length > 0) {
        filters.name = { $containsi: search };
      }

      const query = qs.stringify(
        {
          filters,
          sort: ["createdAt:desc"],
          pagination: {
            page: page,
            pageSize: limit,
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      const response = await Fetcher.get<PlacesResponse>(`places?${query}`);

      return response;
    },
  });
}
