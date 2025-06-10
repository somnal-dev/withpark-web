import {ReactNode} from "react";
import DialogProvider from "@withpark/ui/components/Provider/DialogProvider";
import AlertProvider from "@withpark/ui/components/Provider/AlertProvider";

interface WithParkUIProviderProps {
    children: ReactNode
}

const WithParkUIProvider = ({
    children
}: WithParkUIProviderProps) => {
    return (
        <AlertProvider>
            <DialogProvider>
                {children}
            </DialogProvider>
        </AlertProvider>

    )
}

export default WithParkUIProvider;