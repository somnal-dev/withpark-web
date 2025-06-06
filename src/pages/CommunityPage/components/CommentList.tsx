import { useState } from 'react';
import Card from "@withpark/ui/components/Card";
import Button from "@withpark/ui/components/Button";
import Textarea from "@withpark/ui/components/Textarea";
import useComments from "../../../api/queries/useComments";
import useCreateCommentMutation from "../../../api/mutations/useCreateCommentMutation";
import type { Comment } from "../../../types/community";

interface CommentListProps {
  postId: number;
}

const CommentList = ({ postId }: CommentListProps) => {
  const { data: commentsData, isLoading } = useComments({ postId });
  const createCommentMutation = useCreateCommentMutation();
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      await createCommentMutation.mutateAsync({
        postId,
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

  if (isLoading) {
    return <div>댓글을 불러오는 중...</div>;
  }

  return (
    <Card title={`댓글 (${commentsData?.totalCount || 0})`}>
      <div style={{ padding: '16px' }}>
        {/* 댓글 작성 폼 */}
        <div style={{ marginBottom: '24px' }}>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력해주세요..."
            rows={3}
            style={{ marginBottom: '8px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="primary"
              onClick={handleSubmitComment}
              disabled={createCommentMutation.isPending}
            >
              {createCommentMutation.isPending ? '작성 중...' : '댓글 작성'}
            </Button>
          </div>
        </div>

        {/* 댓글 목록 */}
        {commentsData?.comments && commentsData.comments.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {commentsData.comments.map((comment: Comment) => (
              <div
                key={comment.id}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#f5f5f5',
                }}
              >
                {/* 댓글 작성자 정보 */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  {comment.user.photo && (
                    <img
                      src={comment.user.photo}
                      alt={comment.user.nickname}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        marginRight: '8px',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                  <div>
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                      {comment.user.nickname}
                    </span>
                    <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                </div>

                {/* 댓글 내용 */}
                <p style={{ margin: 0, lineHeight: '1.5', color: '#333' }}>
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#666', padding: '40px 0' }}>
            아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
          </div>
        )}
      </div>
    </Card>
  );
};

export default CommentList; 