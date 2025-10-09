import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";

interface DeletePlaceCommentParams {
  commentId: number;
}

const deletePlaceComment = async ({ commentId }: DeletePlaceCommentParams) => {
  return Fetcher.delete<any>(`place-comments/${commentId}`);
};

const useDeletePlaceCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlaceComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PLACE_COMMENT.all,
      });
    },
    onError: (error) => {
      console.error("장소 댓글 삭제 실패:", error);
    },
  });
};

export default useDeletePlaceCommentMutation;
