import Styled from './Label.styles';
import * as React from "react";

type Props = React.ComponentProps<'label'>;

const Label = ({
    children,
    ...rest
}: Props) => {
    return (
        <Styled.Label
            {...rest}
        >
            {children}
        </Styled.Label>
    )
}

export default Label; 