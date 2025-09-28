import type { Options, ResponsePromise } from "ky";
import ky, { HTTPError } from "ky";

import { Mutex } from "async-mutex";
import { API_URL } from "@withpark/constants/config.ts";
import { LOCAL_STORAGE } from "@withpark/constants/storages.ts";
import useLocalStorage from "../hooks/useLocalStorage.ts";
import type { ApiErrorResponse } from "@withpark/types/common";

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
        if (!request.headers.get("Content-Type")) {
          request.headers.set("Content-Type", "application/json");
        }

        // 액세스 토큰 사용하기
        try {
          const accessToken = localStorage.get(LOCAL_STORAGE.ACCESS_TOKEN);

          console.log(accessToken);

          if (accessToken) {
            request.headers.set("Authorization", `Bearer ${accessToken}`);
          }
        } catch (e) {
          console.log("토큰 리프레시 에러 : ", e);
          localStorage.remove(LOCAL_STORAGE.ACCESS_TOKEN);
          //   location.reload();
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (
          !response.ok &&
          response.status === 401 &&
          !request.url.includes("logout")
        ) {
          try {
            let accessToken: string | undefined;

            if (tokenRefreshMutex.isLocked()) {
              await tokenRefreshMutex.waitForUnlock();

              const newAccessToken = localStorage.get(
                LOCAL_STORAGE.ACCESS_TOKEN
              );

              if (newAccessToken) {
                accessToken = newAccessToken;
              }
            } else {
              await tokenRefreshMutex.acquire();
            }

            request.headers.set("Authorization", `Bearer ${accessToken}`);
            return ky(request, options);
          } catch (e) {
            if (
              e instanceof HTTPError &&
              e.response.url.includes("/auth?action=refresh")
            ) {
              localStorage.remove(LOCAL_STORAGE.ACCESS_TOKEN);
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

export async function resultify<T>(response: ResponsePromise): Promise<T> {
  try {
    const result = await response.json<T>();
    return result;
  } catch (error) {
    // Strapi v5 에러 응답 처리
    console.error(error);

    if (error instanceof HTTPError) {
      const errorResponse = await error.response.json<ApiErrorResponse>();
      throw new Error(
        errorResponse.message || "알 수 없는 오류가 발생했습니다."
      );
    }
    throw error;
  }
}

export const Fetcher = {
  get: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.get(pathname, options)),
  post: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.post(pathname, options)),
  put: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.put(pathname, options)),
  delete: <T>(pathname: string, options?: Options) =>
    resultify<T>(instance.delete(pathname, options)),
  // Strapi v5 전용 메소드들
  upload: async <T>(files: File | File[], options?: Options): Promise<T> => {
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((file) => formData.append("files", file));
    } else {
      formData.append("files", files);
    }

    return resultify<T>(
      instance.post("upload", {
        ...options,
        body: formData,
        // Content-Type을 설정하지 않음으로써 브라우저가 자동으로 multipart/form-data를 설정하도록 함
      })
    );
  },
};
