import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type {
  PlaceCommentEntity,
  CreatePlaceCommentRequest,
} from "../../types/place";
import type { ApiResponse } from "../../types/common";

interface CreatePlaceCommentParams {
  placeDocumentId: string;
  content: string;
}

export default function useCreatePlaceCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      placeDocumentId,
      content,
    }: CreatePlaceCommentParams) => {
      const requestData: CreatePlaceCommentRequest = {
        data: {
          content,
          place: placeDocumentId,
        },
      };

      const response = await Fetcher.post<ApiResponse<PlaceCommentEntity>>(
        `place-comments`,
        { json: requestData }
      );
      return response.data;
    },
    onSuccess: () => {
      // 댓글 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["placeComments"],
      });
      // 파크골프장 목록 쿼리 무효화 (댓글 수 업데이트)
      queryClient.invalidateQueries({ queryKey: ["places"] });
      // 특정 파크골프장 쿼리 무효화 (댓글 수 업데이트)
      queryClient.invalidateQueries({
        queryKey: ["place"],
      });
    },
  });
}
