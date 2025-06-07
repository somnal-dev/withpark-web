import React from 'react';
import Styled from './IconButton.styles';

export interface IconButtonProps {
  /** 아이콘 (ReactNode로 SVG, emoji 등 모든 형태 지원) */
  icon?: React.ReactNode;
  /** 버튼 텍스트 */
  children?: React.ReactNode;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void | Promise<void>;
  /** 활성 상태 (좋아요 눌림, 선택됨 등) */
  active?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 읽기 전용 (클릭 불가) */
  readonly?: boolean;
  /** 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 버튼 변형 */
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  /** 커스텀 스타일 */
  style?: React.CSSProperties;
  /** 클래스명 */
  className?: string;
  /** 테스트 아이디 */
  testId?: string;
  /** 타입 (button, submit 등) */
  type?: 'button' | 'submit' | 'reset';
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  onClick,
  active = false,
  loading = false,
  disabled = false,
  readonly = false,
  size = 'medium',
  variant = 'default',
  style,
  className,
  testId = 'icon-button',
  type = 'button',
}) => {
  const handleClick = async () => {
    if (disabled || loading || readonly || !onClick) return;
    
    try {
      await onClick();
    } catch (error) {
      console.error('IconButton 클릭 에러:', error);
    }
  };

  return (
    <Styled.IconButton
      type={type}
      onClick={readonly ? undefined : handleClick}
      disabled={disabled || loading}
      active={active}
      size={size}
      variant={variant}
      readonly={readonly}
      style={{
        cursor: readonly ? 'default' : style?.cursor,
        ...style
      }}
      className={className}
      data-testid={testId}
    >
      {icon}
      {children && (
        <Styled.Text>
          {loading ? '...' : children}
        </Styled.Text>
      )}
    </Styled.IconButton>
  );
};

export default IconButton; 