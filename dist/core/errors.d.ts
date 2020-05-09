export declare class NotLoggedInError extends Error {
    name: string;
}
export declare class NotConnectedError extends Error {
    name: string;
}
export declare class APIError extends Error {
    code: string;
    message: string;
    name: string;
    constructor(code: string, message: string);
}
export declare class TokenError extends Error {
    name: string;
    constructor();
}
export declare class MonitorError extends Error {
    deviceId: string;
    code: string;
    name: string;
    constructor(deviceId: string, code: string);
}
