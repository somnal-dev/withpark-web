import {DialogType} from "@withpark/ui/components/Dialog/context.ts";
import {ReactNode} from "react";

interface DialogPropsBase {
    isOpen: boolean;
    dialogType?: DialogType;
    title?: string;

    width?: string;
    contentPadding?: string;

    onClose?: () => void;
}

export interface DialogProps extends DialogPropsBase {
    children: ReactNode
}