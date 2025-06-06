import {DialogProps} from "@withpark/ui/components/Dialog/types.ts";
import Styled from "./DialogBase.styles";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useContext } from "react";
import dialogContext from "./context";
import { QueryClientProvider } from "@tanstack/react-query";

const Dialog = (props: DialogProps) => {
    const context = useContext(dialogContext);
    
    if (!props.isOpen) return null;

    const DialogContent = (
        <AnimatePresence>
            <Styled.DimmedArea
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ zIndex: 9999 }}
                onClick={props.onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.075 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Styled.DialogContainer>
                        {props.title && (
                            <Styled.DialogHeader>
                                <Styled.DialogTitle>
                                    {props.title}
                                </Styled.DialogTitle>
                                {props.onClose && (
                                    <Styled.CloseButton onClick={props.onClose}>
                                        ×
                                    </Styled.CloseButton>
                                )}
                            </Styled.DialogHeader>
                        )}
                        <Styled.DialogContent
                            contentPadding={props.contentPadding}
                            width={props.width}
                        >
                            {props.children}
                        </Styled.DialogContent>
                    </Styled.DialogContainer>
                </motion.div>
            </Styled.DimmedArea>
        </AnimatePresence>
    );

    return createPortal(
        context?.queryClient ? (
            <QueryClientProvider client={context.queryClient}>
                {DialogContent}
            </QueryClientProvider>
        ) : DialogContent,
        document.body
    );
}

export default Dialog;