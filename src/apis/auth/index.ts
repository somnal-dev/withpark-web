import {LoginRequest, LoginResponse} from "#/apis/auth/type.ts";
import {baseURL} from "#/apis/api.ts";
import axios from "axios";

export async function kakaoLogin({
    accessToken,
}: LoginRequest) {
    return await axios.post<LoginRequest, LoginResponse>(
        `${baseURL}/auth/login/kakao`,
        {
            accessToken,
        },
    );
}