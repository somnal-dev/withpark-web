import {Outlet, RouteObject} from "react-router-dom";
import {QueryClientProvider} from "@withpark/api/QueryClientProvider.tsx";
import {publicRoutes} from "./publicRoutes.tsx";
import {privateRoutes} from "./privateRoutes.tsx";
import GlobalErrorBoundary from "@withpark/ui/components/ErrorBoundary/GlobalErrorBoundary.tsx";
import WithParkUIProvider from "@withpark/ui/components/Provider/WithParkUIProvider";

export const routes: RouteObject[] = [
    {
        element: (
            <QueryClientProvider>
                <WithParkUIProvider>
                    <Outlet />
                </WithParkUIProvider>
            </QueryClientProvider>
        ),
        errorElement: <GlobalErrorBoundary />,
        children: [
            ...publicRoutes,
            ...privateRoutes,
        ]
    }
]