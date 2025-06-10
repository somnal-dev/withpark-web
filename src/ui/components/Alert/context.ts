import {createContext, Dispatch, ReactNode, SetStateAction, useContext} from "react";
import { QueryClient } from "@tanstack/react-query";

export interface AlertInfo {
    alertId: string;

    title?: string;
    content: ReactNode;

    width?: string;
    contentPadding?: string;

    onCancel?: () => void;
    cancelText?: string;

    onConfirm?: () => void;
    confirmText?: string;
}

interface AlertContext {
    alertInfoList: AlertInfo[];
    setAlertInfoList: Dispatch<SetStateAction<AlertInfo[]>>;
    queryClient?: QueryClient;
    closeAll: () => void;
}

const alertContext = createContext<AlertContext | null>(null);

// 모든 알럿을 닫는 훅
export const useCloseAllAlerts = () => {
    const context = useContext(alertContext);
    if (!context) {
        throw new Error('useCloseAllAlerts must be used within an AlertProvider');
    }
    return context.closeAll;
};

export default alertContext;