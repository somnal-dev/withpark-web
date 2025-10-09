import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";
import type { UpdatePostRequest } from "@withpark/types/post";

interface UpdatePostParams {
  postDocumentId: string;
  title: string;
  content: string;
  images?: number[];
}

const updatePost = async ({
  postDocumentId,
  title,
  content,
  images,
}: UpdatePostParams) => {
  const requestBody: UpdatePostRequest = {
    data: {
      title,
      content,
      images,
    },
  };

  return Fetcher.put<any>(`posts/${postDocumentId}`, {
    json: requestBody,
  });
};

const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
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

export default useUpdatePostMutation;
