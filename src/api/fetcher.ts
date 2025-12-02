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

// Refresh Token API 호출 함수
const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.get(LOCAL_STORAGE.REFRESH_TOKEN);

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await ky.post(`${API_URL}/auth/refresh`, {
    json: { refreshToken },
  });

  const result = await response.json<{
    success: boolean;
    data: { accessToken: string; refreshToken: string }
  }>();

  if (!result.success || !result.data.accessToken) {
    throw new Error("Failed to refresh token");
  }

  // 새로운 토큰들을 저장
  localStorage.set(LOCAL_STORAGE.ACCESS_TOKEN, result.data.accessToken);
  localStorage.set(LOCAL_STORAGE.REFRESH_TOKEN, result.data.refreshToken);

  return result.data.accessToken;
};

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
          !request.url.includes("logout") &&
          !request.url.includes("auth/refresh")
        ) {
          try {
            let accessToken: string | undefined;

            if (tokenRefreshMutex.isLocked()) {
              // 다른 요청이 이미 토큰을 갱신 중이면 대기
              await tokenRefreshMutex.waitForUnlock();

              // 갱신된 토큰을 가져옴
              const newAccessToken = localStorage.get(
                LOCAL_STORAGE.ACCESS_TOKEN
              );

              if (newAccessToken) {
                accessToken = newAccessToken;
              }
            } else {
              // 이 요청이 토큰 갱신을 담당
              await tokenRefreshMutex.acquire();

              try {
                // Refresh token API 호출
                accessToken = await refreshAccessToken();
              } catch (refreshError) {
                // Refresh 실패 시 토큰 제거 및 로그아웃 처리
                localStorage.remove(LOCAL_STORAGE.ACCESS_TOKEN);
                localStorage.remove(LOCAL_STORAGE.REFRESH_TOKEN);
                throw refreshError;
              }
            }

            if (accessToken) {
              // 새로운 토큰으로 원래 요청 재시도
              request.headers.set("Authorization", `Bearer ${accessToken}`);
              return ky(request, options);
            }
          } catch (e) {
            if (e instanceof Error) {
              console.warn(`[fetcher.ts] ${e.name} (${e.message})`);
            }
          } finally {
            if (tokenRefreshMutex.isLocked()) {
              tokenRefreshMutex.release();
            }
          }
        }
        return response;
      },
    ],
  },
  ...defaultOption,
});

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function resultify<T>(response: ResponsePromise): Promise<T> {
  try {
    const result = await response.json<ApiResponse<T>>();

    if (!result.success) {
      throw new Error(result.message || "알 수 없는 오류가 발생했습니다.");
    }

    return result.data;
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
