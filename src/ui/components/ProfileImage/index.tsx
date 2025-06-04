import Styled from './ProfileImage.styles';

type Props = {
    imgUrl: string;
}

const ProfileImage = ({
    imgUrl
}: Props) => {
    return (
        <Styled.ProfileImage src={imgUrl}/>
    )
}

export default ProfileImage;