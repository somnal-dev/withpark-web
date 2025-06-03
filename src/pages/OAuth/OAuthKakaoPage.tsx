import {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {PATH} from "@withpark/constants/routes.ts";
import useKakaoToken from "@withpark/api/mutations/useKakaoToken.ts";
import useKakaoLogin from "@withpark/api/mutations/useKakaoLogin.ts";
import useAuthAtom from "../../hooks/useAuthAtom.ts";

const OAuthKakaoPage = () => {
    const navigate = useNavigate();

    const { setToken } = useAuthAtom();
    const kakaoTokenMutation = useKakaoToken();
    const kakaoLoginMutation = useKakaoLogin() 

    const kakaoLogin = useCallback(async () => {
        const code = new URLSearchParams(window.location.search).get('code');

        // 코드가 없으면 홈으로 다시 이동
        if (!code) {
            navigate(PATH.INDEX, {replace: true});
            return;
        }

        const {access_token: kakaoAccessToken} =
            await kakaoTokenMutation.mutateAsync({ code });

        // 획득한 엑세스토큰으로 로그인
        const { accessToken, refreshToken, signUpRequired } =
            await kakaoLoginMutation.mutateAsync({
                accessToken: kakaoAccessToken
            });

        if(signUpRequired) {
            // TODO 회원가입 시키기
        }

        setToken(accessToken, refreshToken);
        navigate(PATH.INDEX, { replace: true });
    }, []);

    useEffect(() => {
        kakaoLogin();
    }, []);

    return null;
}

export default OAuthKakaoPage;