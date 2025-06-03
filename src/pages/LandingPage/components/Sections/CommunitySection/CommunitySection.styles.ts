import styled from '@emotion/styled';

// 커뮤니티 섹션
const SectionContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const CommunitySection = styled.section`
    padding: 5rem 2rem;
    background: linear-gradient(135deg, #f0f9f0 0%, #e0f2e0 100%);
`;

const CommunityContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const CommunityText = styled.div``;

const CommunityTitle = styled.h2`
    font-size: 2.5rem;
    color: #2D5016;
    margin-bottom: 1.5rem;
`;

const CommunityDescription = styled.p`
    font-size: 1.1rem;
    color: #666;
    line-height: 1.7;
    margin-bottom: 2rem;
`;

const CommunityStats = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;

const StatCard = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: #4A7C59;
    margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
    color: #666;
    font-size: 0.9rem;
`;

export default {
    SectionContainer,
    CommunitySection,
    CommunityContent,
    CommunityText,
    CommunityTitle,
    CommunityDescription,
    CommunityStats,
    StatCard,
    StatNumber,
    StatLabel,
}