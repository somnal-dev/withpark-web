import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { LikeResponse } from "../../types/community";
import type { ApiResponse } from "../../types/common";

export default function useToggleLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: number) => {
      const response = await Fetcher.post<ApiResponse<LikeResponse>>(
        `posts/${postId}/like`,
        { json: {} }
      );
      return response.data;
    },
    onSuccess: () => {
      // 게시글 목록과 개별 게시글 쿼리를 무효화하여 좋아요 수 업데이트
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });
}
