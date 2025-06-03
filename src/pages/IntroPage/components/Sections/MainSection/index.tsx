import Styled from './MainSection.styles.ts';
import Button from "@withpark/ui/components/Button";

export type MainSectionProps = {
    goLogin: () => void;
}

const MainSection = ({
    goLogin,
}: MainSectionProps) => {
    return (
        <>
            <Styled.MainSection id="home">
                <Styled.MainContent>
                    <Styled.MainText>
                        <Styled.MainTitle>
                            파크골프의 새로운 시작<br />
                            위드파크와 함께하세요
                        </Styled.MainTitle>
                        <Styled.MainSubtitle>
                            전국의 파크골프 애호가들과 만나고, 정보를 공유하며,
                            함께 성장하는 파크골프 전용 커뮤니티입니다.
                        </Styled.MainSubtitle>
                        <Styled.MainButtons>
                            <Button onClick={goLogin} variant="primary">지금 시작하기</Button>
                            {/*<Button variant="secondary">더 알아보기</Button>*/}
                        </Styled.MainButtons>
                    </Styled.MainText>
                    <Styled.MainImage>
                        🏌️‍♂️
                    </Styled.MainImage>
                </Styled.MainContent>
            </Styled.MainSection>
        </>
    )
}

export default MainSection;