import Styled from './CTASection.styles';
import Button from "@withpark/ui/components/Button";

const CTASection = () => {
    return (
        <Styled.CTASection>
            <Styled.SectionContainer>
                <Styled.CTATitle>지금 위드파크에 가입하세요!</Styled.CTATitle>
                <Styled.CTADescription>
                    파크골프의 새로운 경험이 여러분을 기다리고 있습니다.
                </Styled.CTADescription>
                <Button
                    variant="primary"
                    style={{
                        background: 'white',
                        color: '#2D5016',
                        fontSize: '1.1rem',
                        padding: '1rem 2rem'
                    }}
                >
                    무료로 시작하기
                </Button>
            </Styled.SectionContainer>
        </Styled.CTASection>
    )
}

export default CTASection;