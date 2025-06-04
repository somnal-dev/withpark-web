import styled from "@emotion/styled";
import {motion} from "framer-motion";

const Card = styled(motion.div)<{
    padding?: string | number;
}>`
    background: white;
    border-radius: 12px;
    padding: ${props => props.padding || '1.5rem'};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    
    @media (max-width: 768px) {
        padding: ${props => props.padding || '1rem'};
        border-radius: 8px;
    }
    
    @media (max-width: 480px) {
        padding: ${props => props.padding || '0.75rem'};
    }
`;

const CardTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    @media (max-width: 768px) {
        font-size: 1.25rem;
        margin-bottom: 0.75rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.125rem;
        margin-bottom: 0.5rem;
    }
`;

export default {
    Card,
    CardTitle
}