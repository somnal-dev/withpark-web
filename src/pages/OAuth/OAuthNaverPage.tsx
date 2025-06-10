import {useCallback, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {PATH} from "@withpark/constants/routes.ts";
import useAuthAtom from "../../hooks/useAuthAtom.ts";
import useNaverLoginMutation from "@withpark/api/mutations/useNaverLoginMutation.ts";
import {SocialLoginType} from "@withpark/types/login.ts";

const OAuthNaverPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { setToken } = useAuthAtom();
    const naverLoginMutation = useNaverLoginMutation();

    const naverLogin = useCallback(async () => {
        const code = new URLSearchParams(location.search).get('code');

        // 코드가 없으면 홈으로 다시 이동
        if (!code) {
            navigate(PATH.INTRO, {replace: true});
            return;
        }

        // 획득한 코드로 로그인
        const { accessToken, refreshToken, isOnboardingDone } =
            await naverLoginMutation.mutateAsync({
                social_type: SocialLoginType.NAVER,
                code: code
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
        naverLogin();
    }, []);

    return (
        <>
        </>
    );
}

export default OAuthNaverPage;