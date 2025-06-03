import styled from '@emotion/styled';

export type ButtonProps = {
    variant?: 'primary' | 'secondary';
}

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
    padding: 0.7rem 1.5rem;
    border: none;
    border-radius: 25px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, #4A7C59 0%, #2D5016 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(74, 124, 89, 0.3);
    }
  ` : `
    background: transparent;
    color: #4A7C59;
    border: 2px solid #4A7C59;
    
    &:hover {
      background: #4A7C59;
      color: white;
    }
  `}
`;

export default {
    Button
}