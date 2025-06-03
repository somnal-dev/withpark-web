// 헤더
import styled from "@emotion/styled";

const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 1rem 2rem;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    color: #2D5016;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
        content: '⛳';
        font-size: 1.5rem;
    }
`;

const NavMenu = styled.ul`
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
`;

const NavItem = styled.li`
    a {
        text-decoration: none;
        color: #333;
        font-weight: 500;
        transition: color 0.3s ease;

        &:hover {
            color: #4A7C59;
        }
    }
`;

const AuthButtons = styled.div`
    display: flex;
    gap: 1rem;
`;

export default {
    Header,
    Nav,
    Logo,
    NavMenu,
    NavItem,
    AuthButtons,
}