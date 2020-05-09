/// <reference types="node" />
import { Monitor } from './monitor';
import { Client } from '../client';
import { DeviceInfo } from './device-info';
import { LangPackModel } from './lang-pack-model';
import { LangPackProduct } from './lang-pack-product';
import { ModelInfo } from './model-info';
export declare enum OnOffEnum {
    OFF = "@CP_OFF_EN_W",
    ON = "@CP_ON_EN_W"
}
export declare class Device {
    client: Client;
    device: DeviceInfo;
    model: ModelInfo;
    langPackProduct: LangPackProduct;
    langPackModel: LangPackModel;
    monitor?: Monitor;
    constructor(client: Client, device: DeviceInfo);
    poll(): Promise<any>;
    load(): Promise<void>;
    setControl(key: string, value: any): Promise<any>;
    createControlBinaryBuffer(status: any, keyToChange?: string | undefined, newValue?: string | undefined): Buffer;
    setControlBinary(status: any, keyToChange?: string | undefined, newValue?: string | undefined): Promise<any>;
    getConfig(key: string): Promise<any>;
    getControl(key: string): Promise<any>;
    startMonitor(): Promise<void>;
    stopMonitor(): Promise<void>;
}
