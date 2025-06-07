import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Fetcher} from "@withpark/api/fetcher.ts";
import {QUERY_KEY} from "@withpark/constants/queryKeys.ts";

interface UpdateUserInfoRequest {
    nickname?: string;
    photo?: string;
    introduction?: string;
    isOnboardingDone?: boolean;
}

const useUpdateUserInfoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userInfo: UpdateUserInfoRequest) => Fetcher.put('user', {
            json: userInfo
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.USER]
            })
        }
    });
};

export default useUpdateUserInfoMutation;