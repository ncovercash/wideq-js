import { Device } from '../core/device';
export declare enum FreshAirFilter {
    OFF = "@CP_TERM_OFF_KO_W",
    AUTO = "@RE_STATE_FRESH_AIR_FILTER_MODE_AUTO_W",
    POWER = "@RE_STATE_FRESH_AIR_FILTER_MODE_POWER_W",
    REPLACE_FILTER = "@RE_STATE_REPLACE_FILTER_W",
    SMARTCARE_RUN = "@RE_SMARTCARE_RUN_W",
    SMARTCARE_ON = "@RE_STATE_SMART_SMART_CARE_ON",
    SMARTCARE_OFF = "@RE_STATE_SMART_SMART_CARE_OFF",
    EMPTY = ""
}
export declare enum SmartSavingMode {
    OFF = "@CP_TERM_USE_NOT_W",
    NIGHT = "@RE_SMARTSAVING_MODE_NIGHT_W",
    CUSTOM = "@RE_SMARTSAVING_MODE_CUSTOM_W",
    SMART_GRID_OFF = "@CP_OFF_EN_W",
    SMART_GRID_DEMAND_RESPONSE = "@RE_TERM_DEMAND_RESPONSE_FUNCTIONALITY_W",
    SMART_GRID_CUSTOM = "@RE_TERM_DELAY_DEFROST_CAPABILITY_W",
    EMPTY = ""
}
export declare enum SmartSavingModeStatus {
    OFF = "OFF",
    ON = "ON",
    EMPTY = ""
}
export declare enum LockingStatus {
    UNLOCK = "UNLOCK",
    LOCK = "LOCK",
    EMPTY = ""
}
export declare enum DoorOpenState {
    OPEN = "OPEN",
    CLOSE = "CLOSE",
    EMPTY = ""
}
export declare enum TempUnit {
    F = "\uFF26",
    C = "\u2103",
    EMPTY = ""
}
export declare class RefrigeratorDevice extends Device {
    poll(): Promise<RefrigeratorStatus | null>;
    setBinaryTempRefrigerator(status: RefrigeratorStatus, newValue: string): Promise<void>;
    setBinaryTempFreezer(status: RefrigeratorStatus, newValue: string): Promise<void>;
    setBinaryEco(status: RefrigeratorStatus, newValue: boolean): Promise<void>;
    setBinaryIcePlus(status: RefrigeratorStatus, newValue: boolean): Promise<void>;
    setBinaryFreshAirFilter(status: RefrigeratorStatus, newValue: FreshAirFilter): Promise<void>;
    setTempRefrigeratorC(temp: number): Promise<void>;
    setTempFreezerC(temp: number): Promise<void>;
    setEcoEnabled(val: boolean): Promise<void>;
    setIcePlusStatus(val: boolean): Promise<void>;
}
export declare class RefrigeratorStatus {
    device: RefrigeratorDevice;
    data: any;
    constructor(device: RefrigeratorDevice, data: any);
    readonly tempRefrigeratorC: number;
    readonly tempFreezerC: number;
    readonly icePlusStatus: boolean;
    readonly freshAirFilterStatus: FreshAirFilter;
    readonly freshAirFilterStatusText: string;
    readonly energySavingMode: SmartSavingMode;
    readonly doorOpened: boolean;
    readonly tempUnit: TempUnit;
    readonly energySavingEnabled: boolean;
    readonly locked: boolean;
    readonly activeSavingStatus: any;
    readonly ecoEnabled: boolean;
    readonly waterFilterUsedMonth: any;
}
