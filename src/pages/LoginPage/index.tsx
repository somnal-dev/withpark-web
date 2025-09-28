import { useState } from "react";
import {
  LoginContainer,
  LoginCard,
  LogoSection,
  Logo,
  LogoSubtext,
  WelcomeSection,
  WelcomeTitle,
  WelcomeDescription,
  SocialButtonsSection,
  SocialButton,
  LoginFooter,
  FooterText,
  FooterLink,
  LoadingSpinner,
} from "./LoginPage.styles";
import { KakaotalkIcon } from "@withpark/assets/icons/KakaoTalkIcon.tsx";
import { NaverIcon } from "@withpark/assets/icons/NaverIcon.tsx";
import { API_URL } from "@withpark/constants/config";

const kakaoLoginUrl = `${API_URL}/connect/kakao`;
const naverLoginUrl = `${API_URL}/connect/naver`;

const LoginPage = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleKakaoLogin = async () => {
    setLoading("kakao");

    try {
      location.href = kakaoLoginUrl;
    } catch (error) {
      console.error("카카오 로그인 실패:", error);
      setLoading(null);
    }
  };

  const handleNaverLogin = async () => {
    setLoading("naver");

    try {
      location.href = naverLoginUrl;
    } catch (error) {
      console.error("네이버 로그인 실패:", error);
      setLoading(null);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LogoSection>
          <Logo>위드파크</Logo>
          <LogoSubtext>파크골프 커뮤니티</LogoSubtext>
        </LogoSection>

        <WelcomeSection>
          <WelcomeTitle>환영합니다!</WelcomeTitle>
          <WelcomeDescription>
            파크골프 애호가들과 함께하는
            <br />
            특별한 커뮤니티에 참여하세요
          </WelcomeDescription>
        </WelcomeSection>

        <SocialButtonsSection>
          <SocialButton
            provider="kakao"
            onClick={handleKakaoLogin}
            disabled={loading !== null}
          >
            {loading === "kakao" ? (
              <LoadingSpinner />
            ) : (
              <>
                <KakaotalkIcon />
                카카오 로그인
              </>
            )}
          </SocialButton>

          <SocialButton
            provider="naver"
            onClick={handleNaverLogin}
            disabled={loading !== null}
          >
            {loading === "naver" ? (
              <LoadingSpinner />
            ) : (
              <>
                <NaverIcon />
                네이버 로그인
              </>
            )}
          </SocialButton>
        </SocialButtonsSection>

        <LoginFooter>
          <FooterText>
            로그인하시면 위드파크의{" "}
            <FooterLink href="#" onClick={(e) => e.preventDefault()}>
              이용약관
            </FooterLink>
            과{" "}
            <FooterLink href="#" onClick={(e) => e.preventDefault()}>
              개인정보처리방침
            </FooterLink>
            에<br />
            동의하는 것으로 간주됩니다.
          </FooterText>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
