import {ReactNode, useState} from "react";
import dialogContext, {DialogInfo} from "@withpark/ui/components/Dialog/context";
import Dialog from "@withpark/ui/components/Dialog";
import { useQueryClient } from "@tanstack/react-query";

interface DialogProviderProps {
    children: ReactNode
}

const DialogProvider = ({
    children
}: DialogProviderProps) => {
    // 다이얼로그를 저장할 리스트를 정의
    const [dialogInfoList, setDialogInfoList] = useState<DialogInfo[]>([]);
    const queryClient = useQueryClient();

    const closeAll = () => {
        setDialogInfoList([]);
    };

    return (
        <dialogContext.Provider value={{
            dialogInfoList,
            setDialogInfoList,
            queryClient,
            closeAll
        }}>
            {/* 하위 요소를 보여주고 그 밑에... 다이얼로그를 뿌린다. */}
            {children}

            {
                // 다이얼로그 갯수만큼 반복
                dialogInfoList.map((dialog) => {
                    return (
                        <Dialog
                            key={dialog.dialogId}
                            isOpen={true}
                            title={dialog.title}
                            width={dialog.width}
                            contentPadding={dialog.contentPadding}
                            onClose={() => {
                                dialog.onClose?.();
                                setDialogInfoList(prev =>
                                    prev.filter(d => d.dialogId !== dialog.dialogId)
                                );
                            }}
                        >
                            {dialog.content}
                        </Dialog>
                    )
                })
            }
        </dialogContext.Provider>
    )
}

export default DialogProvider;