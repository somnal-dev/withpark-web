import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { ApiResponse, PlaceComment, CreatePlaceCommentRequest } from "../../types/place";

interface CreatePlaceCommentParams {
  placeId: number;
  data: CreatePlaceCommentRequest;
}

export default function useCreatePlaceCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ placeId, data }: CreatePlaceCommentParams) => {
      const response = await Fetcher.post<ApiResponse<PlaceComment>>(
        `place/${placeId}/comments`,
        { json: data }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      // 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({ 
        queryKey: ['placeComments', variables.placeId] 
      });
      // 파크골프장 목록 쿼리 무효화 (댓글 수 업데이트)
      queryClient.invalidateQueries({ queryKey: ['places'] });
      // 특정 파크골프장 쿼리 무효화 (댓글 수 업데이트)
      queryClient.invalidateQueries({ 
        queryKey: ['place', variables.placeId] 
      });
    },
  });
} 