import { Gateway } from './gateway';
import { Session } from './session';
export declare class Auth {
    gateway: Gateway;
    accessToken: string | null;
    refreshToken: string;
    constructor(gateway: Gateway, accessToken: string | null, refreshToken: string);
    static fromUrl(gateway: Gateway, url: string): Auth;
    static login(apiRoot: string, accessToken: string, countryCode: string, langCode: string): Promise<any>;
    startSession(): Promise<{
        session: Session;
        items: any[];
    }>;
    static oauth2Signature(message: string, secret: string): string;
    static refreshAuth(oauthRoot: string, refreshToken: string): Promise<string>;
    refresh(): Promise<Auth>;
}
