export interface KaKaoLoginRequest {
    accessToken: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;

    isOnboardingDone: boolean;
}