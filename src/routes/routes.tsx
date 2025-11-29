import {Outlet, RouteObject} from "react-router-dom";
import {QueryClientProvider} from "@withpark/api/QueryClientProvider.tsx";
import {publicRoutes} from "./publicRoutes.tsx";
import {privateRoutes} from "./privateRoutes.tsx";
import GlobalErrorBoundary from "@withpark/ui/components/ErrorBoundary/GlobalErrorBoundary.tsx";
import WithParkUIProvider from "@withpark/ui/components/Provider/WithParkUIProvider";
import { POSTHOG_HOST, POSTHOG_KEY } from "@withpark/constants/config.ts";
import { PostHogProvider } from 'posthog-js/react'
import { posthog } from 'posthog-js';

const options = {
  api_host: POSTHOG_HOST,
  defaults: '2025-05-24',
} as const

posthog.init('phc_Vr4FICtNlmGCH8kvRF6fKq2zJEbdD7YqTuVgmRNy4i5', {
  api_host: 'https://us.i.posthog.com',
  defaults: '2025-05-24'
})

export const routes: RouteObject[] = [
    {
        element: (
            <QueryClientProvider>
                <PostHogProvider apiKey={POSTHOG_KEY} options={options}>
                    <WithParkUIProvider>
                        <Outlet />
                    </WithParkUIProvider>
                </PostHogProvider>
            </QueryClientProvider>
        ),
        errorElement: <GlobalErrorBoundary />,
        children: [
            ...publicRoutes,
            ...privateRoutes,
        ]
    }
]