import { lazy } from 'react';

export const LandingPage =
    lazy(() => import('./LandingPage'))

export const LoginPage =
    lazy(() => import('./LoginPage'))

export const OAuthKakaoPage =
    lazy(() => import('./OAuth/OAuthKakaoPage'))