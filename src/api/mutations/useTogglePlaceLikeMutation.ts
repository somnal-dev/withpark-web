import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { PlaceLikeResponse } from "../../types/place";
import type { ApiResponse } from "../../types/common";

export default function useTogglePlaceLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (placeId: number) => {
      const response = await Fetcher.post<ApiResponse<PlaceLikeResponse>>(
        `places/${placeId}/like`,
        { json: {} }
      );
      return { ...response.data, placeId };
    },
    onSuccess: () => {
      // 파크골프장 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["places"] });
      // 특정 파크골프장 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["place"] });
    },
  });
}
