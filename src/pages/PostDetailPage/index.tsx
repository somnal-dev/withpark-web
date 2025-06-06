import { useParams, useNavigate } from 'react-router-dom';
import Button from "@withpark/ui/components/Button";
import Card from "@withpark/ui/components/Card";
import usePost from "../../api/queries/usePost";
import useToggleLikeMutation from "../../api/mutations/useToggleLikeMutation";
import CommentList from "../CommunityPage/components/CommentList";
import { useState, useEffect } from 'react';

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = usePost(Number(postId));
  const toggleLikeMutation = useToggleLikeMutation();
  const [isLiked, setIsLiked] = useState(false);

  // 게시글 데이터가 로드되면 좋아요 상태 업데이트
  useEffect(() => {
    if (post) {
      setIsLiked(post.isLiked || false);
    }
  }, [post]);

  const handleLike = async () => {
    if (!post) return;
    
    try {
      const result = await toggleLikeMutation.mutateAsync(post.id);
      setIsLiked(result.isLiked);
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
    }
  };

  const handleBackToList = () => {
    navigate('/community');
  };

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

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: '#666'
      }}>
        게시글을 불러오는 중...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        color: '#666',
        gap: '16px'
      }}>
        <div>게시글을 찾을 수 없습니다.</div>
        <Button variant="primary" onClick={handleBackToList}>
          목록으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {/* 뒤로가기 버튼 */}
      <div style={{ marginBottom: '24px' }}>
        <Button variant="secondary" onClick={handleBackToList}>
          ← 목록으로 돌아가기
        </Button>
      </div>

      {/* 게시글 상세 정보 */}
      <Card>
        <div style={{ padding: '24px' }}>
          {/* 작성자 정보 */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            {post.user.photo && (
              <img
                src={post.user.photo}
                alt={post.user.nickname}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  marginRight: '12px',
                  objectFit: 'cover'
                }}
              />
            )}
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                {post.user.nickname}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {formatDate(post.createdAt)}
              </div>
            </div>
          </div>

          {/* 게시글 제목 */}
          <h1 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '24px', 
            fontWeight: 'bold',
            lineHeight: '1.3'
          }}>
            {post.title}
          </h1>

          {/* 게시글 내용 */}
          <div style={{ 
            margin: '0 0 20px 0', 
            color: '#333', 
            lineHeight: '1.6',
            fontSize: '16px',
            whiteSpace: 'pre-wrap'
          }}>
            {post.content}
          </div>

          {/* 이미지 */}
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="게시글 이미지"
              style={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '20px'
              }}
            />
          )}

          {/* 통계 및 액션 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '16px 0',
            borderTop: '1px solid #eee'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Button
                variant={isLiked ? "primary" : "secondary"}
                onClick={handleLike}
                disabled={toggleLikeMutation.isPending}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {isLiked ? '❤️' : '🤍'} {post.likeCount}
              </Button>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                fontSize: '14px',
                color: '#666'
              }}>
                💬 {post.commentCount}
              </div>
            </div>

            <div style={{ fontSize: '14px', color: '#666' }}>
              👁 {post.viewCount} 조회
            </div>
          </div>
        </div>
      </Card>

      {/* 댓글 섹션 */}
      <div style={{ marginTop: '32px' }}>
        <CommentList postId={post.id} />
      </div>
    </div>
  );
};

export default PostDetailPage; 