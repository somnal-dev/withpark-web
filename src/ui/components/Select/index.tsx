import React from 'react';
import Styled from './Select.styles';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** 옵션 목록 */
  options: SelectOption[];
  /** 현재 선택된 값 */
  value?: string | number;
  /** 기본 선택 값 */
  defaultValue?: string | number;
  /** 변경 이벤트 핸들러 */
  onChange?: (value: string | number, option: SelectOption) => void;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 라벨 */
  label?: string;
  /** 필수 여부 */
  required?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 에러 여부 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 도움말 텍스트 */
  helpText?: string;
  /** 커스텀 스타일 */
  style?: React.CSSProperties;
  /** 클래스명 */
  className?: string;
  /** 테스트 아이디 */
  testId?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  label,
  required = false,
  disabled = false,
  size = 'medium',
  fullWidth = false,
  error = false,
  errorMessage,
  helpText,
  style,
  className,
  testId = 'select',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(option => option.value.toString() === selectedValue);
    
    if (onChange && selectedOption) {
      onChange(selectedOption.value, selectedOption);
    }
  };

  return (
    <Styled.Container fullWidth={fullWidth} className={className} style={style}>
      {label && (
        <Styled.Label htmlFor={testId} required={required} size={size}>
          {label}
        </Styled.Label>
      )}
      
      <Styled.SelectElement
        id={testId}
        data-testid={testId}
        value={value?.toString() || ''}
        defaultValue={defaultValue?.toString()}
        onChange={handleChange}
        disabled={disabled}
        fullWidth={fullWidth}
        error={error}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value.toString()}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </Styled.SelectElement>

      {error && errorMessage && (
        <Styled.ErrorMessage size={size}>
          {errorMessage}
        </Styled.ErrorMessage>
      )}

      {!error && helpText && (
        <Styled.HelpText size={size}>
          {helpText}
        </Styled.HelpText>
      )}
    </Styled.Container>
  );
};

export default Select; 