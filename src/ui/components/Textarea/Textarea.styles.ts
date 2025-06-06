import styled from '@emotion/styled';

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 80px;
  resize: vertical;
  transition: all 0.2s ease;
  font-family: inherit;
  
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
    Textarea
}; 