import axios from "axios";
import {KaKaoLoginRequest, LoginResponse} from "@withpark/api/auth/login/kakao/type.ts";

export async function kakaoLogin() {
    return await axios.get<KaKaoLoginRequest, LoginResponse>(
        `https://kauth.kakao.com/oauth/authorize?` +
        `client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&` +
        `redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}&` +
        `response_type=code`,
    );
}