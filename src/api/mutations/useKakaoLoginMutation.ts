import ky from "ky";
import {API_URL} from "@withpark/constants/config.ts";
import {useMutation} from "@tanstack/react-query";

interface PostKakaoLoginRequest {
    social_type: string;
    accessToken: string;
}

interface PostKakaoLoginResponse {
    accessToken: string;
    refreshToken: string;
    isOnboardingDone: boolean;
}

const postKakaoLogin = ({
    social_type,
    accessToken
}: PostKakaoLoginRequest) =>
    ky.post(`${API_URL}/auth?action=login`, {
        json: {
            social_type,
            accessToken
        },
    })
    .json<PostKakaoLoginResponse>();

const useKakaoLoginMutation = () =>
    useMutation({
        mutationFn: ({social_type, accessToken}: PostKakaoLoginRequest) =>
            postKakaoLogin({social_type, accessToken})
    });

export default useKakaoLoginMutation;