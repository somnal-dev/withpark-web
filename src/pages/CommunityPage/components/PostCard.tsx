import { useState } from 'react';
import Card from "@withpark/ui/components/Card";
import Button from "@withpark/ui/components/Button";
import useToggleLikeMutation from "../../../api/mutations/useToggleLikeMutation";
import type { Post } from "../../../types/community";

interface PostCardProps {
  post: Post;
  onPostClick?: (postId: number) => void;
}

const PostCard = ({ post, onPostClick }: PostCardProps) => {
  const toggleLikeMutation = useToggleLikeMutation();
  const [isLiked, setIsLiked] = useState(post.isLiked || false);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 게시물 클릭 이벤트 방지
    try {
      const result = await toggleLikeMutation.mutateAsync(post.id);
      setIsLiked(result.isLiked);
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
    }
  };

  const handlePostClick = () => {
    onPostClick?.(post.id);
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 게시물 클릭 이벤트 방지
    onPostClick?.(post.id);
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

  return (
    <Card style={{ cursor: 'pointer' }} onClick={handlePostClick}>
      <div style={{ padding: '16px' }}>
        {/* 작성자 정보 */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          {post.user.photo && (
            <img
              src={post.user.photo}
              alt={post.user.nickname}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                marginRight: '8px',
                objectFit: 'cover'
              }}
            />
          )}
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
              {post.user.nickname}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>

        {/* 게시글 내용 */}
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
          {post.title}
        </h3>
        <p style={{ 
          margin: '0 0 12px 0', 
          color: '#333', 
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {post.content}
        </p>

        {/* 이미지 */}
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="게시글 이미지"
            style={{
              width: '100%',
              maxHeight: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '12px'
            }}
          />
        )}

        {/* 액션 버튼들 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button
            variant={isLiked ? "primary" : "secondary"}
            onClick={handleLike}
            disabled={toggleLikeMutation.isPending}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            {isLiked ? '❤️' : '🤍'} {post.likeCount}
          </Button>

          <Button
            variant="secondary"
            onClick={handleCommentClick}
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            💬 {post.commentCount}
          </Button>

          <div style={{ fontSize: '14px', color: '#666' }}>
            👁 {post.viewCount}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCard; 