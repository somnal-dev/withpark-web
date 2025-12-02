import { useState } from "react";
import CommentSection from "@withpark/ui/components/CommentSection";
import useComments from "../../../api/queries/useComments";
import useCreateCommentMutation from "../../../api/mutations/useCreateCommentMutation";
import useUpdateCommentMutation from "../../../api/mutations/useUpdateCommentMutation";
import useDeleteCommentMutation from "../../../api/mutations/useDeleteCommentMutation";
import type { Comment, Post } from "../../../types/post";
import useUserInfo from "@withpark/api/queries/useUserInfo";
import { User } from "@withpark/types/user";

interface CommentListProps {
  post: Post;
}

const CommentList = ({ post }: CommentListProps) => {
  const { data: commentsData, isLoading } = useComments({
    postId: post.id,
  });

  const { data: user } = useUserInfo();

  const createCommentMutation = useCreateCommentMutation();
  const updateCommentMutation = useUpdateCommentMutation();
  const deleteCommentMutation = useDeleteCommentMutation();

  const [newComment, setNewComment] = useState("");
  const [deletingCommentDocumentId, setDeletingCommentDocumentId] = useState<
    string | null
  >(null);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (user == null) return;

    try {
      await createCommentMutation.mutateAsync({
        postId: post.id,
        content: newComment.trim(),
      });
      setNewComment("");
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleEditComment = async (
    commentDocumentId: string,
    content: string
  ) => {
    const comment = commentsData?.data.find(
      (c) => c.documentId === commentDocumentId
    );
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

  const handleDeleteComment = async (commentDocumentId: string) => {
    const comment = commentsData?.data.find(
      (c) => c.documentId === commentDocumentId
    );
    if (!comment) return;

    setDeletingCommentDocumentId(commentDocumentId);
    try {
      await deleteCommentMutation.mutateAsync({
        commentDocumentId: comment.documentId,
      });
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    } finally {
      setDeletingCommentDocumentId(null);
    }
  };

  const getUserInfo = (comment: Comment) => {
    const defaultUser: User = {
      id: 0,
      documentId: "",
      createdAt: "",
      updatedAt: "",
      username: "",
      nickname: "익명",
      photo: null,
      onboardingDone: false,
    };

    return comment.user ?? defaultUser;
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
      isDeletingId={deletingCommentDocumentId ?? undefined}
      currentUserId={user?.id}
    />
  );
};

export default CommentList;
