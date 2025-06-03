import styled from '@emotion/styled';

const FeatureSection = styled.section`
    padding: 5rem 2rem;
    background: white;
`;

const SectionContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const SectionTitle = styled.h2`
    font-size: 2.5rem;
    text-align: center;
    color: #2D5016;
    margin-bottom: 3rem;
`;

const FeatureGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
`;

const FeatureCard = styled.div`
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

const FeatureIcon = styled.div`
    font-size: 3rem;
    margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
    font-size: 1.3rem;
    color: #2D5016;
    margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
    color: #666;
    line-height: 1.6;
`; 

export default {
    FeatureSection,
    SectionContainer,
    SectionTitle,
    FeatureGrid,
    FeatureCard,
    FeatureIcon,
    FeatureTitle,
    FeatureDescription,
}