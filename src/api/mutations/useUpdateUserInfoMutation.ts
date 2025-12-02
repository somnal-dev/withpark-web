import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetcher } from "@withpark/api/fetcher.ts";
import { QUERY_KEYS } from "@withpark/constants/queryKeys.ts";
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
    onSuccess: async (_data, variables) => {
      // 특정 사용자 정보 쿼리 무효화
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER.detail(variables.userId),
      });
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER.detail("me"),
      });
      // 모든 사용자 관련 쿼리 무효화
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER.all,
      });
    },
  });
};

export default useUpdateUserInfoMutation;
