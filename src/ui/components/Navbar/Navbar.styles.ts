import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

const NavContainer = styled.nav`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #4299e1;
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuLink = styled(Link)`
  color: #4a5568;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f7fafc;
    color: #2d3748;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileSection = styled.div`
  position: relative;
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f7fafc;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #2d3748;
  
  &:hover {
    background-color: #f7fafc;
  }
  
  &:last-child {
    color: #e53e3e;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  
  &:hover {
    background-color: #f7fafc;
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const HamburgerIcon = styled.div<{ isOpen: boolean }>`
  width: 24px;
  height: 18px;
  position: relative;
  cursor: pointer;
  
  span {
    display: block;
    position: absolute;
    height: 2px;
    width: 100%;
    background: #2d3748;
    border-radius: 1px;
    opacity: 1;
    left: 0;
    transform-origin: left center;
    transition: all 0.25s ease-in-out;
    
    &:nth-of-type(1) {
      top: 0px;
      transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0deg)'};
    }
    
    &:nth-of-type(2) {
      top: 8px;
      opacity: ${props => props.isOpen ? '0' : '1'};
      left: ${props => props.isOpen ? '-60px' : '0'};
    }
    
    &:nth-of-type(3) {
      top: 16px;
      transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'rotate(0deg)'};
    }
  }
`;

const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuItem = styled(Link)`
  display: block;
  padding: 1rem;
  color: #4a5568;
  text-decoration: none;
  border-bottom: 1px solid #f7fafc;
  
  &:hover {
    background-color: #f7fafc;
    color: #2d3748;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export default {
    NavContainer,
    NavContent,
    LeftSection,
    Logo,
    DesktopMenu,
    MenuLink,
    RightSection,
    ProfileSection,
    ProfileButton,
    DropdownMenu,
    DropdownItem,
    MobileMenuButton,
    HamburgerIcon,
    MobileMenu,
    MobileMenuItem,
}