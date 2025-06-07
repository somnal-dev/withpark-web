# 🏌️ PlacePage - 파크골프장 페이지

파크골프장 정보를 조회하고 상호작용할 수 있는 완전한 기능을 제공하는 페이지입니다.

## 📋 목차

- [개요](#개요)
- [주요 기능](#주요-기능)
- [컴포넌트 구조](#컴포넌트-구조)
- [API 통합](#api-통합)
- [사용법](#사용법)
- [상태 관리](#상태-관리)
- [스타일링](#스타일링)
- [향후 개선 사항](#향후-개선-사항)

## 🎯 개요

PlacePage는 전국의 파크골프장 정보를 제공하는 포괄적인 시스템입니다. 사용자는 파크골프장을 검색하고, 상세 정보를 확인하며, 좋아요와 댓글을 통해 상호작용할 수 있습니다.

### 🔑 핵심 특징
- ✅ **실시간 데이터**: API를 통한 실시간 파크골프장 정보 조회
- ✅ **강력한 검색**: 골프장명, 주소, 지역별 검색 지원
- ✅ **인터랙티브**: 좋아요, 댓글 시스템
- ✅ **반응형 디자인**: 다양한 화면 크기 지원
- ✅ **페이지네이션**: 효율적인 데이터 로딩

## 🚀 주요 기능

### 1. 파크골프장 목록 보기
- 전체 파크골프장 목록 조회
- 카드 형태의 직관적인 정보 표시
- 지역, 규모, 홀 수 등 핵심 정보 요약

### 2. 검색 및 필터링
```typescript
// 검색 기능
- 텍스트 검색: 골프장명, 주소로 검색
- 지역 필터: 17개 시/도별 필터링
- 실시간 검색: 엔터키 또는 검색 버튼

// 지원되는 지역
'서울', '경기', '인천', '강원', '충북', '충남', '대전', '세종',
'전북', '전남', '광주', '경북', '경남', '대구', '울산', '부산', '제주'
```

### 3. 상세 정보 조회
- 클릭 시 상세 페이지로 이동
- 완전한 골프장 정보 표시
- 좋아요 및 댓글 수 실시간 업데이트

### 4. 좋아요 시스템
- 로그인 사용자만 좋아요 가능
- 실시간 좋아요 수 업데이트
- 좋아요 상태 시각적 표시

### 5. 댓글 시스템
- 후기 및 의견 작성
- 댓글 페이지네이션
- 작성자 정보 및 시간 표시

## 🏗️ 컴포넌트 구조

```
src/pages/PlacePage/
├── index.tsx                 # 메인 PlacePage 컴포넌트
├── components/
│   ├── PlaceCard.tsx        # 파크골프장 카드 컴포넌트
│   └── PlaceCommentList.tsx # 댓글 목록 컴포넌트
├── PlacePage.styles.ts      # 스타일 정의
└── README.md               # 문서 (현재 파일)
```

### PlacePage/index.tsx
메인 페이지 컴포넌트로 다음 기능을 제공:
- 파크골프장 목록/상세 뷰 전환
- 검색 및 필터링 인터페이스
- 페이지네이션 관리
- 상태 관리 및 이벤트 처리

### PlaceCard.tsx
개별 파크골프장 정보를 표시하는 카드 컴포넌트:
- 지역 배지
- 골프장명 및 주소
- 규모 및 홀 수 정보
- 좋아요 버튼 및 댓글 수
- 클릭 이벤트 처리

### PlaceCommentList.tsx
댓글 관련 기능을 제공하는 컴포넌트:
- 댓글 목록 표시
- 새 댓글 작성 폼
- 댓글 페이지네이션
- 사용자 정보 표시

## 🔌 API 통합

### 타입 정의 (`src/types/place.ts`)
```typescript
interface Place {
  id: number;
  area: string;
  golfClubName: string;
  address?: string;
  clubSize?: string;
  holeCount?: string;
  longitude?: string;
  latitude?: string;
  likeCount: number;
  commentCount: number;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 쿼리 훅들
```typescript
// 파크골프장 목록 조회
usePlaces({ page, limit, search, area })

// 파크골프장 상세 조회  
usePlace(placeId)

// 댓글 목록 조회
usePlaceComments({ placeId, page, limit })
```

### 뮤테이션 훅들
```typescript
// 좋아요 토글
useTogglePlaceLikeMutation()

// 댓글 작성
useCreatePlaceCommentMutation()
```

## 📖 사용법

### 1. 기본 목록 보기
```typescript
import PlacePage from './pages/PlacePage';

// 라우터에서 사용
<Route path="/place" element={<PlacePage />} />
```

### 2. 검색 사용법
```typescript
// 텍스트 검색
handleSearch() // 검색어로 필터링

// 지역 필터
setSelectedArea('서울') // 서울 지역만 필터링

// 초기화
setActualSearchQuery('')
setActualSelectedArea('')
```

### 3. 상세 페이지 이동
```typescript
// 카드 클릭 시 자동 상세 페이지로 전환
const handlePlaceClick = (placeId: number) => {
  setSelectedPlaceId(placeId);
}
```

## 🗃️ 상태 관리

### 주요 상태들
```typescript
const [currentPage, setCurrentPage] = useState(1);           // 현재 페이지
const [searchQuery, setSearchQuery] = useState('');          // 검색어 입력
const [selectedArea, setSelectedArea] = useState('');        // 선택된 지역
const [actualSearchQuery, setActualSearchQuery] = useState(''); // 실제 검색어
const [actualSelectedArea, setActualSelectedArea] = useState(''); // 실제 지역
const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null); // 선택된 골프장
```

### 상태 플로우
1. **검색 입력** → `searchQuery` 업데이트
2. **검색 실행** → `actualSearchQuery` 업데이트 → API 호출
3. **카드 클릭** → `selectedPlaceId` 설정 → 상세 페이지 렌더링
4. **뒤로가기** → `selectedPlaceId` 초기화 → 목록으로 복귀

## 🎨 스타일링

### styled-components 사용
```typescript
import Styled from './PlacePage.styles';

// 사용 예시
<Styled.Container>
  <Styled.Header>
    <Styled.Title>🏌️ 파크골프장</Styled.Title>
  </Styled.Header>
</Styled.Container>
```

### 반응형 디자인
- **그리드 레이아웃**: `repeat(auto-fill, minmax(350px, 1fr))`
- **유연한 검색바**: `flex: 1, minWidth: 200px`
- **모바일 최적화**: 터치 친화적 버튼 크기

### 시각적 요소
- **지역 배지**: 파란색 배지로 지역 구분
- **상태 아이콘**: 이모지를 활용한 직관적 표시
- **호버 효과**: 카드에 마우스 오버 시 배경 변경

## 🔮 향후 개선 사항

### 1. 지도 통합
```typescript
// Google Maps/Kakao Map 연동
interface MapIntegration {
  showOnMap: (place: Place) => void;
  nearbyPlaces: (coordinates: Coordinates) => Place[];
  directions: (from: Coordinates, to: Coordinates) => Route;
}
```

### 2. 고급 필터링
```typescript
// 추가 필터 옵션
interface AdvancedFilters {
  distance: number;        // 거리 반경
  clubSize: string[];      // 골프장 규모
  holeCount: string[];     // 홀 수
  facilities: string[];    // 편의시설
  rating: number;          // 평점
}
```

### 3. 즐겨찾기 시스템
```typescript
// 즐겨찾기 기능
interface Favorites {
  addToFavorites: (placeId: number) => void;
  removeFromFavorites: (placeId: number) => void;
  getFavorites: () => Place[];
}
```

### 4. 소셜 기능
```typescript
// 소셜 상호작용
interface SocialFeatures {
  sharePlace: (place: Place) => void;
  ratePlace: (placeId: number, rating: number) => void;
  photoUpload: (placeId: number, photos: File[]) => void;
}
```

### 5. 실시간 업데이트
```typescript
// WebSocket 연동
interface RealTimeUpdates {
  liveComments: boolean;
  liveLikes: boolean;
  onlinePlayers: number;
}
```

### 6. 성능 최적화
- **가상화**: 대용량 목록을 위한 가상 스크롤
- **무한 스크롤**: 페이지네이션 대신 무한 로딩
- **이미지 지연 로딩**: 골프장 사진 최적화
- **검색 debouncing**: 타이핑 중 API 호출 최적화

---

## 📚 관련 문서

- [API 문서](../../api/README.md)
- [타입 정의](../../types/place.ts)
- [라우팅 설정](../../routes/privateRoutes.tsx)

## 🤝 기여하기

1. 이슈 리포트: 버그나 개선사항 제안
2. 기능 요청: 새로운 기능 아이디어
3. 코드 개선: 성능 최적화 및 코드 품질 향상

---

**📞 문의사항이나 도움이 필요하시면 언제든 연락주세요!** 