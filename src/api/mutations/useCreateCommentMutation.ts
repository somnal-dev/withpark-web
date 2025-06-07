import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { ApiResponse, Comment, CreateCommentRequest } from "../../types/community";

interface CreateCommentParams {
  postId: number;
  data: CreateCommentRequest;
}

export default function useCreateCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, data }: CreateCommentParams) => {
      const response = await Fetcher.post<ApiResponse<Comment>>(
        `community/comments/${postId}`,
        { json: data }
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      // 댓글 목록과 게시글 목록을 무효화하여 댓글 수 업데이트
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
    },
  });
} 