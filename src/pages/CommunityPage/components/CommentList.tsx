import { useState } from "react";
import CommentSection from "@withpark/ui/components/CommentSection";
import useComments from "../../../api/queries/useComments";
import useCreateCommentMutation from "../../../api/mutations/useCreateCommentMutation";
import type { Comment, Post } from "../../../types/community";
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
  const [newComment, setNewComment] = useState("");

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
    />
  );
};

export default CommentList;
