import styled from '@emotion/styled';

// 전체 로그인 컨테이너
export const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 40%;
    height: 200%;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="%234A7C59" opacity="0.1"/></svg>') repeat;
    animation: float 20s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
    }
  }
`;

// 로그인 카드
export const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-width: 420px;
  width: 100%;
  margin: 2rem;
  text-align: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: 480px) {
    margin: 1rem;
    padding: 2rem;
    border-radius: 16px;
  }
`;

// 로고 영역
export const LogoSection = styled.div`
  margin-bottom: 2.5rem;
`;

export const Logo = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #2D5016;
  margin-bottom: 0.5rem;
  
  &::before {
    content: '⛳';
    font-size: 2.5rem;
    margin-right: 0.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
    
    &::before {
      font-size: 2rem;
    }
  }
`;

export const LogoSubtext = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
`;

// 환영 메시지
export const WelcomeSection = styled.div`
  margin-bottom: 3rem;
`;

export const WelcomeTitle = styled.h1`
  font-size: 1.8rem;
  color: #2D5016;
  margin-bottom: 0.8rem;
  font-weight: bold;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const WelcomeDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;

// 소셜 로그인 버튼들
export const SocialButtonsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SocialButton = styled.button<{ provider: 'kakao' | 'google' }>`
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  
  ${props => props.provider === 'kakao' ? `
    background: #FEE500;
    color: #000000;
    
    &:hover {
      background: #F9D71C;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(254, 229, 0, 0.3);
    }
  ` : `
    background: white;
    color: #333;
    border: 2px solid #e0e0e0;
    
    &:hover {
      background: #f8f9fa;
      border-color: #d0d0d0;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
  `}
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 480px) {
    padding: 0.875rem 1.25rem;
  }
`;

export const SocialIcon = styled.span<{ provider: 'kakao' | 'google' }>`
  font-size: 1.2rem;
  
  ${props => props.provider === 'kakao' ? `
    &::before {
      content: '💬';
    }
  ` : `
    &::before {
      content: '🌐';
    }
  `}
`;

// 하단 정보
export const LoginFooter = styled.div`
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #e8e8e8;
`;

export const FooterText = styled.p`
  color: #999;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;

export const FooterLink = styled.a`
  color: #4A7C59;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

// 로딩 상태
export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`; 