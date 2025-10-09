import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher.ts";
import { QUERY_KEYS } from "@withpark/constants/queryKeys";

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
        queryKey: QUERY_KEYS.USER.all,
      });
    },
  });
};

export default useDeleteUserMutation;
