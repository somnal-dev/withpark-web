import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";

interface UpdatePostViewCountParams {
  postDocumentId: string;
  viewCount: number;
}

const useUpdatePostViewCountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postDocumentId, viewCount }: UpdatePostViewCountParams) =>
      Fetcher.put<any>(`posts/${postDocumentId}`, {
        json: {
          viewCount: viewCount,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST.all,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST.all,
      });
    },
    onError: (error) => {
      console.error("게시글 수정 실패:", error);
    },
  });
};

export default useUpdatePostViewCountMutation;
