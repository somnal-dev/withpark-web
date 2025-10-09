import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";

interface UpdatePlaceCommentParams {
  commentId: number;
  content: string;
}

const updatePlaceComment = async ({
  commentId,
  content,
}: UpdatePlaceCommentParams) => {
  return Fetcher.put<any>(`place-comments/${commentId}`, {
    json: {
      data: {
        content,
      },
    },
  });
};

const useUpdatePlaceCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlaceComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PLACE_COMMENT.all,
      });
    },
    onError: (error) => {
      console.error("장소 댓글 수정 실패:", error);
    },
  });
};

export default useUpdatePlaceCommentMutation;
