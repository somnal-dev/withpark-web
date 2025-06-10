import type { Options, ResponsePromise } from 'ky';
import ky, { HTTPError } from 'ky';

import { Mutex } from 'async-mutex';
import { refreshAccessToken } from './utils/refreshAccessToken.ts';
import {API_URL} from "@withpark/constants/config.ts";
import {LOCAL_STORAGE} from "@withpark/constants/storages.ts";
import useLocalStorage from "../hooks/useLocalStorage.ts";

const defaultOption: Options = {
    retry: 0,
    timeout: 30_000,
};

const tokenRefreshMutex = new Mutex();
const localStorage = useLocalStorage();

export const instance = ky.create({
    prefixUrl: API_URL,
    hooks: {
        beforeRequest: [
            async (request) => {
                // 기본적으로 Content-Type을 application/json으로 설정하되,
                // 이미 다른 Content-Type이 설정되어 있으면 덮어쓰지 않음
                if (!request.headers.get('Content-Type')) {
                    request.headers.set('Content-Type', 'application/json');
                }

                // 리프레시 토큰으로 새로운 엑세스토큰 받기
                try {
                    const accessToken = await refreshAccessToken();

                    if (accessToken) {
                        request.headers.set('Authorization', `Bearer ${accessToken}`);
                    }
                } catch (e) {
                    console.log("토큰 리프레시 에러 : ", e);

                    localStorage.remove(LOCAL_STORAGE.ACCESS_TOKEN);
                    localStorage.remove(LOCAL_STORAGE.REFRESH_TOKEN);
                    location.reload();
                }
            },
        ],
        afterResponse: [
            async (request, options, response) => {
                if (!response.ok && response.status === 401 && !request.url.includes('logout')) {
                    try {
                        let accessToken: string | undefined;

                        if (tokenRefreshMutex.isLocked()) {
                            await tokenRefreshMutex.waitForUnlock();

                            const newAccessToken = localStorage.get(LOCAL_STORAGE.ACCESS_TOKEN);

                            if (newAccessToken) {
                                accessToken = newAccessToken;
                            }
                        } else {
                            await tokenRefreshMutex.acquire();
                            accessToken = await refreshAccessToken();
                        }

                        request.headers.set('Authorization', `Bearer ${accessToken}`);
                        return ky(request, options);
                    } catch (e) {
                        if (e instanceof HTTPError && e.response.url.includes('/auth?action=refresh')) {
                            localStorage.remove(LOCAL_STORAGE.ACCESS_TOKEN);
                            localStorage.remove(LOCAL_STORAGE.REFRESH_TOKEN);
                        }

                        if (e instanceof Error) {
                            console.warn(`[fether.ts] ${e.name} (${e.message})`);
                        }
                    } finally {
                        tokenRefreshMutex.release();
                    }
                }
                return response;
            },
        ],
    },
    ...defaultOption,
});

export async function resultify<T>(response: ResponsePromise) {
    return await response.json<T>();
}

export const Fetcher = {
    get: <T>(pathname: string, options?: Options) => resultify<T>(instance.get(pathname, options)),
    post: <T>(pathname: string, options?: Options) => resultify<T>(instance.post(pathname, options)),
    put: <T>(pathname: string, options?: Options) => resultify<T>(instance.put(pathname, options)),
    delete: <T>(pathname: string, options?: Options) =>
        resultify<T>(instance.delete(pathname, options)),
};
