import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";

interface DeleteCommentParams {
  commentDocumentId: string;
}

const deleteComment = async ({ commentDocumentId }: DeleteCommentParams) => {
  return Fetcher.delete<any>(`comments/${commentDocumentId}`);
};

const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENTS.all,
      });
    },
    onError: (error) => {
      console.error("댓글 삭제 실패:", error);
    },
  });
};

export default useDeleteCommentMutation;
