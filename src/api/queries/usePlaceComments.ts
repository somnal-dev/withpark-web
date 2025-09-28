import { useQuery } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { PlaceCommentsResponse } from "../../types/place";
import qs from "qs";

interface UsePlaceCommentsParams {
  placeDocumentId: string;
  page?: number;
  limit?: number;
}

export default function usePlaceComments({
  placeDocumentId,
  page = 1,
  limit = 20,
}: UsePlaceCommentsParams) {
  return useQuery({
    queryKey: ["placeComments", placeDocumentId, page, limit],
    queryFn: async () => {
      const query = qs.stringify(
        {
          filters: {
            place: {
              documentId: { $eq: placeDocumentId },
            },
          },
          sort: ["createdAt:desc"],
          pagination: {
            page,
            pageSize: limit,
          },
          populate: ["author"],
        },
        {
          encodeValuesOnly: true,
        }
      );

      const response = await Fetcher.get<PlaceCommentsResponse>(
        `place-comments?${query}`
      );

      return response;
    },
    enabled: !!placeDocumentId,
  });
}
