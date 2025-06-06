import {useCallback, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {PATH} from "@withpark/constants/routes.ts";
import useGetKakaoTokenMutation from "@withpark/api/mutations/useGetKakaoTokenMutation.ts";
import useKakaoLoginMutation from "@withpark/api/mutations/useKakaoLoginMutation.ts";
import useAuthAtom from "../../hooks/useAuthAtom.ts";

const OAuthKakaoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { setToken } = useAuthAtom();
    const kakaoTokenMutation = useGetKakaoTokenMutation();
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
        const { accessToken, refreshToken, isOnboardingDone } =
            await kakaoLoginMutation.mutateAsync({
                accessToken: kakaoAccessToken
            });

        setToken(accessToken, refreshToken);

        // 온보딩 필요여부 판단
        if(!isOnboardingDone) {
            navigate(PATH.ONBOARDING, { replace: true });
        } else {
            navigate(PATH.INDEX, { replace: true });
        }


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