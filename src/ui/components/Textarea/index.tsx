import Styled from './Textarea.styles';
import * as React from "react";

type Props = React.ComponentProps<'textarea'>;

const Textarea = ({
    ...rest
}: Props) => {
    return (
        <Styled.Textarea
            {...rest}
        />
    )
}

export default Textarea; 