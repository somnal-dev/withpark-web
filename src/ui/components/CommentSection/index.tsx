import { User } from "@withpark/types/user";
import Button from "../Button";
import Textarea from "../Textarea";
import { useState } from "react";
import useAlert from "@withpark/hooks/useAlert";
import { useCloseAllAlerts } from "../Alert/context";

const getImageUrl = (url: string | undefined | null): string | undefined => {
  if (!url) return undefined;
  return import.meta.env.PROD
    ? url // 프로덕션에서는 Vercel 프록시를 통해 접근
    : `${url}`; // 개발환경에서는 직접 연결
};

interface BaseComment {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  user: User | null;
}

export interface PostComment extends BaseComment {
  user: User | null;
}

export interface PlaceComment extends BaseComment {
  user: User | null;
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
  getUserInfo: (comment: T) => User;
  onEditComment?: (commentDocumentId: string, content: string) => void;
  onDeleteComment?: (commentDocumentId: string) => void;
  isEditing?: boolean;
  isDeletingId?: string;
  currentUserId?: string | number; // 현재 사용자 ID로 수정/삭제 권한 체크
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
  getUserInfo,
  onEditComment,
  onDeleteComment,
  isEditing = false,
  isDeletingId,
  currentUserId,
}: CommentSectionProps<T>) => {
  const [editingCommentDocumentId, setEditingCommentDocumentId] = useState<
    string | null
  >(null);
  const [editingContent, setEditingContent] = useState<string>("");

  const alert = useAlert();
  const closeAllAlerts = useCloseAllAlerts();

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

  const handleEditStart = (comment: T) => {
    setEditingCommentDocumentId(comment.documentId);
    setEditingContent(comment.content);
  };

  const handleEditCancel = () => {
    setEditingCommentDocumentId(null);
    setEditingContent("");
  };

  const handleEditSave = () => {
    if (editingCommentDocumentId && onEditComment && editingContent.trim()) {
      onEditComment(editingCommentDocumentId, editingContent.trim());
      setEditingCommentDocumentId(null);
      setEditingContent("");
    }
  };

  const handleDelete = (commentDocumentId: string) => {
    alert.open({
      content: <>정말로 댓글을 삭제하시겠습니까?</>,
      cancelText: "아니요",
      confirmText: "네",
      onConfirm: async () => {
        if (!commentDocumentId) return;

        try {
          onDeleteComment?.(commentDocumentId);
          closeAllAlerts();
        } catch (error) {
          console.error("글 삭제 실패:", error);
          alert.open({
            content: <>글 삭제에 실패했습니다.</>,
          });
        }
      },
    });
  };

  const canUserModifyComment = (comment: T): boolean => {
    if (!currentUserId) return false;

    // 댓글 작성자 ID와 현재 사용자 ID 비교
    return comment.user?.id === currentUserId;
  };

  return (
    <div>
      <h3
        style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}
      >
        {title} ({totalCount})
      </h3>

      {/* 댓글 작성 폼 */}
      <div style={{ marginBottom: "24px" }}>
        <Textarea
          value={newComment}
          onChange={(e: any) => onNewCommentChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{ marginBottom: "8px" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="primary"
            onClick={onSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
          >
            {isSubmitting ? "작성 중..." : "댓글 작성"}
          </Button>
        </div>
      </div>

      {/* 댓글 목록 */}
      {isLoading ? (
        <div style={{ textAlign: "center", color: "#666", padding: "20px" }}>
          댓글을 불러오는 중...
        </div>
      ) : comments.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {comments.map((comment, _) => {
            const user = getUserInfo(comment);
            const isCurrentlyEditing =
              editingCommentDocumentId === comment.documentId;
            const canModify = canUserModifyComment(comment);
            const isDeleting = isDeletingId === comment.documentId;

            return (
              <div
                key={comment.id}
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #e9ecef",
                }}
              >
                {/* 댓글 작성자 정보 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  {user.photo && (
                    <img
                      src={getImageUrl(
                        user.photo?.formats?.thumbnail?.url ?? ""
                      )}
                      alt={user?.nickname ?? ""}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        marginRight: "8px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#333",
                        marginBottom: "2px",
                      }}
                    >
                      {user?.nickname}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#666",
                      }}
                    >
                      {formatDate(comment.createdAt)}
                    </div>
                  </div>

                  {/* 수정/삭제 버튼 */}
                  {canModify && !isCurrentlyEditing && (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Button
                        variant="secondary"
                        onClick={() => handleEditStart(comment)}
                        style={{
                          fontSize: "12px",
                          padding: "4px 8px",
                          minWidth: "auto",
                        }}
                        disabled={isEditing || isDeleting}
                      >
                        수정
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(comment.documentId)}
                        style={{
                          fontSize: "12px",
                          padding: "4px 8px",
                          minWidth: "auto",
                          backgroundColor: "#dc3545",
                          borderColor: "#dc3545",
                        }}
                        disabled={isEditing || isDeleting}
                      >
                        {isDeleting ? "삭제 중..." : "삭제"}
                      </Button>
                    </div>
                  )}
                </div>

                {/* 댓글 내용 또는 수정 폼 */}
                {isCurrentlyEditing ? (
                  <div>
                    <Textarea
                      value={editingContent}
                      onChange={(e: any) => setEditingContent(e.target.value)}
                      rows={3}
                      style={{ marginBottom: "8px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="secondary"
                        onClick={handleEditCancel}
                        style={{ fontSize: "12px", padding: "4px 12px" }}
                      >
                        취소
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleEditSave}
                        disabled={!editingContent.trim() || isEditing}
                        style={{ fontSize: "12px", padding: "4px 12px" }}
                      >
                        {isEditing ? "저장 중..." : "저장"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.5",
                      color: "#333",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {comment.content}
                  </div>
                )}
              </div>
            );
          })}

          {/* 페이지네이션 */}
          {pagination && pagination.totalPages > 1 && onPageChange && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "20px",
              }}
            >
              <Button
                variant="secondary"
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
                style={{ fontSize: "12px" }}
              >
                이전
              </Button>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                {pagination.currentPage} / {pagination.totalPages}
              </span>
              <Button
                variant="secondary"
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
                style={{ fontSize: "12px" }}
              >
                다음
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            color: "#666",
            padding: "40px 20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e9ecef",
          }}
        >
          <div style={{ fontSize: "16px", marginBottom: "8px" }}>
            아직 댓글이 없습니다
          </div>
          <div style={{ fontSize: "14px" }}>첫 번째 댓글을 작성해보세요!</div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
export type { PaginationData };
