import Button from "../Button";
import Textarea from "../Textarea";

interface BaseComment {
  id: number;
  content: string;
  createdAt: string;
}

interface PostComment extends BaseComment {
  user: {
    nickname: string;
    photo?: string;
  };
}

interface PlaceComment extends BaseComment {
  userNickname: string;
  userPhoto?: string;
}

interface PaginationData {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface CommentSectionProps<T extends BaseComment> {
  title: string;
  comments: T[];
  totalCount: number;
  isLoading: boolean;
  newComment: string;
  onNewCommentChange: (value: string) => void;
  onSubmitComment: () => void;
  isSubmitting: boolean;
  placeholder?: string;
  pagination?: PaginationData;
  onPageChange?: (page: number) => void;
  getUserInfo: (comment: T) => { nickname: string; photo?: string };
}

const CommentSection = <T extends BaseComment>({
  title,
  comments,
  totalCount,
  isLoading,
  newComment,
  onNewCommentChange,
  onSubmitComment,
  isSubmitting,
  placeholder = "댓글을 입력해주세요...",
  pagination,
  onPageChange,
  getUserInfo
}: CommentSectionProps<T>) => {
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
    <div>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
        {title} ({totalCount})
      </h3>
      
      {/* 댓글 작성 폼 */}
      <div style={{ marginBottom: '24px' }}>
        <Textarea
          value={newComment}
          onChange={(e: any) => onNewCommentChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{ marginBottom: '8px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="primary"
            onClick={onSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
          >
            {isSubmitting ? '작성 중...' : '댓글 작성'}
          </Button>
        </div>
      </div>

      {/* 댓글 목록 */}
      {isLoading ? (
        <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          댓글을 불러오는 중...
        </div>
      ) : comments.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {comments.map((comment, _) => {
            const userInfo = getUserInfo(comment);
            return (
              <div
                key={comment.id}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e9ecef'
                }}
              >
                {/* 댓글 작성자 정보 */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  {userInfo.photo && (
                    <img
                      src={userInfo.photo}
                      alt={userInfo.nickname}
                      style={{
                        width: '32px',
                        height: '32px',
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
                      color: '#333',
                      marginBottom: '2px'
                    }}>
                      {userInfo.nickname}
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
            );
          })}

          {/* 페이지네이션 */}
          {pagination && pagination.totalPages > 1 && onPageChange && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '8px',
              marginTop: '20px' 
            }}>
              <Button
                variant="secondary"
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
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
                {pagination.currentPage} / {pagination.totalPages}
              </span>
              <Button
                variant="secondary"
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
                style={{ fontSize: '12px' }}
              >
                다음
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          color: '#666', 
          padding: '40px 20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ fontSize: '16px', marginBottom: '8px' }}>
            아직 댓글이 없습니다
          </div>
          <div style={{ fontSize: '14px' }}>
            첫 번째 댓글을 작성해보세요!
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
export type { PostComment, PlaceComment, PaginationData }; 