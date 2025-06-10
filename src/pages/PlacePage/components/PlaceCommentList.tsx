import { useState } from 'react';
import CommentSection, {PlaceComment} from "@withpark/ui/components/CommentSection";
import usePlaceComments from "../../../api/queries/usePlaceComments";
import useCreatePlaceCommentMutation from "../../../api/mutations/useCreatePlaceCommentMutation";

interface PlaceCommentListProps extends PlaceComment {
  id: number;
  content: string;
  createdAt: string;
  userNickname: string;
  userPhoto?: string;
}

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

    console.log('댓글 작성 시작:', { placeId, content: newComment.trim() });

    try {
      const result = await createCommentMutation.mutateAsync({
        placeId,
        data: { content: newComment.trim() }
      });
      console.log('댓글 작성 성공:', result);
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      
      // 더 자세한 에러 정보 표시
      if (error instanceof Error) {
        alert(`댓글 작성에 실패했습니다: ${error.message}`);
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        alert(`댓글 작성에 실패했습니다: ${(error as any).message}`);
      } else {
        alert('댓글 작성에 실패했습니다.');
      }
    }
  };

  const getUserInfo = (comment: PlaceComment) => ({
    nickname: comment.userNickname,
    photo: comment.userPhoto
  });

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
        댓글을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <CommentSection<PlaceComment>
      title="댓글"
      comments={commentsData?.comments || []}
      totalCount={commentsData?.pagination.totalCount || 0}
      isLoading={isLoading}
      newComment={newComment}
      onNewCommentChange={setNewComment}
      onSubmitComment={handleSubmitComment}
      isSubmitting={createCommentMutation.isPending}
      placeholder="이 파크골프장에 대한 후기를 남겨주세요..."
      pagination={commentsData?.pagination ? {
        totalCount: commentsData.pagination.totalCount,
        totalPages: commentsData.pagination.totalPages,
        currentPage: currentPage,
        hasNext: commentsData.pagination.hasNext,
        hasPrev: commentsData.pagination.hasPrev
      } : undefined}
      onPageChange={setCurrentPage}
      getUserInfo={getUserInfo}
    />
  );
};

export default PlaceCommentList; 