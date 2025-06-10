import { useEffect } from 'react';
import { useCloseAllAlerts } from '@withpark/ui/components/Alert/context';
import { useCloseAllDialogs } from '@withpark/ui/components/Dialog/context';

/**
 * ESC 키를 눌렀을 때 모든 모달(알럿, 다이얼로그)을 닫는 훅
 */
export const useGlobalModalKeyHandler = () => {
    const closeAllAlerts = useCloseAllAlerts();
    const closeAllDialogs = useCloseAllDialogs();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                // ESC 키를 눌렀을 때 모든 모달 닫기
                closeAllAlerts();
                closeAllDialogs();
            }
        };

        // 전역 키보드 이벤트 등록
        document.addEventListener('keydown', handleKeyDown);

        // 컴포넌트 언마운트 시 이벤트 해제
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeAllAlerts, closeAllDialogs]);
};

/**
 * 모든 모달을 프로그래밍적으로 닫는 함수를 반환하는 훅
 */
export const useCloseAllModals = () => {
    const closeAllAlerts = useCloseAllAlerts();
    const closeAllDialogs = useCloseAllDialogs();

    return () => {
        closeAllAlerts();
        closeAllDialogs();
    };
}; 