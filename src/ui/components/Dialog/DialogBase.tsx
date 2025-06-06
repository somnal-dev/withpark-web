import {FC, ReactNode} from "react";
import Styled from "./DialogBase.styles";

interface DialogBaseProps {
    children: ReactNode;
    onClose?: () => void;
}

const DialogBase: FC<DialogBaseProps> = ({
    children,
    onClose
}) => {
    return (
        <Styled.DimmedArea onClick={onClose}>
            <Styled.DialogContainer onClick={(e) => e.stopPropagation()}>
                {children}
            </Styled.DialogContainer>
        </Styled.DimmedArea>
    )
}

export default DialogBase;