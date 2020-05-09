/// <reference types="node" />
import * as uuid from 'uuid';
import { Auth } from './auth';
export declare type WorkId = typeof uuid['v4'];
export declare class Session {
    auth: Auth;
    sessionId: string;
    constructor(auth: Auth, sessionId: string);
    post(path: string, data?: any): Promise<any>;
    getDevices(): Promise<any>;
    startMonitor(deviceId: string): Promise<any>;
    pollMonitor(deviceId: string, workId: WorkId): Promise<Buffer | null>;
    stopMonitor(deviceId: string, workId: WorkId): Promise<void>;
    setDeviceControls(deviceId: string, values: any): Promise<any>;
    setDeviceControlBinary(deviceId: string, data: Buffer): Promise<any>;
    getDeviceConfig(deviceId: string, key: string, category?: string): Promise<any>;
}
