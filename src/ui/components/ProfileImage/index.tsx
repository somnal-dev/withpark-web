import Styled from './ProfileImage.styles';

export type ProfileImageProps = {
    imgUrl: string;
}

const ProfileImage = ({
    imgUrl
}: ProfileImageProps) => {
    return (
        <Styled.ProfileImage src={imgUrl}/>
    )
}

export default ProfileImage;