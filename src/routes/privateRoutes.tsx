import useAuthAtom from "../hooks/useAuthAtom.ts";
import {Navigate, Outlet} from "react-router-dom";
import {PATH} from "@withpark/constants/routes.ts";
import {Suspense} from "react";
import {CommunityPage, DashboardPage, OnboardingPage, PlacePage, PostDetailPage} from "@withpark/pages/index.ts";
import Navbar from "@withpark/ui/components/Navbar";
import GamePage from "@withpark/pages/GamePage";
import useUserInfo from "@withpark/api/queries/useUserInfo.ts";

const PrivateRoute = () => {
    const { isLogin } = useAuthAtom();
    const { data: user } = useUserInfo();

    if(!isLogin()) {
        return <Navigate to={PATH.INTRO} replace />
    }

    if(!!user && !user?.isOnboardingDone) {
        return <Navigate to={PATH.ONBOARDING} replace />
    }

    return (
        <>
            <Navbar />
            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
        </>
    )
}

const OnboardingRoute = () => {
    const { isLogin } = useAuthAtom();

    if(!isLogin()) {
        return <Navigate to={PATH.INTRO} replace />
    }

    return (
        <Suspense fallback={null}>
            <Outlet />
        </Suspense>
    )
}

export const privateRoutes = [
    {
        element: <OnboardingRoute />,
        children: [
            {
                path: PATH.ONBOARDING,
                element: <OnboardingPage />
            }
        ]
    },
    {
        element: <PrivateRoute />,
        children: [
            {
                path: PATH.INDEX,
                element: <DashboardPage />
            },
            {
                path: PATH.PLACE,
                element: <PlacePage />
            },
            {
                path: PATH.COMMUNITY,
                element: <CommunityPage />
            },
            {
                path: PATH.POST_DETAIL,
                element: <PostDetailPage />
            },
            {
                path: PATH.GAME,
                element: <GamePage />
            },
        ]
    }
]