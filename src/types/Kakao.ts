declare global {
    interface Window {
        Kakao?: {
            Auth: {
                authorize: (params: {
                    redirectUri: string;
                    scope?: string;
                    throughTalk?: boolean;
                    prompt?: string;
                    loginHint?: string;
                    serviceTerms?: string;
                    state?: string;
                    nonce?: string;
                }) => void;
            };
        };
    }
}