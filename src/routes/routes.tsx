import {RouteObject} from "react-router-dom";
import {QueryClientProvider} from "@withpark/api/QueryClientProvider.tsx";
import {publicRoutes} from "./publicRoutes.tsx";
import {privateRoutes} from "./privateRoutes.tsx";
import GlobalErrorBoundary from "@withpark/ui/components/ErrorBoundary/GlobalErrorBoundary.tsx";

export const routes: RouteObject[] = [
    {
        element: (
            <QueryClientProvider>

            </QueryClientProvider>
        ),
        errorElement: <GlobalErrorBoundary />,
        children: [
            ...publicRoutes,
            ...privateRoutes,
        ]
    }
]