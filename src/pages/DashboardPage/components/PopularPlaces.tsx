import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "@withpark/ui/components/Card";
import Button from "@withpark/ui/components/Button";
import Select from "@withpark/ui/components/Select";
import LoadingBar from "@withpark/ui/components/LoadingBar";
import usePopularPlaces from "../../../api/queries/usePopularPlaces";
import type { Place } from "../../../types/place";
import IconButton from "@withpark/ui/components/IconButton";
import { LikeIcon } from "@withpark/assets/icons/LikeIcon";
import { CommentIcon } from "@withpark/assets/icons/CommentIcon";
import { GolfIcon } from "@withpark/assets/icons/GolfIcon";
import { PlaceIcon } from "@withpark/assets/icons/PlaceIcon";

const PopularPlaces = () => {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const navigate = useNavigate();
  
  const { data: popularPlaces, isLoading, error } = usePopularPlaces({
    limit: 5,
    area: selectedArea || undefined
  });

  // 지역 옵션들
  const areaOptions = [
    { value: '', label: '전체' },
    ...['서울', '경기', '인천', '강원', '충북', '충남', '대전', '세종',
      '전북', '전남', '광주', '경북', '경남', '대구', '울산', '부산', '제주']
      .map(area => ({ value: area, label: area }))
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleAreaChange = (value: string | number) => {
    setSelectedArea(value.toString());
  };

  const handlePlaceClick = (placeId: number) => {
    navigate(`/place?id=${placeId}`);
  };

  return (
    <Card 
      title="🔥 인기 파크골프장"
      titleAction={
        <Select
          options={areaOptions}
          value={selectedArea}
          onChange={handleAreaChange}
          size="small"
          placeholder="지역 선택"
        />
      }
    >
      {isLoading ? (
        <LoadingBar type="dots" message="인기 파크골프장을 불러오는 중..." />
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
          {popularPlaces.map((place, _) => (
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
                      <PlaceIcon size={14} /> {place.address.length > 30 ? `${place.address.substring(0, 30)}...` : place.address}
                    </div>
                  )}
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    fontSize: '11px',
                    color: '#888'
                  }}>
                    {place.clubSize && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <GolfIcon size={16} /> {place.clubSize}
                      </span>
                    )}
                    {place.holeCount && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <GolfIcon size={16} /> {place.holeCount}
                      </span>
                    )}
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
                    <span style={{ color: '#ff6b6b', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <IconButton
                        icon={<LikeIcon fill={false} />}
                        readonly
                        size="small"
                        variant="ghost"
                      >
                        {place.likeCount}
                      </IconButton>
                    </span>
                    <span style={{ color: '#000000', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <CommentIcon size={14} /> {place.commentCount}
                    </span>
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
    </Card>
  );
};

export default PopularPlaces; 