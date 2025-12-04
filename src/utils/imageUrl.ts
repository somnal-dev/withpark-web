/**
 * 이미지 URL을 절대 경로로 변환
 * 상대 경로(/uploads/...)인 경우 서버 URL과 조합
 */
export const getAbsoluteImageUrl = (url?: string | null): string => {
  if (!url) return '';

  // 이미 절대 경로인 경우
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // 상대 경로인 경우 서버 URL과 조합
  if (url.startsWith('/')) {
    return `${import.meta.env.VITE_SERVER_URL}${url}`;
  }

  return url;
};
