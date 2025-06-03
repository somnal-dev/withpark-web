import { lazy } from 'react';

export const IntroPage =
    lazy(() => import('./IntroPage'))

export const LoginPage =
    lazy(() => import('./LoginPage'))

export const OAuthKakaoPage =
    lazy(() => import('./OAuth/OAuthKakaoPage'))

export const DashboardPage =
    lazy(() => import('./DashboardPage'))

