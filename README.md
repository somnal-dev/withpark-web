# React With Park

데모 : https://withpark.vercel.app

![스크린샷 2025-06-03 19 44 50](https://github.com/user-attachments/assets/7086eafd-545e-4cd9-abb7-6b14abbca8e1)


## 📁 프로젝트 폴더 구조

```
React_Withpark/
├── public/                    # 정적 파일
│   └── favicon.ico
├── src/                       # 소스 코드
│   ├── api/                   # API 관련
│   │   ├── queries/           # React Query 쿼리
│   │   ├── mutations/         # React Query 뮤테이션
│   │   ├── utils/             # API 유틸리티
│   │   ├── fetcher.ts         # HTTP 클라이언트 설정
│   │   └── QueryClientProvider.tsx
│   ├── assets/                # 정적 자산
│   ├── constants/             # 상수 정의
│   ├── hooks/                 # 커스텀 훅
│   │   ├── useDialog.ts
│   │   ├── useAuthAtom.ts
│   │   └── useLocalStorage.ts
│   ├── pages/                 # 페이지 컴포넌트
│   │   ├── CommunityPage/
│   │   ├── DashboardPage/
│   │   ├── GamePage/
│   │   ├── IntroPage/
│   │   ├── LoginPage/
│   │   ├── OAuth/
│   │   ├── OnboardingPage/
│   │   ├── PlaceDetailPage/
│   │   ├── PlacePage/
│   │   ├── PostDetailPage/
│   │   ├── SettingPage/
│   │   └── index.ts
│   ├── routes/                # 라우팅 설정
│   ├── types/                 # TypeScript 타입 정의
│   │   ├── Kakao.ts
│   │   ├── community.ts
│   │   └── place.ts
│   ├── ui/                    # UI 컴포넌트
│   │   ├── components/
│   │   └── assets/
│   ├── App.tsx                # 루트 컴포넌트
│   ├── index.css              # 글로벌 스타일
│   ├── main.tsx               # 앱 진입점
│   └── vite-env.d.ts          # Vite 타입 정의
├── package.json               # 패키지 의존성
├── vite.config.ts             # Vite 설정
├── tsconfig.json              # TypeScript 설정
├── eslint.config.js           # ESLint 설정
├── vercel.json                # Vercel 배포 설정
└── README.md                  # 프로젝트 문서
```

## 🛠 사용 기술

### 프론트엔드
| 기술 | 목적 | 버전 |
|------|------|------|
| React | UI 라이브러리 | ^18.3.1 ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=white) |
| TypeScript | 타입 안전성 | ^5.5.3 ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat&logo=typescript&logoColor=white) |
| Vite | 빌드 도구 | ^6.3.5 ![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat&logo=vite&logoColor=white) |
| React Router | 라우팅 | ^7.6.0 ![React Router](https://img.shields.io/badge/React%20Router-7.6.0-CA4245?style=flat&logo=react-router&logoColor=white) |

### 상태관리 & 데이터 페칭
| 기술 | 목적          | 버전 |
|------|-------------|------|
| Jotai | 클라이언트 상태 관리 | ^2.12.5 ![Jotai](https://img.shields.io/badge/Jotai-2.12.5-000000?style=flat) |
| TanStack Query | 서버 상태 관리    | ^5.76.1 ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.76.1-FF4154?style=flat&logo=react-query&logoColor=white) |
| ky | HTTP 클라이언트  | ^1.8.1 ![ky](https://img.shields.io/badge/ky-1.8.1-000000?style=flat) |

### 스타일링 & 애니메이션
| 기술 | 목적 | 버전 |
|------|------|------|
| Emotion | CSS-in-JS | ^11.14.0 ![Emotion](https://img.shields.io/badge/Emotion-11.14.0-DB7093?style=flat&logo=emotion&logoColor=white) |
| Framer Motion | 애니메이션 | ^12.15.0 ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.15.0-0055FF?style=flat&logo=framer&logoColor=white) |

### 유틸리티
| 기술 | 목적 | 버전 |
|------|------|------|
| Day.js | 날짜 처리 | ^1.11.13 ![Day.js](https://img.shields.io/badge/Day.js-1.11.13-FF5F56?style=flat) |
| nanoid | 고유 ID 생성 | ^5.1.5 ![nanoid](https://img.shields.io/badge/nanoid-5.1.5-000000?style=flat) |
| async-mutex | 비동기 동기화 | ^0.5.0 ![async-mutex](https://img.shields.io/badge/async--mutex-0.5.0-000000?style=flat) |

### 개발 도구
| 기술         | 목적 | 버전 |
|------------|------|------|
| ESLint     | 정적 분석 | ^9.9.0 ![ESLint](https://img.shields.io/badge/ESLint-9.9.0-4B32C3?style=flat&logo=eslint&logoColor=white) |
| Prettier   | 코드 포맷터 | ^3.5.3 ![Prettier](https://img.shields.io/badge/Prettier-3.5.3-F7B93E?style=flat&logo=prettier&logoColor=white) |
| Yarn Berry | 패키지 매니저 | 4.9.1 ![Yarn](https://img.shields.io/badge/Yarn-4.9.1-2C8EBB?style=flat&logo=yarn&logoColor=white) |

### 배포
| 기술 | 목적 | 버전 |
|------|------|------|
| Vercel | 배포 플랫폼 | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) |