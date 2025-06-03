import Styled from './FeatureSection.styles.ts';

const FeatureSection = () => {
    return (
        <>
            <Styled.FeatureSection id="features">
                <Styled.SectionContainer>
                    <Styled.SectionTitle>위드파크만의 특별함</Styled.SectionTitle>
                    <Styled.FeatureGrid>
                        <Styled.FeatureCard>
                            <Styled.FeatureIcon>🌟</Styled.FeatureIcon>
                            <Styled.FeatureTitle>전문 정보 공유</Styled.FeatureTitle>
                            <Styled.FeatureDescription>
                                파크골프 기술, 코스 정보, 용품 리뷰까지
                                전문적이고 실용적인 정보를 공유하세요.
                            </Styled.FeatureDescription>
                        </Styled.FeatureCard>
                        <Styled.FeatureCard>
                            <Styled.FeatureIcon>👥</Styled.FeatureIcon>
                            <Styled.FeatureTitle>모임 & 매칭</Styled.FeatureTitle>
                            <Styled.FeatureDescription>
                                같은 지역, 비슷한 실력의 파크골퍼들과
                                매칭되어 함께 라운딩을 즐겨보세요.
                            </Styled.FeatureDescription>
                        </Styled.FeatureCard>
                        <Styled.FeatureCard>
                            <Styled.FeatureIcon>📍</Styled.FeatureIcon>
                            <Styled.FeatureTitle>코스 가이드</Styled.FeatureTitle>
                            <Styled.FeatureDescription>
                                전국 파크골프장 정보와 실제 이용후기를
                                통해 완벽한 라운딩을 준비하세요.
                            </Styled.FeatureDescription>
                        </Styled.FeatureCard>
                        <Styled.FeatureCard>
                            <Styled.FeatureIcon>🏆</Styled.FeatureIcon>
                            <Styled.FeatureTitle>대회 & 이벤트</Styled.FeatureTitle>
                            <Styled.FeatureDescription>
                                정기 대회 참가부터 소규모 모임까지
                                다양한 파크골프 이벤트에 참여하세요.
                            </Styled.FeatureDescription>
                        </Styled.FeatureCard>
                        <Styled.FeatureCard>
                            <Styled.FeatureIcon>📱</Styled.FeatureIcon>
                            <Styled.FeatureTitle>스코어 관리</Styled.FeatureTitle>
                            <Styled.FeatureDescription>
                                개인 스코어 기록과 통계를 관리하고
                                실력 향상의 과정을 추적해보세요.
                            </Styled.FeatureDescription>
                        </Styled.FeatureCard>
                        <Styled.FeatureCard>
                            <Styled.FeatureIcon>💬</Styled.FeatureIcon>
                            <Styled.FeatureTitle>실시간 소통</Styled.FeatureTitle>
                            <Styled.FeatureDescription>
                                채팅과 댓글을 통해 파크골프 동호인들과
                                실시간으로 소통하고 친목을 다져보세요.
                            </Styled.FeatureDescription>
                        </Styled.FeatureCard>
                    </Styled.FeatureGrid>
                </Styled.SectionContainer>
            </Styled.FeatureSection>
        </>
    )
}

export default FeatureSection;