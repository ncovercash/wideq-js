import { DeviceType } from './constants';
export interface DeviceData {
    modelNm: string;
    deviceId: string;
    modelJsonUrl: string;
    langPackProductTypeUri: string;
    langPackModelUri: string;
    macAddress: string;
    alias: string;
    deviceType: DeviceType;
}
export declare class DeviceInfo {
    data: DeviceData;
    constructor(data: DeviceData);
    loadModelInfo(): Promise<any>;
    loadLangPackProduct(): Promise<any>;
    loadLangPackModel(): Promise<any>;
    readonly modelId: string;
    readonly id: string;
    readonly modelInfoUrl: string;
    readonly langPackProductUrl: string;
    readonly langPackModelUrl: string;
    readonly macAddress: string;
    readonly name: string;
    readonly type: string;
    toString(): string;
}
