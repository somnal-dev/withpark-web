import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "@withpark/ui/components/Card";
import Button from "@withpark/ui/components/Button";
import usePopularPlaces from "../../../api/queries/usePopularPlaces";
import type { Place } from "../../../types/place";

const PopularPlaces = () => {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const navigate = useNavigate();
  
  const { data: popularPlaces, isLoading, error } = usePopularPlaces({
    limit: 5,
    area: selectedArea || undefined
  });

  // 지역 옵션들
  const areas = [
    '서울', '경기', '인천', '강원', '충북', '충남', '대전', '세종',
    '전북', '전남', '광주', '경북', '경남', '대구', '울산', '부산', '제주'
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleAreaChange = (area: string) => {
    setSelectedArea(area === selectedArea ? '' : area);
  };

  const handleViewAllPlaces = () => {
    navigate('/place');
  };

  const handlePlaceClick = (placeId: number) => {
    navigate(`/place?id=${placeId}`);
  };

  return (
    <Card 
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>🔥 인기 파크골프장</span>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            style={{
              padding: '4px 8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '12px',
              backgroundColor: '#f8f9fa'
            }}
          >
            <option value="">전체</option>
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
      }
    >
      {isLoading ? (
        <div style={{ 
          textAlign: 'center', 
          color: '#666', 
          padding: '20px',
          fontSize: '14px' 
        }}>
          인기 파크골프장을 불러오는 중...
        </div>
      ) : error ? (
        <div style={{ 
          textAlign: 'center', 
          color: '#999', 
          padding: '20px',
          fontSize: '14px'
        }}>
          데이터를 불러올 수 없습니다
        </div>
      ) : popularPlaces && popularPlaces.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {popularPlaces.map((place, index) => (
            <div
              key={place.id}
              style={{
                padding: '12px',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f8ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fafafa';
              }}
              onClick={() => handlePlaceClick(place.id)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '20px',
                      height: '20px',
                      backgroundColor: index < 3 ? '#ff6b6b' : '#4ecdc4',
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </span>
                    <div style={{
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontSize: '10px',
                      fontWeight: '500'
                    }}>
                      {place.area}
                    </div>
                  </div>
                  
                  <div style={{ 
                    fontWeight: 'bold', 
                    fontSize: '14px',
                    color: '#333',
                    marginBottom: '4px'
                  }}>
                    {place.golfClubName}
                  </div>
                  
                  {place.address && (
                    <div style={{ 
                      fontSize: '11px', 
                      color: '#666',
                      marginBottom: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      📍 {place.address.length > 30 ? `${place.address.substring(0, 30)}...` : place.address}
                    </div>
                  )}
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    fontSize: '11px',
                    color: '#888'
                  }}>
                    {place.clubSize && <span>🏌️ {place.clubSize}</span>}
                    {place.holeCount && <span>⛳ {place.holeCount}</span>}
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    fontSize: '11px'
                  }}>
                    <span style={{ color: '#ff6b6b' }}>❤️ {place.likeCount}</span>
                    <span style={{ color: '#4ecdc4' }}>💬 {place.commentCount}</span>
                  </div>
                  <div style={{ 
                    fontSize: '9px', 
                    color: '#aaa' 
                  }}>
                    {formatDate(place.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          color: '#666', 
          padding: '30px 20px',
          fontSize: '14px'
        }}>
          {selectedArea ? `'${selectedArea}' 지역의 인기 파크골프장이 없습니다` : '인기 파크골프장이 없습니다'}
        </div>
      )}
      
      {popularPlaces && popularPlaces.length > 0 && (
        <div style={{ 
          marginTop: '16px', 
          paddingTop: '12px', 
          borderTop: '1px solid #f0f0f0',
          textAlign: 'center'
        }}>
          <Button
            variant="secondary"
            onClick={handleViewAllPlaces}
            style={{ 
              fontSize: '12px', 
              padding: '6px 16px' 
            }}
          >
            전체 파크골프장 보기 →
          </Button>
        </div>
      )}
    </Card>
  );
};

export default PopularPlaces; 