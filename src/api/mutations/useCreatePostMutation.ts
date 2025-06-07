import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { ApiResponse, Post, CreatePostRequest } from "../../types/community";

export default function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePostRequest) => {
      const response = await Fetcher.post<ApiResponse<Post>>(
        'community/posts',
        { json: data }
      );
      return response.data;
    },
    onSuccess: () => {
      // 게시글 목록 쿼리를 무효화하여 새로 생성된 게시글을 반영
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
} 