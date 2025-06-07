import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "@withpark/ui/components/Card";
import Button from "@withpark/ui/components/Button";
import LoadingBar from "@withpark/ui/components/LoadingBar";
import usePopularPosts from "../../../api/queries/usePopularPosts";
import type { PopularPeriod } from "../../../types/community";
import IconButton from "@withpark/ui/components/IconButton";
import { LikeIcon } from "@withpark/assets/icons/LikeIcon";
import { ViewIcon } from "@withpark/assets/icons/ViewIcon";

const PopularPosts = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<PopularPeriod>('week');
  
  const { data: popularData, isLoading, error } = usePopularPosts({
    limit: 5,
    period: selectedPeriod
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handlePostClick = (postId: number) => {
    navigate(`/community/${postId}`);
  };

  const handleViewMore = () => {
    navigate('/community');
  };

  const periodLabels = {
    day: '오늘',
    week: '이번주',
    month: '이번달',
    all: '전체'
  };

  if (error) {
    return (
      <Card title="🔥 인기 게시글">
        <div style={{ 
          textAlign: 'center', 
          color: '#666', 
          padding: '20px' 
        }}>
          데이터를 불러올 수 없습니다.
        </div>
      </Card>
    );
  }

  return (
    <Card 
      title="인기 게시글"
      titleAction={
        <Button
          variant="secondary"
          onClick={handleViewMore}
          style={{ 
            fontSize: '12px', 
            padding: '6px 12px' 
          }}
        >
          더보기 →
        </Button>
      }
    >
      {/* 기간 선택 버튼들 */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '16px',
        flexWrap: 'wrap'
      }}>
        {Object.entries(periodLabels).map(([period, label]) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "primary" : "secondary"}
            onClick={() => setSelectedPeriod(period as PopularPeriod)}
            style={{ fontSize: '12px', padding: '4px 8px' }}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* 로딩 상태 */}
      {isLoading ? (
        <LoadingBar type="bar" message="인기 게시글을 불러오는 중..." />
      ) : (
        <>
          {/* 인기게시글 목록 */}
          {popularData?.posts && popularData.posts.length > 0 ? (
            <>
              {popularData.posts.map((post, index) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post.id)}
                  style={{
                    padding: '12px 0',
                    borderBottom: index < popularData.posts.length - 1 ? '1px solid #f0f0f0' : 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {/* 메인 컨텐츠 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      {/* 제목 */}
                      <div style={{
                        fontWeight: '500',
                        fontSize: '14px',
                        lineHeight: '1.4',
                        marginBottom: '4px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {post.title}
                      </div>
                      
                      {/* 메타 정보 */}
                      <div style={{
                        fontSize: '12px',
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap'
                      }}>
                        <span>{post.user.nickname}</span>
                        <span>•</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <ViewIcon size={14} /> {post.viewCount}
                        </div>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <IconButton
                            icon={<LikeIcon fill={false} />}
                            readonly
                            size="small"
                            variant="ghost"
                          >
                            {post.likeCount}
                          </IconButton>
                        </span>
                        <span>•</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div style={{ 
              textAlign: 'center', 
              color: '#666', 
              padding: '20px' 
            }}>
              {selectedPeriod === 'day' && '오늘'}
              {selectedPeriod === 'week' && '이번주'}
              {selectedPeriod === 'month' && '이번달'}
              {selectedPeriod === 'all' && ''}
              인기 게시글이 없습니다.
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default PopularPosts; 