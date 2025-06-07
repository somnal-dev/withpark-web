import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

// 타입 정의
interface SizeProps {
  size?: 'small' | 'medium' | 'large';
}

interface ContainerProps extends SizeProps {
  fullScreen?: boolean;
}

interface DotProps extends SizeProps {
  delay?: number;
}

// 스피너 회전 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 점들이 순차적으로 커지는 애니메이션
const bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
    opacity: 0.5;
  }
  40% { 
    transform: scale(1);
    opacity: 1;
  }
`;

// 바가 좌우로 움직이는 애니메이션
const slide = keyframes`
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props: ContainerProps) => props.fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
  `}
  ${(props: ContainerProps) => !props.fullScreen && `
    padding: 20px;
  `}
`;

// 1. 스피너 로딩
const Spinner = styled.div<SizeProps>`
  width: ${(props: SizeProps) => 
    props.size === 'small' ? '16px' : 
    props.size === 'large' ? '40px' : '24px'
  };
  height: ${(props: SizeProps) => 
    props.size === 'small' ? '16px' : 
    props.size === 'large' ? '40px' : '24px'
  };
  border: 2px solid #f3f3f3;
  border-top: 2px solid #4A7C59;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// 2. 점 3개 로딩
const DotsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Dot = styled.div<DotProps>`
  width: ${(props: DotProps) => 
    props.size === 'small' ? '6px' : 
    props.size === 'large' ? '12px' : '8px'
  };
  height: ${(props: DotProps) => 
    props.size === 'small' ? '6px' : 
    props.size === 'large' ? '12px' : '8px'
  };
  background-color: #4A7C59;
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out;
  animation-delay: ${(props: DotProps) => props.delay || 0}s;
`;

// 3. 바 로딩
const BarContainer = styled.div<SizeProps>`
  width: ${(props: SizeProps) => 
    props.size === 'small' ? '60px' : 
    props.size === 'large' ? '120px' : '80px'
  };
  height: ${(props: SizeProps) => 
    props.size === 'small' ? '3px' : 
    props.size === 'large' ? '6px' : '4px'
  };
  background-color: #f3f3f3;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`;

const Bar = styled.div`
  width: 40%;
  height: 100%;
  background: linear-gradient(135deg, #4A7C59 0%, #2D5016 100%);
  border-radius: 2px;
  position: absolute;
  animation: ${slide} 2s infinite ease-in-out;
`;

// 텍스트 메시지
const Message = styled.div<SizeProps>`
  margin-left: 12px;
  color: #666;
  font-size: ${(props: SizeProps) => 
    props.size === 'small' ? '12px' : 
    props.size === 'large' ? '16px' : '14px'
  };
`;

export default {
  Container,
  Spinner,
  DotsContainer,
  Dot,
  BarContainer,
  Bar,
  Message,
}; 