import { ComponentProps } from 'react';

import { Text } from '@withpark/component/text';

import * as S from './Button.style';
import {theme} from "@withpark/style/theme.ts";

export interface ButtonProps extends ComponentProps<'button'> {
    isValid: boolean;
}

export function Button({
   isValid,
   children,
   onClick,
   ...restProps
}: ButtonProps) {
    return (
        <S.Button isValid={isValid} onClick={onClick} {...restProps}>
            <Text typography="buttonBold16" color={theme.color.wht[100]}>
                {children}
            </Text>
        </S.Button>
    );
}
