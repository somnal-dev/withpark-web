import ky from "ky";
import {useMutation} from "@tanstack/react-query";

interface PostKakaoTokenRequest {
    code: string;
}

interface PostKakaoTokenResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;

    id_token: string;
    scope: string;
    token_type: string;
}

const postKakaoToken = ({ code }: PostKakaoTokenRequest) => {
    const body = new URLSearchParams();

    body.set('grant_type', 'authorization_code');
    body.set('client_id', import.meta.env.VITE_KAKAO_REST_API_KEY ?? '');
    body.set('redirect_uri', `${window.location.origin}/oauth/kakao`);
    body.set('code', code);

    // 카카오 OAuth Token 획득
    return ky.post('https://kauth.kakao.com/oauth/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: body,
            retry: 0,
        })
        .json<PostKakaoTokenResponse>();
}

const useKakaoTokenMutation = () =>
    useMutation({
        mutationFn: ({ code }: PostKakaoTokenRequest) =>
            postKakaoToken({ code }),
        retry: false,
    });

export default useKakaoTokenMutation;