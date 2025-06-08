import useLocalStorage from "../../hooks/useLocalStorage.ts";
import {LOCAL_STORAGE} from "@withpark/constants/storages.ts";
import ky from "ky";
import {API_URL} from "@withpark/constants/config.ts";

interface PostRefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

const localStorage = useLocalStorage();

const postRefreshToken = async () => {
    const refreshToken = localStorage.get(LOCAL_STORAGE.REFRESH_TOKEN);
    const accessToken = localStorage.get(LOCAL_STORAGE.ACCESS_TOKEN);

    if(refreshToken) {
        const response = await ky
            .post(`${API_URL}/auth?action=refresh`, {
                json: {
                    refreshToken,
                    accessToken
                }
            })

        return await response.json<PostRefreshTokenResponse>();
    }
}

export async function refreshAccessToken() {
    let newAccessToken: string | undefined = undefined;
    let newRefreshToken: string | undefined = undefined;

    const { accessToken, refreshToken } = (await postRefreshToken()) ?? {};
    newAccessToken = accessToken;
    newRefreshToken = refreshToken;

    if (newAccessToken) {
        localStorage.set(LOCAL_STORAGE.ACCESS_TOKEN, newAccessToken);

        if (newRefreshToken) {
            localStorage.set(LOCAL_STORAGE.REFRESH_TOKEN, newRefreshToken);
        }
    }

    return newAccessToken;
}
