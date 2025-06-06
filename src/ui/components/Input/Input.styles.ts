import styled from '@emotion/styled';

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #4A7C59;
    box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
  }
  
  &:hover {
    border-color: #cbd5e0;
  }
`;

export default {
    Input
}; 