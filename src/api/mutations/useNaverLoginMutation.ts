import ky from "ky";
import {API_URL} from "@withpark/constants/config.ts";
import {useMutation} from "@tanstack/react-query";

interface PostNaverLoginRequest {
    social_type: string;
    code: string;
}

interface PostNaverLoginResponse {
    accessToken: string;
    refreshToken: string;
    isOnboardingDone: boolean;
}

const postNaverLogin = ({social_type, code}: PostNaverLoginRequest) =>
    ky.post(`${API_URL}/auth?action=login`, {
        json: {
            social_type,
            code
        },
    })
    .json<PostNaverLoginResponse>();

const useNaverLoginMutation = () =>
    useMutation({
        mutationFn: ({social_type, code}: PostNaverLoginRequest) =>
            postNaverLogin({social_type, code})
    });

export default useNaverLoginMutation;