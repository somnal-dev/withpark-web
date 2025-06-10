import {createContext, Dispatch, ReactNode, SetStateAction, useContext} from "react";
import { QueryClient } from "@tanstack/react-query";

interface DialogInfoBase {
    dialogId: string;

    width?: string;
    contentPadding?: string;

    onClose?: () => void;
}

// 기본형 다이얼로그
interface DefaultDialogInfo extends DialogInfoBase {
    content: ReactNode;
    title?: string;
}

export type DialogInfo = DefaultDialogInfo

interface DialogContext {
    dialogInfoList: DialogInfo[];
    setDialogInfoList: Dispatch<SetStateAction<DialogInfo[]>>;
    queryClient?: QueryClient;
    closeAll: () => void;
}

const dialogContext = createContext<DialogContext | null>(null);

// 모든 다이얼로그를 닫는 훅
export const useCloseAllDialogs = () => {
    const context = useContext(dialogContext);
    if (!context) {
        throw new Error('useCloseAllDialogs must be used within a DialogProvider');
    }
    return context.closeAll;
};

export default dialogContext;