import { atom, useAtom } from "jotai";
import { LOCAL_STORAGE } from "@withpark/constants/storages.ts";

// atom을 컴포넌트 외부에서 초기화하여 안정성 보장
const getInitialToken = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const accessTokenAtom = atom<string | null>(
  getInitialToken(LOCAL_STORAGE.ACCESS_TOKEN)
);

const useAuthAtom = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  // 토큰 설정
  const setToken = (accessToken: string) => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
    } catch (error) {
      console.error("토큰 저장 실패:", error);
    }

    setAccessToken(accessToken);
  };

  // 토큰 삭제
  const removeToken = () => {
    try {
      window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
    } catch (error) {
      console.error("토큰 삭제 실패:", error);
    }

    setAccessToken(null);
  };

  const isLogin = () => !!accessToken;

  return {
    accessToken,
    setToken,
    removeToken,
    isLogin,
  };
};

export default useAuthAtom;
