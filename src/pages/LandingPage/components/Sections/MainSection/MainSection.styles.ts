// 히어로 섹션
import styled from "@emotion/styled";

const MainSection = styled.section`
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

export const MainContent = styled.div`
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

const MainText = styled.div`
    z-index: 2;
`;

const MainTitle = styled.h1`
    font-size: 3.5rem;
    font-weight: bold;
    color: #2D5016;
    margin-bottom: 1.5rem;
    line-height: 1.2;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const MainSubtitle = styled.p`
    font-size: 1.3rem;
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
`;

const MainButtons = styled.div`
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
        justify-content: center;
        flex-wrap: wrap;
    }
`;

const MainImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12rem;
    opacity: 0.8;
`;

export default {
    MainSection,
    MainContent,
    MainText,
    MainTitle,
    MainSubtitle,
    MainButtons,
    MainImage,
}