export declare class Gateway {
    authBase: string;
    apiRoot: string;
    oauthRoot: string;
    country: string;
    language: string;
    constructor(authBase: string, apiRoot: string, oauthRoot: string, country: string, language: string);
    static getGatewayInfo(countryCode: string, langCode: string): Promise<any>;
    static discover(country: string, language: string): Promise<Gateway>;
    readonly oauthUrl: string;
}
