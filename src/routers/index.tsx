import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {createBrowserRouter, Outlet} from "react-router-dom";
import {GlobalStyle} from "../styles/global.tsx";
import {InternalErrorPage} from "../pages/internal-error/InternalErrorPage.tsx";
import {Home} from "../pages/home/Home.tsx";
import {ThemeProvider} from "@emotion/react";
import {theme} from "../styles/theme.ts";
import {MobileView} from "#/templates/mobile-view/MobileView.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0
        }
    }
});

const InitializedDataProvider = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <ReactQueryDevtools />
            <GlobalStyle />

            <MobileView>
                <Outlet />
            </MobileView>
        </ThemeProvider>
    </QueryClientProvider>
);

export const applicationRouter: ReturnType<typeof createBrowserRouter> =
    createBrowserRouter([
        {
            element: <InitializedDataProvider />,
            children: [
                {
                    path: '/',
                    errorElement: <InternalErrorPage />,
                    element: (
                        <Home />
                    )
                }
            ],
            errorElement: (
                <>
                    <GlobalStyle />
                    <InternalErrorPage />
                </>
            )
        },
    ]);