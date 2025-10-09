import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@withpark/ui/components/Card";
import Button from "@withpark/ui/components/Button";
import Input from "@withpark/ui/components/Input";
import Textarea from "@withpark/ui/components/Textarea";
import Label from "@withpark/ui/components/Label";
import FormGroup from "@withpark/ui/components/FormGroup";
import LoadingBar from "@withpark/ui/components/LoadingBar";
import usePost from "../../api/queries/usePost";
import useUpdatePostMutation from "@withpark/api/mutations/useUpdatePostMutation";
import useUserInfo from "@withpark/api/queries/useUserInfo";
import useAlert from "@withpark/hooks/useAlert";
import { PATH } from "@withpark/constants/routes";

const PostEditPage = () => {
  const { postDocumentId } = useParams<{ postDocumentId: string }>();
  const navigate = useNavigate();
  const alert = useAlert();

  const { data: post, isLoading: isPostLoading } = usePost(postDocumentId!);
  const { data: loginUser } = useUserInfo();
  const updatePostMutation = useUpdatePostMutation();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // 게시글 데이터 로드 시 폼에 채우기
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
      });
    }
  }, [post]);

  // 권한 체크: 작성자가 아니면 접근 금지
  useEffect(() => {
    if (post && loginUser && post.user.id !== loginUser.id) {
      alert.open({
        content: <>수정 권한이 없습니다.</>,
        onConfirm: () => {
          navigate(PATH.POST_DETAIL.replace(":postDocumentId", postDocumentId!), {
            replace: true,
          });
        },
      });
    }
  }, [post, loginUser, postDocumentId, navigate, alert]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert.open({
        content: <>제목과 내용을 모두 입력해주세요.</>,
      });
      return;
    }

    if (!postDocumentId) return;

    try {
      await updatePostMutation.mutateAsync({
        postDocumentId,
        title: formData.title.trim(),
        content: formData.content.trim(),
      });

      alert.open({
        content: <>게시글이 수정되었습니다.</>,
        onConfirm: () => {
          navigate(PATH.POST_DETAIL.replace(":postDocumentId", postDocumentId), {
            replace: true,
          });
        },
      });
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert.open({
        content: <>게시글 수정에 실패했습니다.</>,
      });
    }
  };

  const handleCancel = () => {
    if (postDocumentId) {
      navigate(PATH.POST_DETAIL.replace(":postDocumentId", postDocumentId));
    } else {
      navigate(PATH.COMMUNITY);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isPostLoading) {
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

  if (!post) {
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
      <Card title="게시글 수정">
        <form onSubmit={handleSubmit} style={{ padding: "16px" }}>
          <FormGroup>
            <Label>제목</Label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="게시글 제목을 입력해주세요"
              maxLength={200}
            />
          </FormGroup>

          <FormGroup>
            <Label>내용</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="게시글 내용을 입력해주세요"
              rows={8}
              style={{ minHeight: "200px" }}
            />
          </FormGroup>

          <div
            style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
          >
            <Button type="button" variant="secondary" onClick={handleCancel}>
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={updatePostMutation.isPending}
            >
              {updatePostMutation.isPending ? "수정 중..." : "수정하기"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PostEditPage;
