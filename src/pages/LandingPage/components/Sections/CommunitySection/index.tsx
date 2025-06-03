import Styled from './CommunitySection.styles.ts';

const CommunitySection = () => {
    return (
        <>
            <Styled.CommunitySection id="community">
                <Styled.SectionContainer>
                    <Styled.CommunityContent>
                        <Styled.CommunityText>
                            <Styled.CommunityTitle>활발한 파크골프 커뮤니티</Styled.CommunityTitle>
                            <Styled.CommunityDescription>
                                전국의 파크골프 애호가들이 모여 만든 특별한 공간입니다.
                                초보자부터 고수까지, 모든 레벨의 골퍼들이 함께 성장하고
                                즐거운 파크골프 문화를 만들어가고 있습니다.
                            </Styled.CommunityDescription>
                            <Styled.CommunityDescription>
                                정기 모임, 기술 공유, 코스 추천, 용품 정보까지
                                파크골프와 관련된 모든 것을 함께 나누세요.
                            </Styled.CommunityDescription>
                        </Styled.CommunityText>
                        <Styled.CommunityStats>
                            <Styled.StatCard>
                                <Styled.StatNumber>5,200+</Styled.StatNumber>
                                <Styled.StatLabel>활성 회원</Styled.StatLabel>
                            </Styled.StatCard>
                            <Styled.StatCard>
                                <Styled.StatNumber>1,800+</Styled.StatNumber>
                                <Styled.StatLabel>월간 게시글</Styled.StatLabel>
                            </Styled.StatCard>
                            <Styled.StatCard>
                                <Styled.StatNumber>320+</Styled.StatNumber>
                                <Styled.StatLabel>정기 모임</Styled.StatLabel>
                            </Styled.StatCard>
                            <Styled.StatCard>
                                <Styled.StatNumber>150+</Styled.StatNumber>
                                <Styled.StatLabel>파트너 코스</Styled.StatLabel>
                            </Styled.StatCard>
                        </Styled.CommunityStats>
                    </Styled.CommunityContent>
                </Styled.SectionContainer>
            </Styled.CommunitySection>
        </>
    )
}

export default CommunitySection;