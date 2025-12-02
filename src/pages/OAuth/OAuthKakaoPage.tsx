import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@withpark/constants/routes.ts";
import useAuthAtom from "../../hooks/useAuthAtom.ts";
import { SocialLoginType } from "@withpark/types/login.ts";
import useLoginMutation from "@withpark/api/mutations/useLoginMutation.ts";

const OAuthKakaoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setToken } = useAuthAtom();
  const loginMuatation = useLoginMutation();

  const kakaoLogin = useCallback(async () => {
    const accessToken = new URLSearchParams(location.search).get(
      "access_token"
    );

    // 코드가 없으면 홈으로 다시 이동
    if (!accessToken) {
      navigate(PATH.INTRO, { replace: true });
      return;
    }

    // 획득한 코드로 로그인
    const { accessToken: newAccessToken, refreshToken, user } = await loginMuatation.mutateAsync({
      socialType: SocialLoginType.KAKAO,
      accessToken: accessToken,
    });

    setToken(newAccessToken, refreshToken);
    // 온보딩 필요여부 판단
    if (user.onboardingDone) {
      navigate(PATH.INDEX, { replace: true });
    } else {
      navigate(PATH.ONBOARDING, { replace: true });
    }
  }, []);

  useEffect(() => {
    kakaoLogin();
  }, []);

  return <></>;
};

export default OAuthKakaoPage;
