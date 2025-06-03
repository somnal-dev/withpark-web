import {useState} from 'react';
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
} from './LoginPage.styles';
import {KakaotalkIcon} from "@withpark/assets/icons/KakaoTalkIcon.tsx";
import {NaverIcon} from "@withpark/assets/icons/NaverIcon.tsx";
import {PATH} from "@withpark/constants/routes.ts";

const kakaoLoginRedirectUri = `${window.location.origin}${PATH.OAUTH_KAKAO}`;

const LoginPage = () => {
    const [loading, setLoading] = useState<string | null>(null);

    const handleKakaoLogin = async () => {
        setLoading('kakao');

        try {

            window.Kakao?.Auth.authorize({
                redirectUri: kakaoLoginRedirectUri
            });

        } catch (error) {
            console.error('카카오 로그인 실패:', error);
            setLoading(null);
        }
    };

    const handleNaverLogin = async () => {
        setLoading('naver');
        try {
            console.log('네이버 로그인 시작');


            // 임시 딜레이 (실제 구현 시 제거)
            setTimeout(() => {
                setLoading(null);
                alert('네이버 로그인 기능을 구현해주세요');
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
                        파크골프 애호가들과 함께하는<br/>
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
                            <LoadingSpinner/>
                        ) : (
                            <>
                                <KakaotalkIcon/>
                                카카오 로그인
                            </>
                        )}
                    </SocialButton>

                    <SocialButton
                        provider="naver"
                        onClick={handleNaverLogin}
                        disabled={loading !== null}
                    >
                        {loading === 'naver' ? (
                            <LoadingSpinner/>
                        ) : (
                            <>
                                <NaverIcon/>
                                네이버 로그인
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
                        에<br/>
                        동의하는 것으로 간주됩니다.
                    </FooterText>
                </LoginFooter>
            </LoginCard>
        </LoginContainer>
    );
};

export default LoginPage; 