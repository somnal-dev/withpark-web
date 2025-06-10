import {PATH} from "../constants/routes.ts";
import {IntroPage, LoginPage, OAuthKakaoPage, OAuthNaverPage} from "../pages";
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
                path: PATH.INTRO,
                element: <IntroPage />
            },
            {
                path: PATH.LOGIN,
                element: <LoginPage />
            },
            {
                path: PATH.OAUTH_KAKAO,
                element: <OAuthKakaoPage />
            },
            {
                path: PATH.OAUTH_NAVER,
                element: <OAuthNaverPage />
            }
        ]
    }
]