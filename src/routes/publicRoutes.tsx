import {PATH} from "../constants/routes.ts";
import {LandingPage, LoginPage, OAuthKakaoPage} from "../pages";
import {Suspense} from "react";
import {Outlet} from "react-router-dom";

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