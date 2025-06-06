import {ReactNode} from "react";
import DialogProvider from "@withpark/ui/components/Provider/DialogProvider";

interface WithParkUIProviderProps {
    children: ReactNode
};

const WithParkUIProvider = ({
    children
}: WithParkUIProviderProps) => {
    return (
        <DialogProvider>
            {children}
        </DialogProvider>
    )
}

export default WithParkUIProvider;