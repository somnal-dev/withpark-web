import Styled from './CTASection.styles';
import Button from "@withpark/ui/components/Button";

export type CTASectionProps = {
    goLogin: () => void;
}

const CTASection = ({
    goLogin
}: CTASectionProps) => {

    return (
        <Styled.CTASection>
            <Styled.SectionContainer>
                <Styled.CTATitle>지금 위드파크에 가입하세요!</Styled.CTATitle>
                <Styled.CTADescription>
                    파크골프의 새로운 경험이 여러분을 기다리고 있습니다.
                </Styled.CTADescription>
                <Button
                    onClick={goLogin}
                    variant="primary"
                    style={{
                        background: 'white',
                        color: '#2D5016',
                        fontSize: '1.1rem',
                        padding: '1rem 2rem'
                    }}
                >
                    시작하기
                </Button>
            </Styled.SectionContainer>
        </Styled.CTASection>
    )
}

export default CTASection;