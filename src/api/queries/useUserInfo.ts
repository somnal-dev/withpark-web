import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {QUERY_KEY} from "@withpark/constants/queryKeys.ts";
import {Fetcher} from "@withpark/api/fetcher.ts";
import {LOCAL_STORAGE} from "@withpark/constants/storages.ts";
import useLocalStorage from "../../hooks/useLocalStorage.ts";

interface UserInfoResponse {
    id: string,
    nickname: string,
    photo: string,
    userCode: string,
    introduction: string,
}

const useUserInfo = (): UseQueryResult<UserInfoResponse> => {
    const localStorage = useLocalStorage();
    const accessToken = localStorage.get(LOCAL_STORAGE.ACCESS_TOKEN);

    return useQuery({
        enabled: !!accessToken,
        queryKey: [QUERY_KEY.USER],
        queryFn: async () =>
            await Fetcher.get<UserInfoResponse>(`user/me`)
    })
}


export default useUserInfo;