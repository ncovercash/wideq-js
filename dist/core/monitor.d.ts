/// <reference types="node" />
import { Session, WorkId } from './session';
export declare class Monitor {
    session: Session;
    deviceId: string;
    workId?: WorkId;
    constructor(session: Session, deviceId: string);
    start(): Promise<void>;
    stop(): Promise<void>;
    poll(): Promise<Buffer | null>;
}
