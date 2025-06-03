import {PATH} from "../constants/routes.ts";
import {LandingPage, LoginPage} from "../pages";
import {Suspense} from "react";
import {Outlet} from "react-router-dom";
import OAuthKakaoPage from "@withpark/pages/OAuth/OAuthKakaoPage.tsx";

export const publicRoutes = [
    {
        element: (
            <>
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </>
        ),
        children: [
            {
                path: PATH.INDEX,
                element: <LandingPage />
            },
            {
                path: PATH.LOGIN,
                element: <LoginPage />
            },
            {
                path: PATH.OAUTH_KAKAO,
                element: <OAuthKakaoPage />
            }
        ]
    }
]