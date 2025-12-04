import { useState } from "react";
import Styled from "./ProfileImage.styles";
import { getAbsoluteImageUrl } from "../../../utils/imageUrl";

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

  const src = getAbsoluteImageUrl(imgUrl);

  return (
    <Styled.ProfileImage src={src} alt="프로필 이미지" onError={handleError} />
  );
};

export default ProfileImage;
