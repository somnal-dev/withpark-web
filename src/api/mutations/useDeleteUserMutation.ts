import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher.ts";
import { QUERY_KEY } from "@withpark/constants/queryKeys.ts";

interface DeleteUserRequest {
  userId: number;
}

const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: DeleteUserRequest) =>
      Fetcher.delete(`users/${userId}`, {
        json: {},
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER],
      });
    },
  });
};

export default useDeleteUserMutation;
