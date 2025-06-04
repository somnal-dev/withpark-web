import Styled from './ProgressBar.styles';

type Props = {
    progress: number | 0;
}

const ProgressBar = ({
    progress
}: Props) => {
    return (
        <Styled.ProgressBar>
            <Styled.ProgressFill
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            />
        </Styled.ProgressBar>
    )
}

export default ProgressBar;