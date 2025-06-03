import styled from '@emotion/styled';

const SectionContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const CTASection = styled.section`
    padding: 5rem 2rem;
    background: linear-gradient(135deg, #2D5016 0%, #4A7C59 100%);
    text-align: center;
    color: white;
`;

const CTATitle = styled.h2`
    font-size: 2.5rem;
    margin-bottom: 1rem;
`;

const CTADescription = styled.p`
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
`;

export default {
    SectionContainer,
    CTASection,
    CTATitle,
    CTADescription,
}