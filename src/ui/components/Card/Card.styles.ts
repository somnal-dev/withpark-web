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

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    gap: 1rem;
    
    @media (max-width: 768px) {
        margin-bottom: 0.75rem;
        gap: 0.75rem;
    }
    
    @media (max-width: 480px) {
        margin-bottom: 0.5rem;
        gap: 0.5rem;
        flex-direction: column;
        align-items: flex-start;
    }
`;

const CardTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    
    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
    
    @media (max-width: 480px) {
        font-size: 1.125rem;
    }
`;

const CardTitleAction = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
    
    @media (max-width: 480px) {
        width: 100%;
        justify-content: flex-end;
    }
`;

export default {
    Card,
    CardHeader,
    CardTitle,
    CardTitleAction
}