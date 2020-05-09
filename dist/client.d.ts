import { Auth } from './core/auth';
import { Device } from './core/device';
import { DeviceInfo } from './core/device-info';
import { Gateway } from './core/gateway';
import { LangPackModel } from './core/lang-pack-model';
import { LangPackProduct } from './core/lang-pack-product';
import { ModelInfo } from './core/model-info';
import { Session } from './core/session';
export declare class Client {
    gateway: Gateway;
    auth: Auth;
    session: Session | null;
    country: string;
    language: string;
    devices: DeviceInfo[];
    modelInfo: {
        [key: string]: any;
    };
    langPackProduct: {
        [key: string]: any;
    };
    langPackModel: {
        [key: string]: any;
    };
    constructor(gateway: Gateway, auth: Auth, session: Session | null, country?: string, language?: string);
    static loadFromToken(refreshToken: string, country?: string, language?: string): Promise<Client>;
    static loadFromState(state: {
        [key in 'gateway' | 'auth' | 'session' | 'modelInfo' | 'country' | 'language' | 'langPackProduct' | 'langPackModel']: any;
    }): Client;
    toStateObject(): {
        modelInfo: {
            [key: string]: any;
        };
        gateway: {
            authBase: string;
            apiRoot: string;
            oauthRoot: string;
            country: string;
            language: string;
        } | undefined;
        auth: {
            accessToken: string | null;
            refreshToken: string;
        } | undefined;
        session: string | undefined;
        country: string;
        language: string;
        langPackProduct: {
            [key: string]: any;
        };
        langPackModel: {
            [key: string]: any;
        };
    };
    updateDevices(): Promise<void>;
    getDeviceInfo(deviceId: string): Promise<DeviceInfo | undefined>;
    getDevice(deviceId: string): Promise<Device>;
    refresh(): Promise<void>;
    getModelInfo(device: DeviceInfo): Promise<ModelInfo>;
    getLangPackProduct(device: DeviceInfo): Promise<LangPackProduct>;
    getLangPackModel(device: DeviceInfo): Promise<LangPackModel>;
}
