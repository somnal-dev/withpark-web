import Card from "@withpark/ui/components/Card";
import type { Post } from "../../../types/post";
import IconButton from "@withpark/ui/components/IconButton";
import { CommentIcon } from "@withpark/assets/icons/CommentIcon";
import { ViewIcon } from "@withpark/assets/icons/ViewIcon";
import ProfileImage from "@withpark/ui/components/ProfileImage";
import useUserInfo from "@withpark/api/queries/useUserInfo";

interface PostCardProps {
  post: Post;
  onPostClick?: (postDocumentId: string) => void;
}

const PostCard = ({ post, onPostClick }: PostCardProps) => {
  const { data: author } = useUserInfo(post?.user?.id, post?.user != null);

  const handlePostClick = () => {
    onPostClick?.(post.documentId);
  };

  const handleCommentClick = () => {
    onPostClick?.(post.documentId);
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

  return (
    <Card onClick={handlePostClick}>
      <div style={{ padding: "16px" }}>
        {/* 작성자 정보 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          {author?.photo && (
            <ProfileImage
              imgUrl={author.photo?.url ?? ""}
            />
          )}
          <div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                marginLeft: "10px",
              }}
            >
              {post?.user?.nickname ?? "알수없음"}
            </div>
            <div
              style={{ fontSize: "12px", color: "#666", marginLeft: "10px" }}
            >
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>

        {/* 게시글 내용 */}
        <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>{post.title}</h3>
        <p
          style={{
            margin: "0 0 12px 0",
            color: "#333",
            lineHeight: "1.5",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.content}
        </p>

        {/* 액션 버튼들 */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* <IconButton
            icon={<LikeIcon fill={isLiked} />}
            active={isLiked}
            onClick={handleLike}
            loading={toggleLikeMutation.isPending}
            variant="secondary"
            size="small"
          >
            {post.likeCount}
          </IconButton> */}

          <IconButton
            icon={<CommentIcon size={16} />}
            onClick={handleCommentClick}
            variant="secondary"
            size="small"
          >
            {post.comments?.length || 0}
          </IconButton>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            <ViewIcon size={16} /> {post.viewCount}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
