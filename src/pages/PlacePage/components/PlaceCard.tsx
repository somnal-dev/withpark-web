import React, { useState } from 'react';
import Card from "@withpark/ui/components/Card";
import Button from "@withpark/ui/components/Button";
import useTogglePlaceLikeMutation from "../../../api/mutations/useTogglePlaceLikeMutation";
import type { Place } from "../../../types/place";
import IconButton from "@withpark/ui/components/IconButton";
import { LikeIcon } from "@withpark/assets/icons/LikeIcon";
import { CommentIcon } from "@withpark/assets/icons/CommentIcon";
import { PlaceIcon } from "@withpark/assets/icons/PlaceIcon";
import { GolfIcon } from "@withpark/assets/icons/GolfIcon";

interface PlaceCardProps {
  place: Place;
  onPlaceClick?: (placeId: number) => void;
}

const PlaceCard = ({ place, onPlaceClick }: PlaceCardProps) => {
  const toggleLikeMutation = useTogglePlaceLikeMutation();
  const [isLiked, setIsLiked] = useState(place.isLiked || false);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    try {
      const result = await toggleLikeMutation.mutateAsync(place.id);
      setIsLiked(result.action === 'liked');
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
    }
  };

  const handleCardClick = () => {
    onPlaceClick?.(place.id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Card 
      style={{ 
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        border: '1px solid #e2e8f0'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
      }}
      onClick={handleCardClick}
    >
      {/* 이미지 섹션 */}
      {place.imageUrl && (
        <div style={{ 
          width: '100%', 
          height: '200px', 
          marginBottom: '16px',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <img 
            src={place.imageUrl} 
            alt={place.golfClubName}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      )}

      {/* 내용 섹션 */}
      <div style={{ padding: place.imageUrl ? '0' : '8px 0' }}>
        {/* 헤더 - 지역과 골프장명 */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{ 
            display: 'inline-block',
            backgroundColor: '#e3f2fd',
            color: '#1976d2',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500',
            marginBottom: '8px'
          }}>
            {place.area}
          </div>
          <h3 style={{ 
            margin: '0', 
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2d3748'
          }}>
            {place.golfClubName}
          </h3>
        </div>

        {/* 골프장 정보 */}
        <div style={{ marginBottom: '12px' }}>
          {place.address && (
            <div style={{ 
              fontSize: '14px', 
              color: '#666',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <PlaceIcon size={14} /> {place.address}
            </div>
          )}
          
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            fontSize: '13px',
            color: '#888'
          }}>
            {place.clubSize && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <GolfIcon size={14} /> {place.clubSize}
              </span>
            )}
            {place.holeCount && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <GolfIcon size={14} /> {place.holeCount}
              </span>
            )}
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <IconButton
              icon={<LikeIcon fill={isLiked} />}
              active={isLiked}
              onClick={handleLike}
              loading={toggleLikeMutation.isPending}
              variant="secondary"
              size="small"
            >
              {place.likeCount}
            </IconButton>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              fontSize: '12px',
              color: '#666'
            }}>
              <CommentIcon size={14} /> {place.commentCount}
            </div>
          </div>

          <div style={{ fontSize: '11px', color: '#aaa' }}>
            {formatDate(place.updatedAt)}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlaceCard; 