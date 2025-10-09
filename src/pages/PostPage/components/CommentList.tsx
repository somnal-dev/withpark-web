import { useState } from "react";
import CommentSection from "@withpark/ui/components/CommentSection";
import useComments from "../../../api/queries/useComments";
import useCreateCommentMutation from "../../../api/mutations/useCreateCommentMutation";
import useUpdateCommentMutation from "../../../api/mutations/useUpdateCommentMutation";
import useDeleteCommentMutation from "../../../api/mutations/useDeleteCommentMutation";
import type { Comment, Post } from "../../../types/post";
import useUserInfo from "@withpark/api/queries/useUserInfo";

interface CommentListProps {
  post: Post;
}

const CommentList = ({ post }: CommentListProps) => {
  const { data: commentsData, isLoading } = useComments({
    postDocumentId: post.documentId,
  });

  const { data: user } = useUserInfo();

  const createCommentMutation = useCreateCommentMutation();
  const updateCommentMutation = useUpdateCommentMutation();
  const deleteCommentMutation = useDeleteCommentMutation();

  const [newComment, setNewComment] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null
  );

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (user == null) return;

    try {
      await createCommentMutation.mutateAsync({
        userId: user?.id,
        postDocumentId: post.documentId,
        content: newComment.trim(),
      });
      setNewComment("");
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleEditComment = async (commentId: number, content: string) => {
    const comment = commentsData?.data.find((c) => c.id === commentId);
    if (!comment) return;

    try {
      await updateCommentMutation.mutateAsync({
        commentDocumentId: comment.documentId,
        content,
      });
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const comment = commentsData?.data.find((c) => c.id === commentId);
    if (!comment) return;

    setDeletingCommentId(commentId);
    try {
      await deleteCommentMutation.mutateAsync({
        commentDocumentId: comment.documentId,
      });
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    } finally {
      setDeletingCommentId(null);
    }
  };

  const getUserInfo = (comment: Comment) => {
    if (!comment.user) {
      return { nickname: "익명", photo: undefined };
    }

    return {
      nickname: comment?.user?.nickname ?? "알수없음",
      photo: comment?.user.photo?.url,
    };
  };

  return (
    <CommentSection<Comment>
      title="댓글"
      comments={commentsData?.data || []}
      totalCount={commentsData?.meta?.pagination?.total || 0}
      isLoading={isLoading}
      newComment={newComment}
      onNewCommentChange={setNewComment}
      onSubmitComment={handleSubmitComment}
      isSubmitting={createCommentMutation.isPending}
      placeholder="댓글을 입력해주세요..."
      getUserInfo={getUserInfo}
      onEditComment={handleEditComment}
      onDeleteComment={handleDeleteComment}
      isEditing={updateCommentMutation.isPending}
      isDeletingId={deletingCommentId ?? undefined}
      currentUserId={user?.id}
    />
  );
};

export default CommentList;
