import styled from "@emotion/styled";

const SettingContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin: 0 auto 2rem auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToggleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
  background-color: #f7fafc;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #edf2f7;
  }
`;

const ToggleLabel = styled.div`
  flex: 1;
  margin-right: 1rem;
  
  span {
    font-weight: 500;
    color: #2d3748;
    display: block;
    margin-bottom: 0.25rem;
  }
`;

const ToggleSubtext = styled.div`
  font-size: 0.75rem;
  color: #718096;
  line-height: 1.4;
`;

const Toggle = styled.input`
  width: 48px;
  height: 24px;
  appearance: none;
  background-color: #cbd5e0;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:checked {
    background-color: #4A7C59;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: 2px;
    transition: transform 0.2s ease;
  }
  
  &:checked::before {
    transform: translateX(24px);
  }
`;

const AccountActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionItem = styled.div<{ danger?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.danger ? '#fed7d7' : '#f7fafc'};
  border-radius: 8px;
  transition: background-color 0.2s ease;
  gap: 1rem;
  
  &:hover {
    background-color: ${props => props.danger ? '#feb2b2' : '#edf2f7'};
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
    gap: 0.75rem;
  }
`;

const ActionTitle = styled.div<{ danger?: boolean }>`
  font-weight: 500;
  color: ${props => props.danger ? '#c53030' : '#2d3748'};
  margin-bottom: 0.25rem;
`;

const ActionDescription = styled.div`
  font-size: 0.875rem;
  color: #718096;
  line-height: 1.4;
`;

const ActionContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ActionButtonWrapper = styled.div`
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
    
    button {
      width: 100%;
    }
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e2e8f0;
  margin: 0.5rem 0;
`;

export default {
    SettingContainer,
    Header,
    Title,
    ButtonGroup,
    ContentGrid,
    ToggleGroup,
    ToggleItem,
    ToggleLabel,
    ToggleSubtext,
    Toggle,
    AccountActions,
    ActionItem,
    ActionTitle,
    ActionDescription,
    ActionContent,
    ActionButtonWrapper,
    Divider,
};
