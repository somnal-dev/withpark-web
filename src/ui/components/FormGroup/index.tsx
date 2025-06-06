import Styled from './FormGroup.styles';
import * as React from "react";

type Props = React.ComponentProps<'div'>;

const FormGroup = ({
    children,
    ...rest
}: Props) => {
    return (
        <Styled.FormGroup
            {...rest}
        >
            {children}
        </Styled.FormGroup>
    )
}

export default FormGroup; 