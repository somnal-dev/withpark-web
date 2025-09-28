import { useState } from "react";
import CommentSection, {
  PlaceComment,
} from "@withpark/ui/components/CommentSection";
import usePlaceComments from "../../../api/queries/usePlaceComments";
import useCreatePlaceCommentMutation from "../../../api/mutations/useCreatePlaceCommentMutation";

interface PlaceCommentListProps {
  placeId: number;
  placeDocumentId: string;
}

const PlaceCommentList = ({
  placeId,
  placeDocumentId,
}: PlaceCommentListProps) => {
  const [newComment, setNewComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: commentsData,
    isLoading,
    error,
  } = usePlaceComments({
    placeDocumentId: placeDocumentId,
    page: currentPage,
    limit: 10,
  });

  const createCommentMutation = useCreatePlaceCommentMutation();

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    console.log("댓글 작성 시작:", { placeId, content: newComment.trim() });

    try {
      const result = await createCommentMutation.mutateAsync({
        placeDocumentId,
        content: newComment.trim(),
      });
      console.log("댓글 작성 성공:", result);
      setNewComment("");
    } catch (error) {
      console.error("댓글 작성 실패:", error);

      // 더 자세한 에러 정보 표시
      if (error instanceof Error) {
        alert(`댓글 작성에 실패했습니다: ${error.message}`);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        alert(`댓글 작성에 실패했습니다: ${(error as any).message}`);
      } else {
        alert("댓글 작성에 실패했습니다.");
      }
    }
  };

  const getUserInfo = (comment: PlaceComment) => ({
    nickname: comment.userNickname || "사용자",
    photo: comment.userPhoto,
  });

  // PlaceCommentEntity를 PlaceComment로 변환
  const transformComments = (comments: any[]): PlaceComment[] => {
    return comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      userId: comment.author?.id || 0,
      userNickname: comment.author?.nickname || "사용자",
      userPhoto: comment.author?.photo?.url,
    }));
  };

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "#666", padding: "20px" }}>
        댓글을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <CommentSection<PlaceComment>
      title="댓글"
      comments={
        commentsData?.comments ? transformComments(commentsData.comments) : []
      }
      totalCount={commentsData?.pagination.totalCount || 0}
      isLoading={isLoading}
      newComment={newComment}
      onNewCommentChange={setNewComment}
      onSubmitComment={handleSubmitComment}
      isSubmitting={createCommentMutation.isPending}
      placeholder="이 파크골프장에 대한 후기를 남겨주세요..."
      pagination={
        commentsData?.pagination
          ? {
              totalCount: commentsData.pagination.totalCount,
              totalPages: commentsData.pagination.totalPages,
              currentPage: currentPage,
              hasNext: commentsData.pagination.hasNext,
              hasPrev: commentsData.pagination.hasPrev,
            }
          : undefined
      }
      onPageChange={setCurrentPage}
      getUserInfo={getUserInfo}
    />
  );
};

export default PlaceCommentList;
