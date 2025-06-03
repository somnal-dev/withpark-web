import Styled from './LandingPage.styles';

import MainSection from "@withpark/pages/LandingPage/components/Sections/MainSection";
import Footer from "@withpark/ui/components/Footer";
import FeatureSection from "@withpark/pages/LandingPage/components/Sections/FeatureSection";
import CommunitySection from "@withpark/pages/LandingPage/components/Sections/CommunitySection";
import CTASection from "@withpark/pages/LandingPage/components/Sections/CTASection";
import Header from "@withpark/pages/LandingPage/components/Header";
import {useNavigate} from "react-router-dom";
import {PATH} from "@withpark/constants/routes.ts";

const LandingPage = () => {

    const navigate = useNavigate();

    const goLogin = () => {
        navigate(PATH.LOGIN, { replace: true });
    }

    return (
        <Styled.Container>
            {/* 헤더 */}
            <Header
                goLogin={goLogin}
            />

            {/* 메인 섹션 */}
            <MainSection
                goLogin={goLogin}
            />

            {/* 특징 섹션 */}
            <FeatureSection />

            {/* 커뮤니티 섹션 */}
            <CommunitySection />

            {/* CTA 섹션 */}
            <CTASection
                goLogin={goLogin}
            />

            {/* 푸터 */}
            <Footer />
        </Styled.Container>
    )
}

export default LandingPage;