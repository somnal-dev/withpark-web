import Styled, {ButtonProps} from './Button.styles';
import * as React from "react";

type Props = React.ComponentProps<'button'> & ButtonProps;

const Button = ({
    children,
    ...rest
}: Props) => {
    return (
        <>
            <Styled.Button
                {...rest}
            >
                {children}
            </Styled.Button>
        </>
    )
}

export default Button;