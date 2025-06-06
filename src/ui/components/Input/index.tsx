import Styled from './Input.styles';
import * as React from "react";

type Props = React.ComponentProps<'input'>;

const Input = ({
    ...rest
}: Props) => {
    return (
        <Styled.Input
            {...rest}
        />
    )
}

export default Input; 