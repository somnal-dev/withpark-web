import ky from "ky";
import {API_URL} from "@withpark/constants/config.ts";
import {useMutation} from "@tanstack/react-query";

interface PostKakaoLoginRequest {
    accessToken: string;
}

interface PostKakaoLoginResponse {
    accessToken: string;
    refreshToken: string;
    isOnboardingDone: boolean;
}

const postKakaoLogin = ({accessToken}: PostKakaoLoginRequest) =>
    ky.post(`${API_URL}/auth?action=login`, {
        json: { accessToken },
    })
    .json<PostKakaoLoginResponse>();

const useKakaoLoginMutation = () =>
    useMutation({
        mutationFn: ({accessToken}: PostKakaoLoginRequest) =>
            postKakaoLogin({accessToken})
    });

export default useKakaoLoginMutation;