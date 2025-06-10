import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Button from "@withpark/ui/components/Button";
import Input from "@withpark/ui/components/Input";
import Card from "@withpark/ui/components/Card";
import LoadingBar from "@withpark/ui/components/LoadingBar";
import usePlaces from "../../api/queries/usePlaces";
import usePlace from "../../api/queries/usePlace";
import PlaceCard from "./components/PlaceCard";
import PlaceCommentList from "./components/PlaceCommentList";
import { GolfIcon } from "@withpark/assets/icons/GolfIcon";
import { LikeIcon } from "@withpark/assets/icons/LikeIcon";
import { CommentIcon } from "@withpark/assets/icons/CommentIcon";
import { PlaceIcon } from "@withpark/assets/icons/PlaceIcon";

const PlacePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [actualSearchQuery, setActualSearchQuery] = useState('');
  const [actualSelectedArea, setActualSelectedArea] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const navigate = useNavigate();

  // URL 파라미터에서 placeId 읽기
  useEffect(() => {
    const placeIdParam = searchParams.get('id');
    if (placeIdParam) {
      const placeId = parseInt(placeIdParam, 10);
      if (!isNaN(placeId)) {
        setSelectedPlaceId(placeId);
      }
    }
  }, [searchParams]);

  const { data: placesData, isLoading, error } = usePlaces({
    page: currentPage,
    limit: 12,
    search: actualSearchQuery,
    area: actualSelectedArea,
  });

  const { data: selectedPlace } = usePlace(selectedPlaceId);

  // 지역 옵션들
  const areas = [
    '서울', '경기', '인천', '강원', '충북', '충남', '대전', '세종',
    '전북', '전남', '광주', '경북', '경남', '대구', '울산', '부산', '제주'
  ];

  const handleSearch = () => {
    setActualSearchQuery(searchQuery);
    setActualSelectedArea(selectedArea);
    setCurrentPage(1);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceClick = (placeId: number) => {
    navigate(`/place/${placeId}`);
  };

  const handleBackToList = () => {
    setSelectedPlaceId(null);
    // URL 파라미터에서 id 제거
    searchParams.delete('id');
    setSearchParams(searchParams);
  };

  const renderPagination = () => {
    if (!placesData || placesData.pagination.totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(placesData.pagination.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "primary" : "secondary"}
          onClick={() => handlePageChange(i)}
          style={{ minWidth: '40px' }}
        >
          {i}
        </Button>
      );
    }

    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '8px', 
        margin: '24px 0',
        flexWrap: 'wrap'
      }}>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          처음
        </Button>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!placesData.pagination.hasPrev}
        >
          이전
        </Button>
        {pages}
        <Button
          variant="secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!placesData.pagination.hasNext}
        >
          다음
        </Button>
        <Button
          variant="secondary"
          onClick={() => handlePageChange(placesData.pagination.totalPages)}
          disabled={currentPage === placesData.pagination.totalPages}
        >
          마지막
        </Button>
      </div>
    );
  };

  // 상세 페이지 렌더링
  if (selectedPlaceId && selectedPlace) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        {/* 뒤로가기 버튼 */}
        <div style={{ marginBottom: '24px' }}>
          <Button variant="secondary" onClick={handleBackToList}>
            ← 목록으로 돌아가기
          </Button>
        </div>

        {/* 파크골프장 상세 정보 */}
        <Card>
          <div style={{ padding: '24px' }}>
            <div style={{ 
              display: 'inline-block',
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '12px'
            }}>
              {selectedPlace.area}
            </div>
            
            <h1 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '28px', 
              fontWeight: 'bold',
              color: '#333'
            }}>
              {selectedPlace.golfClubName}
            </h1>

            {selectedPlace.address && (
              <div style={{ 
                fontSize: '16px', 
                color: '#666',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <PlaceIcon size={16} /> {selectedPlace.address}
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              gap: '20px',
              marginBottom: '20px',
              fontSize: '15px',
              color: '#555'
            }}>
              {selectedPlace.clubSize && (
                <span>🏌️ 규모: {selectedPlace.clubSize}</span>
              )}
              {selectedPlace.holeCount && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <GolfIcon size={16} /> 홀 수: {selectedPlace.holeCount}
                </span>
              )}
            </div>

            {/* 통계 정보 */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              padding: '16px 0',
              borderTop: '1px solid #eee'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                fontSize: '14px',
                color: '#666'
              }}>
                <LikeIcon fill={false} /> {selectedPlace.likeCount} 좋아요
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                fontSize: '14px',
                color: '#666'
              }}>
                <CommentIcon size={16} /> {selectedPlace.commentCount} 댓글
              </div>
            </div>
          </div>
        </Card>

        {/* 댓글 섹션 */}
        <div style={{ marginTop: '32px' }}>
          <PlaceCommentList placeId={selectedPlace.id} id={0} content={''} createdAt={''} userNickname={''} userId={''} />
        </div>
      </div>
    );
  }

  // 목록 페이지 렌더링
  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: '#666'
      }}>
        파크골프장 정보를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* 헤더 */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>
          🏌️ 파크골프장
        </h1>
        
        {/* 검색 및 필터 */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', gap: '8px' }}>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              placeholder="골프장명, 주소로 검색..."
              style={{ flex: 1 }}
            />
          </div>
          
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            <option value="">전체 지역</option>
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
          
          <Button variant="secondary" onClick={handleSearch}>
            검색
          </Button>
        </div>

        {/* 검색 결과 정보 */}
        {(actualSearchQuery || actualSelectedArea) && (
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            {actualSelectedArea && `'${actualSelectedArea}' 지역`}
            {actualSearchQuery && ` '${actualSearchQuery}' 검색`} 결과: {placesData?.pagination.totalCount || 0}개
            <Button
              variant="secondary"
              onClick={() => {
                setActualSearchQuery('');
                setActualSelectedArea('');
                setSearchQuery('');
                setSelectedArea('');
                setCurrentPage(1);
              }}
              style={{ marginLeft: '8px', fontSize: '12px', padding: '4px 8px' }}
            >
              초기화
            </Button>
          </div>
        )}
      </div>

      {/* 로딩 상태 */}
      {isLoading ? (
        <LoadingBar 
          type="dots"
          size="large" 
          message="파크골프장을 불러오는 중..." 
        />
      ) : (
        <>
          {/* 파크골프장 목록 */}
          {placesData?.places && placesData.places.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px',
              marginBottom: '24px'
            }}>
              {placesData.places.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onPlaceClick={handlePlaceClick}
                />
              ))}
            </div>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              color: '#666', 
              padding: '60px 20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px'
            }}>
              {actualSearchQuery || actualSelectedArea ? (
                <>
                  <div style={{ fontSize: '18px', marginBottom: '8px' }}>
                    검색 결과가 없습니다
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    다른 조건으로 검색해보세요
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '18px', marginBottom: '8px' }}>
                    파크골프장 정보가 없습니다
                  </div>
                  <div style={{ fontSize: '14px' }}>
                    곧 업데이트 예정입니다
                  </div>
                </>
              )}
            </div>
          )}

          {/* 페이지네이션 */}
          {renderPagination()}
        </>
      )}
    </div>
  );
};

export default PlacePage;