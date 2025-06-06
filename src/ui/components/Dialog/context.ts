import {createContext, Dispatch, ReactNode, SetStateAction} from "react";
import { QueryClient } from "@tanstack/react-query";

export enum DialogType {
    FullPage = "FullPage",
    Popup = "Popup",
}

interface DialogInfoBase {
    dialogId: string;
    dialogType?: DialogType;

    width?: string;
    contentPadding?: string;

    onClose?: () => void;
}

// 기본형 다이얼로그
interface DefaultDialogInfo extends DialogInfoBase {
    content: ReactNode;
    title?: string;
}

export type DialogInfoList = DefaultDialogInfo

interface DialogContext {
    dialogInfoList: DialogInfoList[];
    setDialogInfoList: Dispatch<SetStateAction<DialogInfoList[]>>;
    queryClient?: QueryClient;
}

const dialogContext = createContext<DialogContext | null>(null);

export default dialogContext;