import LoadingBar from './index';

export default {
  title: 'UI/LoadingBar',
  component: LoadingBar,
};

// 스피너 로딩
export const Spinner = () => (
  <div style={{ padding: '20px' }}>
    <h3>스피너 로딩</h3>
    <LoadingBar type="spinner" size="small" message="로딩 중..." />
    <br />
    <LoadingBar type="spinner" size="medium" message="데이터를 불러오는 중..." />
    <br />
    <LoadingBar type="spinner" size="large" message="처리 중입니다..." />
  </div>
);

// 점 로딩
export const Dots = () => (
  <div style={{ padding: '20px' }}>
    <h3>점 로딩</h3>
    <LoadingBar type="dots" size="small" />
    <br />
    <LoadingBar type="dots" size="medium" message="잠시만 기다려주세요" />
    <br />
    <LoadingBar type="dots" size="large" message="업로드 중..." />
  </div>
);

// 바 로딩
export const Bar = () => (
  <div style={{ padding: '20px' }}>
    <h3>바 로딩</h3>
    <LoadingBar type="bar" size="small" />
    <br />
    <LoadingBar type="bar" size="medium" message="파일 처리 중..." />
    <br />
    <LoadingBar type="bar" size="large" message="동기화 중..." />
  </div>
);

// 커스텀 색상
export const CustomColor = () => (
  <div style={{ padding: '20px' }}>
    <h3>커스텀 색상</h3>
    <LoadingBar type="spinner" color="#ff6b6b" message="빨간색 스피너" />
    <br />
    <LoadingBar type="dots" color="#4ecdc4" message="청록색 점들" />
    <br />
    <LoadingBar type="bar" color="#ffa726" message="주황색 바" />
  </div>
);

// 전체 화면 오버레이
export const FullScreen = () => (
  <div style={{ padding: '20px' }}>
    <h3>전체 화면 오버레이 (클릭해서 확인)</h3>
    <button 
      onClick={() => {
        const overlay = document.createElement('div');
        overlay.innerHTML = `
          <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.8);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="display: flex; align-items: center;">
              <div style="
                width: 24px;
                height: 24px;
                border: 2px solid #f3f3f3;
                border-top: 2px solid #4A7C59;
                border-radius: 50%;
                animation: spin 1s linear infinite;
              "></div>
              <div style="margin-left: 12px; color: #666; font-size: 14px;">
                전체 화면 로딩 중...
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(overlay);
        setTimeout(() => document.body.removeChild(overlay), 3000);
      }}
    >
      전체 화면 로딩 보기
    </button>
  </div>
);

// 사용 예시
export const Usage = () => (
  <div style={{ padding: '20px' }}>
    <h3>사용 예시</h3>
    <div style={{ marginBottom: '20px' }}>
      <h4>기본 사용법:</h4>
      <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
{`// 기본 스피너
<LoadingBar />

// 메시지와 함께
<LoadingBar message="로딩 중..." />

// 다른 타입과 크기
<LoadingBar type="dots" size="large" message="처리 중..." />

// 전체 화면 오버레이
<LoadingBar type="spinner" fullScreen message="업로드 중..." />

// 커스텀 색상
<LoadingBar type="spinner" color="#ff6b6b" message="로딩 중..." />`}
      </pre>
    </div>
    
    <div>
      <h4>실제 예시:</h4>
      <LoadingBar type="spinner" message="기본 로딩" />
      <br />
      <LoadingBar type="dots" size="large" message="큰 점 로딩" />
      <br />
      <LoadingBar type="bar" color="#ff6b6b" message="빨간색 바 로딩" />
    </div>
  </div>
); 