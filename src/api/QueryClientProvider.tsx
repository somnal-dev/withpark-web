import {useState} from "react";
import {
    QueryClient,
    QueryClientProvider as BaseQueryClientProvider
} from "@tanstack/react-query";

export function QueryClientProvider({children}: React.PropsWithChildren) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: false,
                        staleTime: 5000,
                    },
                }
            })
    );

    // 기본 쿼리 클라이언트를 가지고서 커스텀한 쿼리 클라이언트를 제공한다.
    return (
        <BaseQueryClientProvider client={queryClient}>
            {children}
        </BaseQueryClientProvider>
    )
}