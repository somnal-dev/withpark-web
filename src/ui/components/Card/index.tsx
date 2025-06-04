import {PropsWithChildren} from "react";
import Styled from './Card.styles';

type CardProps = {
    title?: string | null,
    padding?: string | number,
}

type Props = PropsWithChildren & CardProps;

const Card = ({
    title,
    children,
    ...rest
}: Props) => {
    return (
        <Styled.Card
            {...rest}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
        >
            {title && (
                <Styled.CardTitle>
                    {title}
                </Styled.CardTitle>
            )}
            {children}
        </Styled.Card>
    )
};

export default Card;