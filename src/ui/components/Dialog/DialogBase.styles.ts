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

const DialogContainer = styled.div`
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

const DialogHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
`;

const DialogTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #666;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: #f5f5f5;
        color: #333;
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

const DialogContent = styled.div<{ contentPadding?: string; width?: string }>`
    padding: ${({ contentPadding }) => contentPadding || '0'};
    width: ${({ width }) => width || 'auto'};
`;

export default {
    DimmedArea,
    DialogContainer,
    DialogHeader,
    DialogTitle,
    CloseButton,
    DialogContent,
};
