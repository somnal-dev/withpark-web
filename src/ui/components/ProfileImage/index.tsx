import { useState } from "react";
import Styled from "./ProfileImage.styles";

const getImageUrl = (url: string | undefined | null): string | undefined => {
  if (!url) return undefined;
  return import.meta.env.PROD
    ? url // 프로덕션에서는 Vercel 프록시를 통해 접근
    : `${import.meta.env.VITE_SERVER_URL}${url}`; // 개발환경에서는 직접 연결
};

type Props = {
  imgUrl: string;
};

const ProfileImage = ({ imgUrl }: Props) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  // 이미지가 없거나 에러가 발생한 경우 기본 스타일 적용
  if (!imgUrl || hasError) {
    return <Styled.ProfileImagePlaceholder />;
  }

  const src = getImageUrl(imgUrl);

  return (
    <Styled.ProfileImage src={src} alt="프로필 이미지" onError={handleError} />
  );
};

export default ProfileImage;
