import { AxiosInstance } from 'axios';
export interface LGEDMAxiosInstance extends AxiosInstance {
    lgedmPost(url: string, data: any, accessToken?: string, sessionId?: string): Promise<any>;
}
export declare const requestClient: LGEDMAxiosInstance;
