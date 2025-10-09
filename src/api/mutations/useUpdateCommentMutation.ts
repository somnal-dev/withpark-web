import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";
import type { UpdateCommentRequest } from "@withpark/types/post";

interface UpdateCommentParams {
  commentDocumentId: string;
  content: string;
}

const updateComment = async ({
  commentDocumentId,
  content,
}: UpdateCommentParams) => {
  const requestBody: UpdateCommentRequest = {
    data: {
      content,
    },
  };

  return Fetcher.put<any>(`comments/${commentDocumentId}`, {
    json: requestBody,
  });
};

const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENT.all,
      });
    },
    onError: (error) => {
      console.error("댓글 수정 실패:", error);
    },
  });
};

export default useUpdateCommentMutation;
