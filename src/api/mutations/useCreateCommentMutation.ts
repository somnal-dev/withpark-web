import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "../fetcher";
import type { CreateCommentRequest } from "../../types/post";
import { DataResponse } from "@withpark/types/common";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";

interface CreateCommentParams {
  userId: number;
  postDocumentId: string;
  content: string;
}

export default function useCreateCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      postDocumentId,
      content,
    }: CreateCommentParams) => {
      const requestData: CreateCommentRequest = {
        data: {
          content,
          user: userId,
          post: postDocumentId,
        },
      };

      const response = await Fetcher.post<DataResponse<any>>(`comments`, {
        json: requestData,
      });

      return response.data;
    },
    onSuccess: (response) => {
      // 댓글 목록과 게시글 목록을 무효화하여 댓글 수 업데이트
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMMENT.all });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST.detail(response["data"]?.documentId ?? ""),
      });
    },
  });
}
