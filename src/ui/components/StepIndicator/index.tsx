import Styled from './StepIndicator.styles';

type Props = {
    current: number;
    max: number;
}

const StepIndicator = ({
    current,
    max,
}: Props) => {

    return (
        <Styled.StepIndicator>
            {
                (new Array(max).fill(0)).map((_, index) => (
                    <>
                    <Styled.StepDot
                        key={index}
                        active={index === current}
                        completed={index < current}
                    />
                    </>
                ))
            }
        </Styled.StepIndicator>
    )
}

export default StepIndicator