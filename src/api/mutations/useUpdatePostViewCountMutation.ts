import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";
import { UpdatePostRequest } from "@withpark/types/post";

interface UpdatePostRequestParams {
  postDocumentId: string;
  data: UpdatePostRequest;
}

const useUpdatePostViewCountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postDocumentId, data }: UpdatePostRequestParams) =>
      await Fetcher.put<any>(`posts/${postDocumentId}`, {
        json: data,
      }),
    onSuccess: (response) => {
      console.log("성공");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST.all,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST.detail(response["data"]?.documentId ?? ""),
      });
    },
    onError: (error) => {
      console.error("게시글 수정 실패:", error);
    },
  });
};

export default useUpdatePostViewCountMutation;
