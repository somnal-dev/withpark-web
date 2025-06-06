import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from "@withpark/ui/components/Card";
import Button from "@withpark/ui/components/Button";
import usePopularPosts from "../../../api/queries/usePopularPosts";
import type { PopularPeriod } from "../../../types/community";

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
    <Card title="🔥 인기 게시글">
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
        <div style={{ 
          textAlign: 'center', 
          color: '#666', 
          padding: '20px' 
        }}>
          로딩 중...
        </div>
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
                  {/* 순위 표시 */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{
                      minWidth: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: index < 3 ? '#ff6b6b' : '#868e96',
                      color: 'white',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginTop: '2px'
                    }}>
                      {index + 1}
                    </div>
                    
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
                        <span>👁 {post.viewCount}</span>
                        <span>•</span>
                        <span>❤️ {post.likeCount}</span>
                        {post.popularityScore && (
                          <>
                            <span>•</span>
                            <span style={{ color: '#ff6b6b', fontWeight: '500' }}>
                              🔥 {post.popularityScore}
                            </span>
                          </>
                        )}
                        <span>•</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* 더보기 버튼 */}
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Button
                  variant="secondary"
                  onClick={handleViewMore}
                  style={{ fontSize: '12px' }}
                >
                  커뮤니티 전체보기
                </Button>
              </div>
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