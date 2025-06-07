# LoadingBar 컴포넌트

다양한 스타일의 로딩 상태를 표시하는 컴포넌트입니다.

## 🎯 특징

- **3가지 타입**: Spinner, Dots, Bar
- **3가지 크기**: Small, Medium, Large  
- **커스텀 색상**: 원하는 색상으로 변경 가능
- **전체 화면 오버레이**: 모달 형태의 로딩 표시
- **메시지 지원**: 로딩 상태에 대한 설명 텍스트
- **접근성**: 테스트 아이디 지원
- **@emotion/styled**: 성능 최적화된 스타일링

## 📦 사용법

### 기본 사용

```tsx
import LoadingBar from "@withpark/ui/components/LoadingBar";

// 기본 스피너
<LoadingBar />

// 메시지와 함께
<LoadingBar message="로딩 중..." />
```

### 타입별 사용

```tsx
// 스피너 (기본)
<LoadingBar type="spinner" message="로딩 중..." />

// 점 애니메이션
<LoadingBar type="dots" message="처리 중..." />

// 슬라이딩 바
<LoadingBar type="bar" message="업로드 중..." />
```

### 크기 변경

```tsx
<LoadingBar size="small" message="작은 로딩" />
<LoadingBar size="medium" message="보통 로딩" />
<LoadingBar size="large" message="큰 로딩" />
```

### 커스텀 색상

```tsx
<LoadingBar 
  type="spinner" 
  color="#ff6b6b" 
  message="빨간색 스피너" 
/>

<LoadingBar 
  type="dots" 
  color="#4ecdc4" 
  message="청록색 점들" 
/>
```

### 전체 화면 오버레이

```tsx
<LoadingBar 
  type="spinner" 
  fullScreen 
  message="전체 화면 로딩..." 
/>
```

## 🔧 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'spinner' \| 'dots' \| 'bar'` | `'spinner'` | 로딩바 타입 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 로딩바 크기 |
| `message` | `string` | - | 로딩 메시지 |
| `fullScreen` | `boolean` | `false` | 전체 화면 오버레이 표시 |
| `color` | `string` | - | 커스텀 색상 (CSS 색상값) |
| `testId` | `string` | `'loading-bar'` | 테스트용 data-testid |

## 🎨 타입별 상세

### Spinner
- 회전하는 원형 스피너
- 가장 일반적인 로딩 표시
- 빠른 작업에 적합

### Dots
- 3개의 점이 순차적으로 커졌다 작아지는 애니메이션
- 부드럽고 친근한 느낌
- 대기 시간이 있는 작업에 적합

### Bar
- 좌우로 슬라이딩하는 바
- 진행률을 암시하는 느낌
- 파일 업로드, 다운로드 등에 적합

## 📱 사용 사례

### API 데이터 로딩

```tsx
const MyComponent = () => {
  const { data, isLoading, error } = useQuery('myData', fetchMyData);

  if (isLoading) {
    return <LoadingBar type="dots" message="데이터를 불러오는 중..." />;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return <div>{/* 데이터 표시 */}</div>;
};
```

### 폼 제출

```tsx
const MyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await submitForm(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드들 */}
      
      {isSubmitting && (
        <LoadingBar 
          type="bar" 
          fullScreen 
          message="양식을 제출하는 중..." 
        />
      )}
    </form>
  );
};
```

### 페이지 전환

```tsx
const PageWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 페이지 로딩 로직
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <LoadingBar 
        type="spinner" 
        size="large" 
        fullScreen 
        message="페이지를 로딩하는 중..." 
      />
    );
  }

  return children;
};
```

## 🎯 디자인 가이드라인

### 크기 선택
- **Small**: 인라인 요소, 버튼 내부
- **Medium**: 카드, 섹션 단위  
- **Large**: 페이지 전체, 중요한 작업

### 타입 선택
- **Spinner**: 일반적인 데이터 로딩
- **Dots**: 사용자 친화적, 긴 대기시간
- **Bar**: 진행률이 있는 작업, 업로드/다운로드

### 색상 사용
- 기본 색상(`#4A7C59`)을 권장
- 브랜드 색상이나 상황에 맞는 색상 사용 가능
- 접근성을 고려하여 충분한 대비를 유지

## ⚡ 기술적 특징

### @emotion/styled 사용
```tsx
// 최적화된 CSS-in-JS
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

// TypeScript 완전 지원
interface SizeProps {
  size?: 'small' | 'medium' | 'large';
}

const Spinner = styled.div<SizeProps>`
  width: ${(props: SizeProps) => 
    props.size === 'small' ? '16px' : '24px'
  };
  // ...
`;
```

### 성능 최적화
- CSS-in-JS 런타임 최적화
- 자동 vendor prefixing
- 압축된 클래스명 생성
- 사용하지 않는 스타일 제거

## 🔄 마이그레이션

기존의 로딩 표시를 LoadingBar로 교체:

```tsx
// Before
<div style={{ textAlign: 'center', padding: '20px' }}>
  로딩 중...
</div>

// After  
<LoadingBar message="로딩 중..." />
```

```tsx
// Before (전체 화면)
<div style={{ 
  position: 'fixed', 
  top: 0, 
  left: 0, 
  right: 0, 
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255,255,255,0.8)'
}}>
  로딩 중...
</div>

// After
<LoadingBar fullScreen message="로딩 중..." />
```

## 🧪 테스트

```tsx
import { render, screen } from '@testing-library/react';
import LoadingBar from './LoadingBar';

test('로딩 메시지가 표시된다', () => {
  render(<LoadingBar message="테스트 로딩" testId="test-loading" />);
  
  expect(screen.getByText('테스트 로딩')).toBeInTheDocument();
  expect(screen.getByTestId('test-loading')).toBeInTheDocument();
});
```

## 🛠️ 의존성

```json
{
  "dependencies": {
    "@emotion/react": "^11.x.x",
    "@emotion/styled": "^11.x.x"
  }
}
``` 