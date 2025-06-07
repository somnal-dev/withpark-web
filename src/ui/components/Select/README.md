# Select 컴포넌트

드롭다운 형태의 선택 옵션을 제공하는 셀렉트박스 컴포넌트입니다.

## 🎯 특징

- **타입 안전성**: TypeScript 완전 지원
- **다양한 크기**: Small, Medium, Large
- **커스텀 스타일링**: @emotion/styled 사용
- **에러 처리**: 에러 상태 및 메시지 표시
- **접근성**: 라벨, 도움말 텍스트 지원
- **반응형**: 모바일 친화적 디자인
- **유연한 옵션**: 문자열, 숫자 값 지원

## 📦 사용법

### 기본 사용

```tsx
import Select from "@withpark/ui/components/Select";

const options = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

<Select 
  options={options}
  placeholder="옵션을 선택하세요"
/>
```

### 라벨과 함께

```tsx
<Select
  options={options}
  label="카테고리 선택"
  placeholder="카테고리를 선택하세요"
  required
/>
```

### 상태 관리

```tsx
const [selectedValue, setSelectedValue] = useState<string | number>('');

<Select
  options={options}
  value={selectedValue}
  onChange={(value, option) => {
    setSelectedValue(value);
    console.log('선택된 옵션:', option);
  }}
  label="지역 선택"
/>
```

### 에러 상태

```tsx
<Select
  options={options}
  label="필수 선택"
  error={true}
  errorMessage="이 항목은 필수입니다."
  required
/>
```

### 크기 변경

```tsx
// 작은 크기
<Select
  options={options}
  size="small"
  placeholder="작은 셀렉트"
/>

// 큰 크기
<Select
  options={options}
  size="large"
  placeholder="큰 셀렉트"
/>

// 전체 너비
<Select
  options={options}
  fullWidth
  placeholder="전체 너비 셀렉트"
/>
```

## 🔧 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | **required** | 선택 가능한 옵션 목록 |
| `value` | `string \| number` | - | 현재 선택된 값 |
| `defaultValue` | `string \| number` | - | 기본 선택 값 |
| `onChange` | `(value, option) => void` | - | 값 변경 이벤트 핸들러 |
| `placeholder` | `string` | - | 플레이스홀더 텍스트 |
| `label` | `string` | - | 라벨 텍스트 |
| `required` | `boolean` | `false` | 필수 여부 |
| `disabled` | `boolean` | `false` | 비활성화 여부 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 크기 |
| `fullWidth` | `boolean` | `false` | 전체 너비 사용 |
| `error` | `boolean` | `false` | 에러 상태 |
| `errorMessage` | `string` | - | 에러 메시지 |
| `helpText` | `string` | - | 도움말 텍스트 |
| `style` | `CSSProperties` | - | 커스텀 스타일 |
| `className` | `string` | - | CSS 클래스명 |
| `testId` | `string` | `'select'` | 테스트용 data-testid |

## 📋 SelectOption 인터페이스

```tsx
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
```

## 🎨 사용 예제

### 지역 선택

```tsx
const areaOptions = [
  { value: '', label: '전체' },
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'incheon', label: '인천' },
];

<Select
  options={areaOptions}
  label="지역 선택"
  placeholder="지역을 선택하세요"
  onChange={(value) => {
    setSelectedArea(value);
  }}
/>
```

### 카테고리 선택 (숫자 값)

```tsx
const categoryOptions = [
  { value: 1, label: '자유게시판' },
  { value: 2, label: '질문/답변' },
  { value: 3, label: '정보공유' },
  { value: 4, label: '모임' },
];

<Select
  options={categoryOptions}
  label="게시글 카테고리"
  required
  onChange={(value, option) => {
    setCategoryId(value as number);
    setCategoryName(option.label);
  }}
/>
```

### 비활성화된 옵션

```tsx
const statusOptions = [
  { value: 'active', label: '활성' },
  { value: 'inactive', label: '비활성' },
  { value: 'pending', label: '대기중', disabled: true },
  { value: 'suspended', label: '정지됨', disabled: true },
];

<Select
  options={statusOptions}
  label="상태 선택"
  helpText="일부 옵션은 현재 선택할 수 없습니다."
/>
```

### 폼 검증과 함께

```tsx
const [selectedValue, setSelectedValue] = useState('');
const [error, setError] = useState(false);

const handleSubmit = () => {
  if (!selectedValue) {
    setError(true);
    return;
  }
  setError(false);
  // 제출 로직
};

<Select
  options={options}
  value={selectedValue}
  onChange={(value) => {
    setSelectedValue(value);
    setError(false);
  }}
  label="필수 선택 항목"
  required
  error={error}
  errorMessage="항목을 선택해주세요."
/>
```

## 🎯 디자인 가이드라인

### 크기 선택
- **Small**: 인라인 필터, 컴팩트한 UI
- **Medium**: 일반적인 폼 요소
- **Large**: 중요한 선택 항목, 터치 친화적

### 에러 처리
- 필수 항목은 `required` 속성 사용
- 에러 상태에서는 빨간색 테두리와 메시지 표시
- 도움말 텍스트로 사용자 가이드 제공

### 접근성
- 라벨과 폼 요소 연결 (htmlFor)
- 키보드 네비게이션 지원
- 스크린 리더 친화적

## ⚡ 성능 최적화

### @emotion/styled 사용
- CSS-in-JS 런타임 최적화
- 조건부 스타일링 최적화
- 자동 vendor prefixing

### 메모이제이션
```tsx
const memoizedOptions = useMemo(() => [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
], []);

<Select options={memoizedOptions} />
```

## 🧪 테스트

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';

const mockOptions = [
  { value: 'test1', label: '테스트 1' },
  { value: 'test2', label: '테스트 2' },
];

test('옵션을 선택할 수 있다', () => {
  const handleChange = jest.fn();
  
  render(
    <Select
      options={mockOptions}
      onChange={handleChange}
      testId="test-select"
    />
  );
  
  const select = screen.getByTestId('test-select');
  fireEvent.change(select, { target: { value: 'test1' } });
  
  expect(handleChange).toHaveBeenCalledWith('test1', mockOptions[0]);
});
```

## 🔄 마이그레이션

기존 select 태그를 Select 컴포넌트로 교체:

```tsx
// Before
<select onChange={(e) => setValue(e.target.value)}>
  <option value="">선택하세요</option>
  <option value="option1">옵션 1</option>
  <option value="option2">옵션 2</option>
</select>

// After
<Select
  options={[
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
  ]}
  placeholder="선택하세요"
  onChange={(value) => setValue(value)}
/>
``` 