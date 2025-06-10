import styled from '@emotion/styled';
import {motion} from "framer-motion";

const DimmedArea = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const AlertContainer = styled.div`
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    min-width: 320px;
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    position: relative;
    
    /* 스크롤바 숨기기 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }
`;

const AlertHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
`;

const AlertTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin: 0;
`;

const AlertContent = styled.div<{ contentPadding?: string; width?: string }>`
    padding: ${({ contentPadding }) => contentPadding || '0'};
    width: ${({ width }) => width || 'auto'};
`;

const AlertButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 20px;
    padding-top: 16px;
`;

const AlertButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
    padding: 0.7rem 1.5rem;
    border-radius: 25px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 80px;
    border: none;

    ${({ variant }) => {
        if (variant === 'primary') {
            return `
                background: linear-gradient(135deg, #4A7C59 0%, #2D5016 100%);
                color: white;
                
                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(74, 124, 89, 0.3);
                }
            `;
        } else {
            return `
                background: transparent;
                color: #4A7C59;
                border: 2px solid #4A7C59;
                
                &:hover {
                    background: #4A7C59;
                    color: white;
                }
            `;
        }
    }}

    &:active {
        transform: translateY(0);
    }

    &:focus {
        outline: 2px solid #4A7C59;
        outline-offset: 2px;
    }
`;

export default {
    DimmedArea,
    AlertContainer,
    AlertHeader,
    AlertTitle,
    AlertContent,
    AlertButtonContainer,
    AlertButton,
};
