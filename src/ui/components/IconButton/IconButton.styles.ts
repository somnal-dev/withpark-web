import styled from '@emotion/styled';

interface IconButtonProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  active?: boolean;
  readonly?: boolean;
}

const IconButton = styled.button<IconButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: ${props => {
    switch (props.size) {
      case 'small':
        return '4px';
      case 'large':
        return '8px';
      default:
        return '6px';
    }
  }};
  padding: ${props => {
    switch (props.size) {
      case 'small':
        return '4px 8px';
      case 'large':
        return '10px 16px';
      default:
        return '6px 12px';
    }
  }};
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
  border: ${props => {
    if (props.readonly) return 'none';
    switch (props.variant) {
      case 'primary':
        return `1px solid ${props.active ? '#4A7C59' : '#4A7C59'}`;
      case 'secondary':
        return `1px solid ${props.active ? '#ff6b6b' : '#e2e8f0'}`;
      case 'ghost':
        return 'none';
      default:
        return `1px solid ${props.active ? '#4A7C59' : '#e2e8f0'}`;
    }
  }};
  border-radius: 6px;
  background-color: ${props => {
    if (props.readonly) return 'transparent';
    switch (props.variant) {
      case 'primary':
        return props.active ? '#4A7C59' : '#ffffff';
      case 'secondary':
        return props.active ? '#ff6b6b' : '#ffffff';
      case 'ghost':
        return props.active ? 'rgba(74, 124, 89, 0.1)' : 'transparent';
      default:
        return props.active ? '#f7fafc' : '#ffffff';
    }
  }};
  color: ${props => {
    if (props.readonly) return '#333333';
    switch (props.variant) {
      case 'secondary':
        return props.active ? '#ffffff' : '#333333';
      default:
        return '#333333';
    }
  }};
  cursor: ${props => props.readonly ? 'default' : 'pointer'};
  transition: all 0.2s ease;
  border: none;
  
  &:hover {
    background-color: ${props => {
      if (props.readonly) return 'transparent';
      switch (props.variant) {
        case 'primary':
          return props.active ? '#3d6b47' : '#f0f8f4';
        case 'secondary':
          return props.active ? '#ff5252' : '#fff5f5';
        case 'ghost':
          return props.active ? 'rgba(74, 124, 89, 0.2)' : 'rgba(74, 124, 89, 0.1)';
        default:
          return props.active ? '#e2e8f0' : '#f7fafc';
      }
    }};
    transform: ${props => props.readonly ? 'none' : 'scale(1.02)'};
  }

  &:active {
    transform: ${props => props.readonly ? 'none' : 'scale(0.98)'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
    }
  }

  svg {
    width: ${props => {
      switch (props.size) {
        case 'small':
          return '16px';
        case 'large':
          return '24px';
        default:
          return '20px';
      }
    }};
    height: ${props => {
      switch (props.size) {
        case 'small':
          return '16px';
        case 'large':
          return '24px';
        default:
          return '20px';
      }
    }};
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    font-size: ${props => {
      switch (props.size) {
        case 'small':
          return '11px';
        case 'large':
          return '15px';
        default:
          return '13px';
      }
    }};
  }
`;

const Text = styled.span<IconButtonProps>`
  font-weight: inherit;
  white-space: nowrap;
  color: ${props => {
    if (props.readonly) return '#333333';
    switch (props.variant) {
      case 'secondary':
        return props.active ? '#ffffff' : '#333333';
      default:
        return '#333333';
    }
  }};
`;

export default {
  IconButton,
  Text,
}; 