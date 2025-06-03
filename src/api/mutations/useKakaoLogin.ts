import ky from "ky";
import {baseUrl} from "@withpark/api/config.ts";
import {useMutation} from "@tanstack/react-query";

interface PostKakaoLoginRequest {
    accessToken: string;
}

interface PostKakaoLoginResponse {
    accessToken: string;
    refreshToken: string;
    signUpRequired: boolean;
}

const postKakaoLogin = ({accessToken}: PostKakaoLoginRequest) =>
    ky.post(`${baseUrl}/login/kakao`, {
        json: { accessToken },
    })
    .json<PostKakaoLoginResponse>();

const useKakaoLogin = () =>
    useMutation({
        mutationFn: ({accessToken}: PostKakaoLoginRequest) =>
            postKakaoLogin({accessToken})
    });

export default useKakaoLogin;