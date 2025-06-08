import React, {useState} from "react";
import {
    QueryClient,
    QueryClientProvider as BaseQueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function QueryClientProvider({children}: React.PropsWithChildren) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: 5,
                        staleTime: 30 * 1000,
                        gcTime: 5 * 60 * 1000,
                    },
                }
            })
    );

    // 기본 쿼리 클라이언트를 가지고서 커스텀한 쿼리 클라이언트를 제공한다.
    return (
        <BaseQueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </BaseQueryClientProvider>
    )
}