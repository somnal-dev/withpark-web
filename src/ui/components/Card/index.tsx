import {PropsWithChildren, ReactNode} from "react";
import Styled from './Card.styles';

type CardProps = {
    title?: string | ReactNode,
    /** 타이틀 오른쪽에 표시할 액션 요소 (버튼, 링크 등) */
    titleAction?: ReactNode,
    padding?: string | number,
    onClick?: () => void
}

type Props = PropsWithChildren & CardProps;

const Card = ({
                  title,
                  titleAction,
                  children,
                  onClick,
                  ...rest
              }: Props) => {
    return (
        <Styled.Card
            {...rest}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.1}}
        >
            {(title || titleAction) && (
                <Styled.CardHeader>
                    {title && (
                        <Styled.CardTitle>
                            {title}
                        </Styled.CardTitle>
                    )}
                    {titleAction && (
                        <Styled.CardTitleAction>
                            {titleAction}
                        </Styled.CardTitleAction>
                    )}
                </Styled.CardHeader>
            )}
            {children}
        </Styled.Card>
    )
};

export default Card;