import { ChangeEvent, useRef, useState } from "react";
import Styled from "./ProfileImageUpload.styles";
import useImageUploadMutation from "@withpark/api/mutations/useImageUploadMutation";
import { Photo } from "@withpark/types/user";

interface ProfileImageUploadProps {
  imageUrl?: string;
  onImageChange: (photo: Photo) => void;
  size?: "small" | "medium" | "large";
  placeholder?: string;
}

const getImageUrl = (url: string | undefined | null): string | undefined => {
  if (!url) return undefined;
  return import.meta.env.PROD
    ? url // 프로덕션에서는 Vercel 프록시를 통해 접근
    : `${import.meta.env.VITE_SERVER_URL}${url}`; // 개발환경에서는 직접 연결
};

const ProfileImageUpload = ({
  imageUrl,
  onImageChange,
  size = "medium",
  placeholder = "",
}: ProfileImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const uploadMutation = useImageUploadMutation();

  const src = getImageUrl(imageUrl);

  const handlePhotoUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 미리보기를 위한 로컬 URL 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };

    reader.readAsDataURL(file);

    // 실제 서버 업로드
    setIsUploading(true);

    try {
      const response = await uploadMutation.mutateAsync({ files: file });
      // 부모 컴포넌트에 새 URL 전달 (첫 번째 이미지 사용)
      if (response && response.length > 0) {
        onImageChange(response[0]);
      }
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      setPreviewUrl(null);

      // 실패 시에만 파일 input 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  // 미리보기가 있으면 미리보기를, 없으면 서버 이미지를 표시
  const displayImageUrl = previewUrl || imageUrl;

  return (
    <Styled.Container>
      {src ? (
        <Styled.ImagePreview
          src={src}
          alt="프로필 사진"
          size={size}
          onClick={handleClick}
          isUploading={isUploading}
        />
      ) : (
        <Styled.Placeholder
          size={size}
          onClick={handleClick}
          isUploading={isUploading}
        >
          {isUploading ? "" : placeholder}
        </Styled.Placeholder>
      )}
      <Styled.UploadButton onClick={handleClick} disabled={isUploading}>
        {isUploading
          ? "업로드 중..."
          : displayImageUrl
            ? "사진 변경"
            : "사진 업로드"}
      </Styled.UploadButton>
      <Styled.HiddenFileInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        disabled={isUploading}
      />
    </Styled.Container>
  );
};

export default ProfileImageUpload;
