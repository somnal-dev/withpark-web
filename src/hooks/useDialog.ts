import {ReactNode, useCallback, useContext, useRef, useState} from "react";
import {nanoid} from "nanoid";
import dialogContext, {DialogInfoList, DialogType} from "@withpark/ui/components/Dialog/context.ts";

interface UseDialogProps {
    dialogType?: DialogType,
    content: ReactNode;
    title?: string;
    width?: string;
    contentPadding?: string;
    onClose?: () => void;
}

const useDialog = () => {
    const dialogId = useRef<string>(nanoid(6));
    const [isOpen, setIsOpen] = useState(false);

    const context = useContext(dialogContext);

    const open = useCallback(
        ({
            dialogType,
            content,
            title,
            width,
            contentPadding,
            onClose,
        }: UseDialogProps) => {
            const newDialog: DialogInfoList = {
                dialogId: dialogId.current,
                dialogType,
                content,
                title,
                width,
                contentPadding,
                onClose
            };

            setIsOpen(true);
            context?.setDialogInfoList((prev) => [...prev, newDialog]);
        }, [context, dialogId])

    const close = useCallback(() => {
        setIsOpen(false);
        context?.setDialogInfoList((prev) =>
            prev.filter((d) => d.dialogId !== dialogId.current)
        )
    }, [context, dialogId]);

    return {
        dialogId: dialogId.current,
        isOpen,
        open,
        close
    }
}

export default useDialog;