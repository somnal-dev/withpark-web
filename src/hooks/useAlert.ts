import {ReactNode, useCallback, useContext, useRef, useState} from "react";
import {nanoid} from "nanoid";
import alertContext, {AlertInfo} from "@withpark/ui/components/Alert/context.ts";

interface UseAlertProps {
    title?: string;
    content: ReactNode;

    width?: string;
    contentPadding?: string;

    cancelText?: string;
    onCancel?: () => void;

    confirmText?: string;
    onConfirm?: () => void;
}

const useAlert = () => {
    const alertId = useRef<string>(nanoid(6));
    const [isOpen, setIsOpen] = useState(false);

    const context = useContext(alertContext);

    const open = useCallback(
        ({
            content,
            title,
            width,
            contentPadding,
            cancelText,
            onCancel,
            confirmText,
            onConfirm,
        }: UseAlertProps) => {
            const newAlert: AlertInfo = {
                alertId: alertId.current,
                content,
                title,
                width,
                contentPadding,
                cancelText,
                onCancel,
                confirmText,
                onConfirm,
            };

            setIsOpen(true);
            context?.setAlertInfoList((prev) => [...prev, newAlert]);
        }, [context, alertId])

    const close = useCallback(() => {
        setIsOpen(false);
        context?.setAlertInfoList((prev) =>
            prev.filter((d) => d.alertId !== alertId.current)
        )
    }, [context, alertId]);

    return {
        alertId: alertId.current,
        isOpen,
        open,
        close
    }
}

export default useAlert;