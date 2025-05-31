import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {createBrowserRouter, Outlet} from "react-router-dom";
import {GlobalStyle} from "../styles/global.tsx";
import {InternalErrorPage} from "../pages/internal-error/InternalErrorPage.tsx";
import {Home} from "../pages/home/Home.tsx";
import {ThemeProvider} from "@emotion/react";
import {theme} from "../styles/theme.ts";
import {MobileView} from "@withpark/template/mobile-view/MobileView.tsx";
import {NotFoundPage} from "@withpark/page/not-found/NotFoundPage.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0
        }
    }
});

const InitializedDataProvider = () => (
    // 리액트 쿼리 클라이언트 프로바이더 제공
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
                    <NotFoundPage />
                </>
            )
        },
    ]);