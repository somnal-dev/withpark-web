import useAuthAtom from "../hooks/useAuthAtom.ts";
import {Navigate, Outlet} from "react-router-dom";
import {PATH} from "@withpark/constants/routes.ts";
import {Suspense} from "react";
import {DashboardPage} from "@withpark/pages/index.ts";

const PrivateRoute = () => {
    const { isLogin } = useAuthAtom();

    if(!isLogin()) {
        return <Navigate to={PATH.INTRO} replace />
    }

    return (
        <>
            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
        </>
    )
}

export const privateRoutes = [
    {
        element: (
            <>
                <PrivateRoute />
            </>
        ),
        children: [
            {
                path: PATH.INDEX,
                element: <DashboardPage />
            }
        ]
    }
]