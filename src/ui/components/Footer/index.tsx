import Styled from './Footer.styles';

const Footer = () => {
    return (
        <>
            <Styled.Footer>
                <Styled.FooterContent>
                    <Styled.FooterSection>
                        <h3>위드파크</h3>
                        <p>파크골프 전용 커뮤니티</p>
                        <p>함께 만들어가는 파크골프 문화</p>
                    </Styled.FooterSection>
                    <Styled.FooterSection>
                        <h3>서비스</h3>
                        <p><a href="#">커뮤니티</a></p>
                        <p><a href="#">모임 매칭</a></p>
                        <p><a href="#">코스 가이드</a></p>
                        <p><a href="#">스코어 관리</a></p>
                    </Styled.FooterSection>
                    <Styled.FooterSection>
                        <h3>고객지원</h3>
                        <p><a href="#">자주 묻는 질문</a></p>
                        <p><a href="#">문의하기</a></p>
                        <p><a href="#">공지사항</a></p>
                    </Styled.FooterSection>
                    <Styled.FooterSection>
                        <h3>연결하기</h3>
                        <p><a href="#">카카오톡</a></p>
                        <p><a href="#">인스타그램</a></p>
                        <p><a href="#">네이버 카페</a></p>
                    </Styled.FooterSection>
                </Styled.FooterContent>
                <Styled.FooterBottom>
                    <p>&copy; 2025 위드파크. All rights reserved.</p>
                </Styled.FooterBottom>
            </Styled.Footer>
        </>
    )
}

export default Footer;