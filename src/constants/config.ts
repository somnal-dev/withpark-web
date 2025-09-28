export const API_URL = import.meta.env.PROD
  ? "/api" // 프로덕션에서는 Vercel 프록시 사용
  : `${import.meta.env.VITE_SERVER_URL}/api`; // 개발환경에서는 직접 연결
