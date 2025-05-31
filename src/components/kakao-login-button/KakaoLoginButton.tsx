import {ComponentProps} from "react";
import {Button} from "@withpark/component/button";
import KakaoLogin from "react-kakao-login";

export interface KakaoLoginButtonProps extends ComponentProps<'button'> {

}

export function KakaoLoginButton({
}: KakaoLoginButtonProps) {

    const onFail = () => {

    }

    const onSuccess = async (
        response: any,
    ) => {
        console.log(response);
    }

    return (
        <KakaoLogin
            token={import.meta.env.VITE_KAKAO_CLIENT_ID}
            onFail={onFail}
            onSuccess={onSuccess}
        />
    )
}