import React from 'react';
import Styled from './LoadingBar.styles';

export interface LoadingBarProps {
  /** 로딩바 타입 */
  type?: 'spinner' | 'dots' | 'bar';
  /** 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 로딩 메시지 */
  message?: string;
  /** 전체 화면 오버레이 표시 여부 */
  fullScreen?: boolean;
  /** 커스텀 색상 */
  color?: string;
  /** 테스트 아이디 */
  testId?: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({
  type = 'spinner',
  size = 'medium',
  message,
  fullScreen = false,
  color,
  testId = 'loading-bar'
}) => {
  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return <Styled.Spinner size={size} style={color ? { borderTopColor: color } : {}} />;
      
      case 'dots':
        return (
          <Styled.DotsContainer>
            <Styled.Dot size={size} delay={0} style={color ? { backgroundColor: color } : {}} />
            <Styled.Dot size={size} delay={0.2} style={color ? { backgroundColor: color } : {}} />
            <Styled.Dot size={size} delay={0.4} style={color ? { backgroundColor: color } : {}} />
          </Styled.DotsContainer>
        );
      
      case 'bar':
        return (
          <Styled.BarContainer size={size}>
            <Styled.Bar style={color ? { backgroundColor: color } : {}} />
          </Styled.BarContainer>
        );
      
      default:
        return <Styled.Spinner size={size} />;
    }
  };

  return (
    <Styled.Container 
      size={size} 
      fullScreen={fullScreen}
      data-testid={testId}
    >
      {renderLoader()}
      {message && <Styled.Message size={size}>{message}</Styled.Message>}
    </Styled.Container>
  );
};

export default LoadingBar; 