import Styled from "./AlertBase.styles.ts";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {ReactNode, useContext} from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import alertContext from "./context";


interface AlertProps {
    isOpen: boolean;
    title?: string;

    width?: string;
    contentPadding?: string;

    children: ReactNode

    onCancel?: () => void;
    cancelText?: string;

    onConfirm?: () => void;
    confirmText?: string;
}

const Alert = (props: AlertProps) => {
    const context = useContext(alertContext);
    
    if (!props.isOpen) return null;

    const AlertContent = (
        <AnimatePresence>
            <Styled.DimmedArea
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ zIndex: 9999 }}
                onClick={props.onCancel}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.075 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Styled.AlertContainer>
                        {props.title && (
                            <Styled.AlertHeader>
                                <Styled.AlertTitle>
                                    {props.title}
                                </Styled.AlertTitle>
                            </Styled.AlertHeader>
                        )}
                        <Styled.AlertContent
                            contentPadding={props.contentPadding}
                            width={props.width}
                        >
                            {props.children}
                        </Styled.AlertContent>

                        <Styled.AlertButtonContainer>
                            {props.cancelText && (
                                <Styled.AlertButton
                                    variant="secondary"
                                    onClick={props.onCancel}
                                >
                                    {props.cancelText || '취소'}
                                </Styled.AlertButton>
                            )}

                            <Styled.AlertButton
                                variant="primary"
                                onClick={props.onConfirm}
                            >
                                {props.confirmText || '확인'}
                            </Styled.AlertButton>
                        </Styled.AlertButtonContainer>
                    </Styled.AlertContainer>
                </motion.div>
            </Styled.DimmedArea>
        </AnimatePresence>
    );

    return createPortal(
        context?.queryClient ? (
            <QueryClientProvider client={context.queryClient}>
                {AlertContent}
            </QueryClientProvider>
        ) : AlertContent,
        document.body
    );
}

export default Alert;