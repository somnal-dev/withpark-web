import { atom, useAtom } from 'jotai';
import useLocalStorage from "./useLocalStorage.ts";
import {LOCAL_STORAGE} from "@withpark/constants/storages.ts";

const localStorage = useLocalStorage();

const accessTokenAtom = atom<string | null>(
    localStorage.get(LOCAL_STORAGE.ACCESS_TOKEN, null)
);

const refreshTokenAtom = atom<string | null>(
    localStorage.get(LOCAL_STORAGE.REFRESH_TOKEN, null)
);

const useAuthAtom = () => {
    const [ accessToken, setAccessToken ] = useAtom(accessTokenAtom);
    const [ refreshToken, setRefreshToken ] = useAtom(refreshTokenAtom);

    // 토큰 설정
    const setToken = (accessToken: string, refreshToken: string) => {
        localStorage.set(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
        localStorage.set(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    };

    // 토큰 삭제
    const removeToken = () => {
        localStorage.remove(LOCAL_STORAGE.ACCESS_TOKEN);
        localStorage.remove(LOCAL_STORAGE.REFRESH_TOKEN);

        setAccessToken(null);
        setRefreshToken(null);
    };

    const isLogin = () => !!accessToken && !!refreshToken;

    return {
        setToken,
        removeToken,
        isLogin
    }
}

export default useAuthAtom;