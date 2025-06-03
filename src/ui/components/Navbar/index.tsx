import {useState, useRef, useEffect} from 'react';
import {AnimatePresence} from 'framer-motion';
import Styled from './Navbar.styles';
import ProfileImage from "@withpark/ui/components/ProfileImage";
import useUserInfo from "@withpark/api/queries/useUserInfo";

const Navbar = () => {
    const {data: userInfo, isLoading: isUserInfoLoading} = useUserInfo();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const menuItems = [
        {path: '/dashboard', label: '대시보드'},
        {path: '/golf-courses', label: '골프장'},
        {path: '/community', label: '커뮤니티'},
        {path: '/games', label: '게임'},
    ];

    const handleLogout = () => {
        // 로그아웃 로직 구현
        console.log('로그아웃');
    };

    return (
        <Styled.NavContainer>
            <Styled.NavContent>
                <Styled.LeftSection>
                    <Styled.Logo to="/dashboard">
                        ⛳ 위드파크
                    </Styled.Logo>

                    <Styled.DesktopMenu>
                        {menuItems.map((item) => (
                            <Styled.MenuLink key={item.path} to={item.path}>
                                {item.label}
                            </Styled.MenuLink>
                        ))}
                    </Styled.DesktopMenu>
                </Styled.LeftSection>

                <Styled.RightSection>

                    {!isUserInfoLoading &&
                        <><Styled.ProfileSection ref={profileRef}>
                            <Styled.ProfileButton
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            >
                                <ProfileImage imgUrl={userInfo?.photo ?? ''}/>

                                <span style={{fontSize: '0.875rem', color: '#4a5568'}}>
                                  {userInfo?.nickname}님
                              </span>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    style={{
                                        transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s'
                                    }}
                                >
                                    <path
                                        d="M3 4.5L6 7.5L9 4.5"
                                        stroke="#4a5568"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                            </Styled.ProfileButton>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <Styled.DropdownMenu
                                        initial={{opacity: 0, scale: 0.95, y: -10}}
                                        animate={{opacity: 1, scale: 1, y: 0}}
                                        exit={{opacity: 0, scale: 0.95, y: -10}}
                                        transition={{duration: 0.15}}
                                    >
                                        <Styled.DropdownItem onClick={() => setIsProfileOpen(false)}>
                                            ⚙️ 설정
                                        </Styled.DropdownItem>
                                        <Styled.DropdownItem onClick={handleLogout}>
                                            🚪 로그아웃
                                        </Styled.DropdownItem>
                                    </Styled.DropdownMenu>
                                )}
                            </AnimatePresence>
                        </Styled.ProfileSection><Styled.MobileMenuButton
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Styled.HamburgerIcon isOpen={isMobileMenuOpen}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </Styled.HamburgerIcon>
                        </Styled.MobileMenuButton>
                        </>
                    }
                </Styled.RightSection>
            </Styled.NavContent>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <Styled.MobileMenu
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: 'auto'}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.2}}
                    >
                        {menuItems.map((item) => (
                            <Styled.MobileMenuItem
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Styled.MobileMenuItem>
                        ))}
                    </Styled.MobileMenu>
                )}
            </AnimatePresence>
        </Styled.NavContainer>
    );
};

export default Navbar;