import { useState } from 'react';
import CommentSection from "@withpark/ui/components/CommentSection";
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

  const getUserInfo = (comment: Comment) => ({
    nickname: comment.user.nickname,
    photo: comment.user.photo
  });

  return (
    <CommentSection<Comment>
      title="댓글"
      comments={commentsData?.comments || []}
      totalCount={commentsData?.totalCount || 0}
      isLoading={isLoading}
      newComment={newComment}
      onNewCommentChange={setNewComment}
      onSubmitComment={handleSubmitComment}
      isSubmitting={createCommentMutation.isPending}
      placeholder="댓글을 입력해주세요..."
      getUserInfo={getUserInfo}
    />
  );
};

export default CommentList; 