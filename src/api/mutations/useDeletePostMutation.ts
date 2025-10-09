import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";

interface DeletePostParams {
  postDocumentId: string;
}

const deletePost = async ({ postDocumentId }: DeletePostParams) => {
  return Fetcher.delete<any>(`posts/${postDocumentId}`);
};

const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST.all,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST.all,
      });
    },
    onError: (error) => {
      console.error("게시글 삭제 실패:", error);
    },
  });
};

export default useDeletePostMutation;
