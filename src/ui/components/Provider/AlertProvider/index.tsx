import {ReactNode, useState} from "react";
import { useQueryClient } from "@tanstack/react-query";
import alertContext, {AlertInfo} from "@withpark/ui/components/Alert/context.ts";
import Alert from "@withpark/ui/components/Alert";

interface AlertProviderProps {
    children: ReactNode
}

const AlertProvider = ({
    children
}: AlertProviderProps) => {
    // 다이얼로그를 저장할 리스트를 정의
    const [alertInfoList, setAlertInfoList] = useState<AlertInfo[]>([]);
    const queryClient = useQueryClient();

    const closeAll = () => {
        setAlertInfoList([]);
    };

    return (
        <alertContext.Provider value={{
            alertInfoList,
            setAlertInfoList,
            queryClient,
            closeAll
        }}>
            {/* 하위 요소를 보여주고 그 밑에... 다이얼로그를 뿌린다. */}
            {children}

            {
                // 다이얼로그 갯수만큼 반복
                alertInfoList.map((alert) => {
                    return (
                        <Alert
                            key={alert.alertId}
                            isOpen={true}
                            title={alert.title}
                            width={alert.width}
                            contentPadding={alert.contentPadding}
                            cancelText={alert.cancelText}
                            onCancel={() => {
                                alert.onCancel?.();
                                setAlertInfoList(prev =>
                                    prev.filter(d => d.alertId !== alert.alertId)
                                );
                            }}
                            confirmText={alert.confirmText}
                            onConfirm={() => {
                                alert.onConfirm?.();
                                setAlertInfoList(prev =>
                                    prev.filter(d => d.alertId !== alert.alertId)
                                );
                            }}
                        >
                            {alert.content}
                        </Alert>
                    )
                })
            }
        </alertContext.Provider>
    )
}

export default AlertProvider;