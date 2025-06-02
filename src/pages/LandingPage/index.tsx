import {
  Container,
  Header,
  Nav,
  Logo,
  NavMenu,
  NavItem,
  AuthButtons,
  Button,
  HeroSection,
  HeroContent,
  HeroText,
  HeroTitle,
  HeroSubtitle,
  HeroButtons,
  HeroImage,
  FeaturesSection,
  SectionContainer,
  SectionTitle,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  CommunitySection,
  CommunityContent,
  CommunityText,
  CommunityTitle,
  CommunityDescription,
  CommunityStats,
  StatCard,
  StatNumber,
  StatLabel,
  CTASection,
  CTATitle,
  CTADescription,
  Footer,
  FooterContent,
  FooterSection,
  FooterBottom
} from './LandingPage.styles';
import {useNavigate} from "react-router-dom";
import {PATH} from "../../constants/routes";

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Container>
            {/* 헤더 */}
            <Header>
                <Nav>
                    <Logo>위드파크</Logo>
                    <NavMenu>
                        <NavItem><a href="#home">홈</a></NavItem>
                        <NavItem><a href="#features">특징</a></NavItem>
                        <NavItem><a href="#community">커뮤니티</a></NavItem>
                        <NavItem><a href="#contact">문의</a></NavItem>
                    </NavMenu>
                    <AuthButtons>
                        <Button onClick={() => {
                            navigate(PATH.LOGIN, { replace: true });
                        }} variant="secondary">로그인</Button>
                        <Button variant="primary">회원가입</Button>
                    </AuthButtons>
                </Nav>
            </Header>

            {/* 히어로 섹션 */}
            <HeroSection id="home">
                <HeroContent>
                    <HeroText>
                        <HeroTitle>
                            파크골프의 새로운 시작<br />
                            위드파크와 함께하세요
                        </HeroTitle>
                        <HeroSubtitle>
                            전국의 파크골프 애호가들과 만나고, 정보를 공유하며, 
                            함께 성장하는 파크골프 전용 커뮤니티입니다.
                        </HeroSubtitle>
                        <HeroButtons>
                            <Button variant="primary">지금 시작하기</Button>
                            <Button variant="secondary">더 알아보기</Button>
                        </HeroButtons>
                    </HeroText>
                    <HeroImage>
                        🏌️‍♂️
                    </HeroImage>
                </HeroContent>
            </HeroSection>

            {/* 특징 섹션 */}
            <FeaturesSection id="features">
                <SectionContainer>
                    <SectionTitle>위드파크만의 특별함</SectionTitle>
                    <FeaturesGrid>
                        <FeatureCard>
                            <FeatureIcon>🌟</FeatureIcon>
                            <FeatureTitle>전문 정보 공유</FeatureTitle>
                            <FeatureDescription>
                                파크골프 기술, 코스 정보, 용품 리뷰까지
                                전문적이고 실용적인 정보를 공유하세요.
                            </FeatureDescription>
                        </FeatureCard>
                        <FeatureCard>
                            <FeatureIcon>👥</FeatureIcon>
                            <FeatureTitle>모임 & 매칭</FeatureTitle>
                            <FeatureDescription>
                                같은 지역, 비슷한 실력의 파크골퍼들과 
                                매칭되어 함께 라운딩을 즐겨보세요.
                            </FeatureDescription>
                        </FeatureCard>
                        <FeatureCard>
                            <FeatureIcon>📍</FeatureIcon>
                            <FeatureTitle>코스 가이드</FeatureTitle>
                            <FeatureDescription>
                                전국 파크골프장 정보와 실제 이용후기를 
                                통해 완벽한 라운딩을 준비하세요.
                            </FeatureDescription>
                        </FeatureCard>
                        <FeatureCard>
                            <FeatureIcon>🏆</FeatureIcon>
                            <FeatureTitle>대회 & 이벤트</FeatureTitle>
                            <FeatureDescription>
                                정기 대회 참가부터 소규모 모임까지
                                다양한 파크골프 이벤트에 참여하세요.
                            </FeatureDescription>
                        </FeatureCard>
                        <FeatureCard>
                            <FeatureIcon>📱</FeatureIcon>
                            <FeatureTitle>스코어 관리</FeatureTitle>
                            <FeatureDescription>
                                개인 스코어 기록과 통계를 관리하고
                                실력 향상의 과정을 추적해보세요.
                            </FeatureDescription>
                        </FeatureCard>
                        <FeatureCard>
                            <FeatureIcon>💬</FeatureIcon>
                            <FeatureTitle>실시간 소통</FeatureTitle>
                            <FeatureDescription>
                                채팅과 댓글을 통해 파크골프 동호인들과
                                실시간으로 소통하고 친목을 다져보세요.
                            </FeatureDescription>
                        </FeatureCard>
                    </FeaturesGrid>
                </SectionContainer>
            </FeaturesSection>

            {/* 커뮤니티 섹션 */}
            <CommunitySection id="community">
                <SectionContainer>
                    <CommunityContent>
                        <CommunityText>
                            <CommunityTitle>활발한 파크골프 커뮤니티</CommunityTitle>
                            <CommunityDescription>
                                전국의 파크골프 애호가들이 모여 만든 특별한 공간입니다.
                                초보자부터 고수까지, 모든 레벨의 골퍼들이 함께 성장하고 
                                즐거운 파크골프 문화를 만들어가고 있습니다.
                            </CommunityDescription>
                            <CommunityDescription>
                                정기 모임, 기술 공유, 코스 추천, 용품 정보까지
                                파크골프와 관련된 모든 것을 함께 나누세요.
                            </CommunityDescription>
                        </CommunityText>
                        <CommunityStats>
                            <StatCard>
                                <StatNumber>5,200+</StatNumber>
                                <StatLabel>활성 회원</StatLabel>
                            </StatCard>
                            <StatCard>
                                <StatNumber>1,800+</StatNumber>
                                <StatLabel>월간 게시글</StatLabel>
                            </StatCard>
                            <StatCard>
                                <StatNumber>320+</StatNumber>
                                <StatLabel>정기 모임</StatLabel>
                            </StatCard>
                            <StatCard>
                                <StatNumber>150+</StatNumber>
                                <StatLabel>파트너 코스</StatLabel>
                            </StatCard>
                        </CommunityStats>
                    </CommunityContent>
                </SectionContainer>
            </CommunitySection>

            {/* CTA 섹션 */}
            <CTASection>
                <SectionContainer>
                    <CTATitle>지금 위드파크에 가입하세요!</CTATitle>
                    <CTADescription>
                        파크골프의 새로운 경험이 여러분을 기다리고 있습니다.
                    </CTADescription>
                    <Button variant="primary" style={{ background: 'white', color: '#2D5016', fontSize: '1.1rem', padding: '1rem 2rem' }}>
                        무료로 시작하기
                    </Button>
                </SectionContainer>
            </CTASection>

            {/* 푸터 */}
            <Footer>
                <FooterContent>
                    <FooterSection>
                        <h3>위드파크</h3>
                        <p>파크골프 전용 커뮤니티</p>
                        <p>함께 만들어가는 파크골프 문화</p>
                    </FooterSection>
                    <FooterSection>
                        <h3>서비스</h3>
                        <p><a href="#">커뮤니티</a></p>
                        <p><a href="#">모임 매칭</a></p>
                        <p><a href="#">코스 가이드</a></p>
                        <p><a href="#">스코어 관리</a></p>
                    </FooterSection>
                    <FooterSection>
                        <h3>고객지원</h3>
                        <p><a href="#">자주 묻는 질문</a></p>
                        <p><a href="#">문의하기</a></p>
                        <p><a href="#">공지사항</a></p>
                    </FooterSection>
                    <FooterSection>
                        <h3>연결하기</h3>
                        <p><a href="#">카카오톡</a></p>
                        <p><a href="#">인스타그램</a></p>
                        <p><a href="#">네이버 카페</a></p>
                    </FooterSection>
                </FooterContent>
                <FooterBottom>
                    <p>&copy; 2025 위드파크. All rights reserved.</p>
                </FooterBottom>
            </Footer>
        </Container>
    )
}

export default LandingPage;