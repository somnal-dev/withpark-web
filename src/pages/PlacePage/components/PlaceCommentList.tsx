import { useState } from 'react';
import Card from "@withpark/ui/components/Card";
import Button from "@withpark/ui/components/Button";
import Textarea from "@withpark/ui/components/Textarea";
import usePlaceComments from "../../../api/queries/usePlaceComments";
import useCreatePlaceCommentMutation from "../../../api/mutations/useCreatePlaceCommentMutation";

interface PlaceCommentListProps {
  placeId: number;
}

const PlaceCommentList = ({ placeId }: PlaceCommentListProps) => {
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: commentsData, isLoading, error } = usePlaceComments({
    placeId,
    page: currentPage,
    limit: 10
  });
  
  const createCommentMutation = useCreatePlaceCommentMutation();

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      await createCommentMutation.mutateAsync({
        placeId,
        data: { content: newComment.trim() }
      });
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
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

  return (
    <Card title={`💬 댓글 (${commentsData?.pagination.totalCount || 0})`}>
      {/* 댓글 작성 */}
      <div style={{ marginBottom: '20px' }}>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="이 파크골프장에 대한 후기를 남겨주세요..."
          style={{ marginBottom: '8px' }}
        />
        <div style={{ textAlign: 'right' }}>
          <Button
            variant="primary"
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || createCommentMutation.isPending}
          >
            {createCommentMutation.isPending ? '작성 중...' : '댓글 작성'}
          </Button>
        </div>
      </div>

      {/* 댓글 목록 */}
      {isLoading ? (
        <div style={{ 
          textAlign: 'center', 
          color: '#666', 
          padding: '20px' 
        }}>
          댓글을 불러오는 중...
        </div>
      ) : error ? (
        <div style={{ 
          textAlign: 'center', 
          color: '#666', 
          padding: '20px' 
        }}>
          댓글을 불러오는 중 오류가 발생했습니다.
        </div>
      ) : commentsData?.comments && commentsData.comments.length > 0 ? (
        <>
          {commentsData.comments.map((comment, index) => (
            <div
              key={comment.id}
              style={{
                padding: '16px 0',
                borderBottom: index < commentsData.comments.length - 1 ? '1px solid #f0f0f0' : 'none'
              }}
            >
              {/* 댓글 작성자 */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '8px' 
              }}>
                {comment.userPhoto && (
                  <img
                    src={comment.userPhoto}
                    alt={comment.userNickname}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      marginRight: '8px',
                      objectFit: 'cover'
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontWeight: 'bold', 
                    fontSize: '14px',
                    color: '#333'
                  }}>
                    {comment.userNickname}
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#666' 
                  }}>
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
              </div>
              
              {/* 댓글 내용 */}
              <div style={{
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#333',
                whiteSpace: 'pre-wrap'
              }}>
                {comment.content}
              </div>
            </div>
          ))}

          {/* 페이지네이션 */}
          {commentsData.pagination.totalPages > 1 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '8px',
              marginTop: '20px' 
            }}>
              <Button
                variant="secondary"
                onClick={() => setCurrentPage(prev => prev - 1)}
                disabled={!commentsData.pagination.hasPrev}
                style={{ fontSize: '12px' }}
              >
                이전
              </Button>
              <span style={{ 
                display: 'flex', 
                alignItems: 'center', 
                fontSize: '14px',
                color: '#666'
              }}>
                {currentPage} / {commentsData.pagination.totalPages}
              </span>
              <Button
                variant="secondary"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!commentsData.pagination.hasNext}
                style={{ fontSize: '12px' }}
              >
                다음
              </Button>
            </div>
          )}
        </>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          color: '#666', 
          padding: '40px 20px' 
        }}>
          <div style={{ fontSize: '16px', marginBottom: '8px' }}>
            아직 댓글이 없습니다
          </div>
          <div style={{ fontSize: '14px' }}>
            첫 번째 댓글을 작성해보세요!
          </div>
        </div>
      )}
    </Card>
  );
};

export default PlaceCommentList; 