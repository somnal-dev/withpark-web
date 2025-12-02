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
    onSuccess: (_data, variables) => {
      // 삭제된 게시물의 상세 쿼리는 캐시에서 제거
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.POST.detail(variables.postDocumentId),
      });

      // 게시물 목록 쿼리만 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST.lists(),
      });
    },
    onError: (error) => {
      console.error("게시글 삭제 실패:", error);
    },
  });
};

export default useDeletePostMutation;
