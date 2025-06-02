import { useState } from 'react';
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
  SocialIcon,
  LoginFooter,
  FooterText,
  FooterLink,
  LoadingSpinner,
} from './LoginPage.styles';

const LoginPage = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleKakaoLogin = async () => {
    setLoading('kakao');
    try {
      // 카카오 로그인 로직 구현
      console.log('카카오 로그인 시작');

      // TODO: react-kakao-login 또는 Kakao SDK를 사용한 로그인 구현
      // 예시:
      // const result = await kakaoLogin();
      // if (result.success) {
      //   // 로그인 성공 처리
      //   router.push('/home');
      // }

      // 임시 딜레이 (실제 구현 시 제거)
      setTimeout(() => {
        setLoading(null);
        alert('카카오 로그인 기능을 구현해주세요');
      }, 2000);

    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      setLoading(null);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading('google');
    try {
      // 구글 로그인 로직 구현
      console.log('구글 로그인 시작');

      // TODO: Google OAuth 또는 Google Identity Services 구현
      // 예시:
      // const result = await googleLogin();
      // if (result.success) {
      //   // 로그인 성공 처리
      //   router.push('/home');
      // }

      // 임시 딜레이 (실제 구현 시 제거)
      setTimeout(() => {
        setLoading(null);
        alert('구글 로그인 기능을 구현해주세요');
      }, 2000);

    } catch (error) {
      console.error('구글 로그인 실패:', error);
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
              파크골프 애호가들과 함께하는<br />
              특별한 커뮤니티에 참여하세요
            </WelcomeDescription>
          </WelcomeSection>

          <SocialButtonsSection>
            <SocialButton
              provider="kakao"
              onClick={handleKakaoLogin}
              disabled={loading !== null}
            >
              {loading === 'kakao' ? (
                <LoadingSpinner />
              ) : (
                <>
                  <SocialIcon provider="kakao" />
                  카카오톡으로 로그인
                </>
              )}
            </SocialButton>

            <SocialButton
              provider="google"
              onClick={handleGoogleLogin}
              disabled={loading !== null}
            >
              {loading === 'google' ? (
                <LoadingSpinner />
              ) : (
                <>
                  <SocialIcon provider="google" />
                  구글로 로그인
                </>
              )}
            </SocialButton>
          </SocialButtonsSection>

          <LoginFooter>
            <FooterText>
              로그인하시면 위드파크의{' '}
              <FooterLink href="#" onClick={(e) => e.preventDefault()}>
                이용약관
              </FooterLink>
              과{' '}
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