import {useNavigate} from "react-router-dom";
import {MobileView} from "#/templates/mobile-view/MobileView.tsx";

import * as S from './NotFoundPage.style';
import {theme} from "#/styles/theme.ts";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    const handleGoToPreviousPage = () => {
        navigate(-1);
    }

    return (
        <MobileView>
            <S.Container>
                <S.NotFoundSection gap={0}>
                    <img
                        src={`${import.meta.env.VITE_ASSET_URL}/assets/images/404.png`}
                        alt={"not_found"}
                    />

                    <h1 color={theme.color.blk[40]}>
                        유효하지 않은 페이지 입니다.
                    </h1>
                </S.NotFoundSection>
                <S.PreviousButton onClick={handleGoToPreviousPage}>
                    뒤로가기
                </S.PreviousButton>
            </S.Container>
        </MobileView>
    )

}