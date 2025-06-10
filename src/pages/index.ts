import { lazy } from 'react';

export const IntroPage =
    lazy(() => import('./IntroPage'))

export const LoginPage =
    lazy(() => import('./LoginPage'))

export const OAuthKakaoPage =
    lazy(() => import('./OAuth/OAuthKakaoPage'))

export const OAuthNaverPage =
    lazy(() => import('./OAuth/OAuthNaverPage'))

export const DashboardPage =
    lazy(() => import('./DashboardPage'))

export const OnboardingPage =
    lazy(() => import('./OnboardingPage'))

export const PlacePage =
    lazy(() => import('./PlacePage'))

export const PlaceDetailPage =
    lazy(() => import('./PlaceDetailPage'))

export const CommunityPage =
    lazy(() => import('./CommunityPage'))

export const PostDetailPage =
    lazy(() => import('./PostDetailPage'))

export const GamePage =
    lazy(() => import('./GamePage'))

export const SettingPage =
    lazy(() => import('./SettingPage'))