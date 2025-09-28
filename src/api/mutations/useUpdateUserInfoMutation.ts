import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher.ts";
import { QUERY_KEY } from "@withpark/constants/queryKeys.ts";
import type { UpdateUserRequest, User } from "@withpark/types/user";
import type { ApiResponse } from "@withpark/types/common";

interface UpdateUserInfoParams {
  userId: number;
  data: UpdateUserRequest;
}

const useUpdateUserInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: UpdateUserInfoParams) =>
      Fetcher.put<ApiResponse<User>>(`users/${userId}`, {
        json: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER],
      });
    },
  });
};

export default useUpdateUserInfoMutation;
