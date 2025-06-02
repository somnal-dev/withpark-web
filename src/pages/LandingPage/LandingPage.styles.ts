import styled from '@emotion/styled';

// 전체 컨테이너
export const Container = styled.div`
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
`;

// 헤더
export const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 1rem 2rem;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
`;

export const Nav = styled.nav`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Logo = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    color: #2D5016;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: '⛳';
        font-size: 1.5rem;
    }
`;

export const NavMenu = styled.ul`
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
`;

export const NavItem = styled.li`
    a {
        text-decoration: none;
        color: #333;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
            color: #4A7C59;
        }
    }
`;

export const AuthButtons = styled.div`
    display: flex;
    gap: 1rem;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 25px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #4A7C59 0%, #2D5016 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(74, 124, 89, 0.3);
    }
  ` : `
    background: transparent;
    color: #4A7C59;
    border: 2px solid #4A7C59;
    
    &:hover {
      background: #4A7C59;
      color: white;
    }
  `}
`;

// 히어로 섹션
export const HeroSection = styled.section`
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fffe 0%, #e8f5e8 100%);
    display: flex;
    align-items: center;
    padding: 0 2rem;
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

export const HeroContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        text-align: center;
    }
`;

export const HeroText = styled.div`
    z-index: 2;
`;

export const HeroTitle = styled.h1`
    font-size: 3.5rem;
    font-weight: bold;
    color: #2D5016;
    margin-bottom: 1.5rem;
    line-height: 1.2;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

export const HeroSubtitle = styled.p`
    font-size: 1.3rem;
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
`;

export const HeroButtons = styled.div`
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
        justify-content: center;
        flex-wrap: wrap;
    }
`;

export const HeroImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12rem;
    opacity: 0.8;
`;

// 특징 섹션
export const FeaturesSection = styled.section`
    padding: 5rem 2rem;
    background: white;
`;

export const SectionContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

export const SectionTitle = styled.h2`
    font-size: 2.5rem;
    text-align: center;
    color: #2D5016;
    margin-bottom: 3rem;
`;

export const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
`;

export const FeatureCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-10px);
    }
`;

export const FeatureIcon = styled.div`
    font-size: 3rem;
    margin-bottom: 1rem;
`;

export const FeatureTitle = styled.h3`
    font-size: 1.3rem;
    color: #2D5016;
    margin-bottom: 1rem;
`;

export const FeatureDescription = styled.p`
    color: #666;
    line-height: 1.6;
`;

// 커뮤니티 섹션
export const CommunitySection = styled.section`
    padding: 5rem 2rem;
    background: linear-gradient(135deg, #f0f9f0 0%, #e0f2e0 100%);
`;

export const CommunityContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const CommunityText = styled.div``;

export const CommunityTitle = styled.h2`
    font-size: 2.5rem;
    color: #2D5016;
    margin-bottom: 1.5rem;
`;

export const CommunityDescription = styled.p`
    font-size: 1.1rem;
    color: #666;
    line-height: 1.7;
    margin-bottom: 2rem;
`;

export const CommunityStats = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;

export const StatCard = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

export const StatNumber = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: #4A7C59;
    margin-bottom: 0.5rem;
`;

export const StatLabel = styled.div`
    color: #666;
    font-size: 0.9rem;
`;

// CTA 섹션
export const CTASection = styled.section`
    padding: 5rem 2rem;
    background: linear-gradient(135deg, #2D5016 0%, #4A7C59 100%);
    text-align: center;
    color: white;
`;

export const CTATitle = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 1rem;
`;

export const CTADescription = styled.p`
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
`;

// 푸터
export const Footer = styled.footer`
    background: #1a1a1a;
    color: white;
    padding: 3rem 2rem 2rem;
`;

export const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
`;

export const FooterSection = styled.div`
    h3 {
        color: #4A7C59;
        margin-bottom: 1rem;
    }

    p, a {
        color: #ccc;
        text-decoration: none;
        line-height: 1.6;

        &:hover {
            color: white;
        }
    }
`;

export const FooterBottom = styled.div`
    border-top: 1px solid #333;
    margin-top: 2rem;
    padding-top: 2rem;
    text-align: center;
    color: #666;
`; 