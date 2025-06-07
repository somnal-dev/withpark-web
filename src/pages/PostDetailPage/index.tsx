import { useParams } from 'react-router-dom';
import Button from "@withpark/ui/components/Button";
import Card from "@withpark/ui/components/Card";
import usePost from "../../api/queries/usePost";
import useToggleLikeMutation from "../../api/mutations/useToggleLikeMutation";
import CommentList from "../CommunityPage/components/CommentList";
import { useState, useEffect } from 'react';
import IconButton from "@withpark/ui/components/IconButton";
import LoadingBar from "@withpark/ui/components/LoadingBar";
import { LikeIcon } from "@withpark/assets/icons/LikeIcon";
import { CommentIcon } from "@withpark/assets/icons/CommentIcon";

const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
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
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingBar type="spinner" size="large" message="게시글을 불러오는 중..." />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card>
          <h2 style={{ color: '#666', marginBottom: '1rem' }}>게시글을 찾을 수 없습니다</h2>
          <p style={{ color: '#999' }}>삭제되었거나 존재하지 않는 게시글입니다.</p>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      minHeight: '80vh'
    }}>
      <Card>
        {/* 제목 */}
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          color: '#2d3748',
          marginBottom: '12px',
          lineHeight: '1.3'
        }}>
          {post.title}
        </h1>

        {/* 작성자 정보 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          paddingBottom: '16px',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '24px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#4A7C59',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            {post.user.nickname.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: '600', color: '#2d3748' }}>
              {post.user.nickname}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#718096' }}>
              {formatDate(post.createdAt)} • 조회수 {post.viewCount}
            </div>
          </div>
        </div>

        {/* 내용 */}
        <div style={{
          fontSize: '1rem',
          lineHeight: '1.7',
          color: '#4a5568',
          marginBottom: '32px',
          minHeight: '200px'
        }}>
          {post.content?.split('\n').map((line, index) => (
            <p key={index} style={{ margin: '0 0 16px 0' }}>
              {line || '\u00A0'}
            </p>
          ))}
        </div>

        {/* 첨부 이미지 */}
        {post.imageUrl && (
          <div style={{ marginBottom: '24px' }}>
            <img 
              src={post.imageUrl} 
              alt="첨부 이미지"
              style={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}
            />
          </div>
        )}

        {/* 좋아요/댓글 정보 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <IconButton
              icon={<LikeIcon fill={isLiked} />}
              active={isLiked}
              onClick={handleLike}
              loading={toggleLikeMutation.isPending}
              variant="secondary"
              size="medium"
            >
              {post.likeCount}
            </IconButton>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#718096',
              fontSize: '0.875rem'
            }}>
              <CommentIcon size={16} /> {post.commentCount} 댓글
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" style={{ fontSize: '0.875rem' }}>
              공유
            </Button>
            <Button variant="secondary" style={{ fontSize: '0.875rem' }}>
              신고
            </Button>
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