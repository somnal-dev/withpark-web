import styled from '@emotion/styled';

interface SelectProps {
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  error?: boolean;
}

const Container = styled.div<{ fullWidth?: boolean }>`
  display: inline-block;
  position: relative;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const SelectElement = styled.select<SelectProps>`
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  padding: ${props => {
    if (props.size === 'small') {
      return '6px 24px 6px 8px';
    } else if (props.size === 'large') {
      return '12px 32px 12px 12px';
    } else {
      return '8px 28px 8px 12px';
    }
  }};
  font-size: ${props => {
    if (props.size === 'small') {
      return '12px';
    } else if (props.size === 'large') {
      return '16px';
    } else {
      return '14px';
    }
  }};
  border: 1px solid ${props => props.error ? '#e53e3e' : '#e2e8f0'};
  border-radius: 6px;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right ${props => {
    if (props.size === 'small') {
      return '6px';
    } else if (props.size === 'large') {
      return '12px';
    } else {
      return '8px';
    }
  }} center;
  background-repeat: no-repeat;
  background-size: 16px 16px;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.error ? '#c53030' : '#cbd5e0'};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#e53e3e' : '#4A7C59'};
    box-shadow: 0 0 0 3px ${props => props.error ? 'rgba(229, 62, 62, 0.1)' : 'rgba(74, 124, 89, 0.1)'};
  }

  &:disabled {
    background-color: #f7fafc;
    border-color: #e2e8f0;
    color: #a0aec0;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: ${props => {
      if (props.size === 'small') {
        return '12px';
      } else if (props.size === 'large') {
        return '16px';
      } else {
        return '14px';
      }
    }};
  }
`;

const Label = styled.label<{ required?: boolean; size?: 'small' | 'medium' | 'large' }>`
  display: block;
  font-size: ${props => {
    switch (props.size) {
      case 'small':
        return '12px';
      case 'large':
        return '16px';
      default:
        return '14px';
    }
  }};
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 4px;

  ${props => props.required && `
    &::after {
      content: ' *';
      color: #e53e3e;
    }
  `}
`;

const ErrorMessage = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  margin-top: 4px;
  font-size: ${props => {
    switch (props.size) {
      case 'small':
        return '11px';
      case 'large':
        return '14px';
      default:
        return '12px';
    }
  }};
  color: #e53e3e;
`;

const HelpText = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  margin-top: 4px;
  font-size: ${props => {
    switch (props.size) {
      case 'small':
        return '11px';
      case 'large':
        return '14px';
      default:
        return '12px';
    }
  }};
  color: #718096;
`;

export default {
  Container,
  SelectElement,
  Label,
  ErrorMessage,
  HelpText,
}; 