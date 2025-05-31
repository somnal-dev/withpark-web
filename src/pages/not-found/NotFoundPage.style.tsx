import styled from '@emotion/styled';
import {theme} from "@withpark/style/theme.ts";
import {FlexBox} from "@withpark/component/flex-box";

export const Container = styled(FlexBox)`
    height: 100dvh;
    align-items: center;
    justify-content: center;
    margin: auto;
`;

export const NotFoundSection = styled(FlexBox)`
    justify-content: center;
    align-items: center;
    text-align: center;
`

export const PreviousButton = styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 16px;
    margin-top: 8px;
    border-radius: 16px;

    background-color: ${theme.color.main[100]};
    cursor: pointer;
`;
