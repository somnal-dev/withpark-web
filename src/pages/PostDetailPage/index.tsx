import { useNavigate, useParams } from "react-router-dom";
import Button from "@withpark/ui/components/Button";
import Card from "@withpark/ui/components/Card";
import usePost from "../../api/queries/usePost";
import CommentList from "../PostPage/components/CommentList";
import LoadingBar from "@withpark/ui/components/LoadingBar";
import useUserInfo from "@withpark/api/queries/useUserInfo";
import ProfileImage from "@withpark/ui/components/ProfileImage";
import useAlert from "@withpark/hooks/useAlert";
import useDeletePostMutation from "@withpark/api/mutations/useDeletePostMutation";
import { useCloseAllAlerts } from "@withpark/ui/components/Alert/context";
import { PATH } from "@withpark/constants/routes";
import useUpdatePostViewCountMutation from "@withpark/api/mutations/useUpdatePostViewCountMutation";
import { useEffect, useState } from "react";
import { UpdatePostRequest } from "@withpark/types/post";

const PostDetailPage = () => {
  const { postDocumentId } = useParams<{ postDocumentId: string }>();
  const { data: post, isLoading, error } = usePost(postDocumentId!);
  const { data: author } = useUserInfo(post?.user.id, post != null);
  const { data: loginUser } = useUserInfo();
  const [isViewCountIncreased, setIsViewCountIncreased] = useState(false);

  const navigate = useNavigate();
  const alert = useAlert();
  const closeAllAlerts = useCloseAllAlerts();

  const deletePostMutation = useDeletePostMutation();
  const updatePostViewCountMutation = useUpdatePostViewCountMutation();

  useEffect(() => {
    if (!post || !postDocumentId || isViewCountIncreased) return;

    const newPost: UpdatePostRequest = {
      data: {
        viewCount: post.viewCount + 1,
      },
    };

    updatePostViewCountMutation.mutate({
      postDocumentId: postDocumentId,
      data: newPost,
    });

    setIsViewCountIncreased(true);
  }, [post]);

  const handleEditPost = async () => {};

  const handleDeletePost = async () => {
    alert.open({
      content: <>정말로 글을 삭제하시겠습니까?</>,
      cancelText: "아니요",
      confirmText: "네",
      onConfirm: async () => {
        if (!postDocumentId) return;

        try {
          await deletePostMutation.mutateAsync({
            postDocumentId: postDocumentId,
          });

          closeAllAlerts();
          navigate(PATH.COMMUNITY, { replace: true });
        } catch (error) {
          console.error("글 삭제 실패:", error);
          alert.open({
            content: <>글 삭제에 실패했습니다.</>,
          });
        }
      },
    });
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
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoadingBar
          type="spinner"
          size="large"
          message="게시글을 불러오는 중..."
        />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card>
          <h2 style={{ color: "#666", marginBottom: "1rem" }}>
            게시글을 찾을 수 없습니다
          </h2>
          <p style={{ color: "#999" }}>
            삭제되었거나 존재하지 않는 게시글입니다.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        minHeight: "80vh",
      }}
    >
      <Card>
        {/* 제목 */}
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            color: "#2d3748",
            marginBottom: "12px",
            lineHeight: "1.3",
          }}
        >
          {post.title}
        </h1>

        {/* 작성자 정보 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            paddingBottom: "16px",
            borderBottom: "1px solid #e2e8f0",
            marginBottom: "24px",
          }}
        >
          {author?.photo && (
            <ProfileImage
              imgUrl={author?.photo?.formats?.thumbnail?.url ?? ""}
            />
          )}

          <div>
            <div style={{ fontWeight: "600", color: "#2d3748" }}>
              {post.user.nickname}
            </div>
            <div style={{ fontSize: "0.875rem", color: "#718096" }}>
              {formatDate(post.createdAt)} • 조회수 {post.viewCount}
            </div>
          </div>
        </div>

        {/* 내용 */}
        <div
          style={{
            fontSize: "1rem",
            lineHeight: "1.7",
            color: "#4a5568",
            marginBottom: "32px",
            minHeight: "200px",
          }}
        >
          {post.content?.split("\n").map((line, index) => (
            <p key={index} style={{ margin: "0 0 16px 0" }}>
              {line || "\u00A0"}
            </p>
          ))}
        </div>

        {author && loginUser && author?.id === loginUser?.id && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "16px",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            {/* <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <IconButton
              icon={<LikeIcon fill={isLiked} />}
              active={isLiked}
              onClick={handleLike}
              loading={toggleLikeMutation.isPending}
              variant="secondary"
              size="medium"
            >
              {post.likeCount}
            </IconButton>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                color: "#718096",
                fontSize: "0.875rem",
              }}
            >
              <CommentIcon size={16} /> {post.commentCount} 댓글
            </div>
          </div> */}

            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                variant="secondary"
                style={{ fontSize: "0.875rem" }}
                onClick={handleEditPost}
              >
                수정
              </Button>
              <Button
                variant="danger"
                style={{ fontSize: "0.875rem" }}
                onClick={handleDeletePost}
              >
                삭제
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* 댓글 섹션 */}
      <div style={{ marginTop: "32px" }}>
        <CommentList post={post} />
      </div>
    </div>
  );
};

export default PostDetailPage;
