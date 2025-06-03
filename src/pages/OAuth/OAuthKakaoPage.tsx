import {useCallback, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {PATH} from "@withpark/constants/routes.ts";
import useKakaoTokenMutation from "@withpark/api/mutations/useKakaoTokenMutation.ts";
import useKakaoLoginMutation from "@withpark/api/mutations/useKakaoLoginMutation.ts";
import useAuthAtom from "../../hooks/useAuthAtom.ts";

const OAuthKakaoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { setToken } = useAuthAtom();
    const kakaoTokenMutation = useKakaoTokenMutation();
    const kakaoLoginMutation = useKakaoLoginMutation();

    const kakaoLogin = useCallback(async () => {
        const code = new URLSearchParams(location.search).get('code');

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

        console.log(accessToken, refreshToken, signUpRequired)

        if(signUpRequired) {
            // TODO 회원가입 시키기
        }

        setToken(accessToken, refreshToken);
        navigate(PATH.INDEX, { replace: true });
    }, []);

    useEffect(() => {
        kakaoLogin();
    }, []);

    return (
        <>
        </>
    );
}

export default OAuthKakaoPage;