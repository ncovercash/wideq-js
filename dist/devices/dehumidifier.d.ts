import { Device } from '../core/device';
export declare enum DehumidifierOperationMode {
    SLEEP = "@AP_MAIN_MID_OPMODE_SLEEP_W",
    SILENT = "@AP_MAIN_MID_OPMODE_SILENT_W",
    /** should be silent */
    CLIENT = "@AP_MAIN_MID_OPMODE_CILENT_DEHUM_W",
    AUTO = "@AP_MAIN_MID_OPMODE_AUTO_W",
    SMART = "@AP_MAIN_MID_OPMODE_SMART_DEHUM_W",
    FAST = "@AP_MAIN_MID_OPMODE_FAST_DEHUM_W",
    CONCENTRATION_DRY = "@AP_MAIN_MID_OPMODE_CONCENTRATION_DRY_W",
    CLOTHING_DRY = "@AP_MAIN_MID_OPMODE_CLOTHING_DRY_W"
}
/**
 * WindStrength
 *
 * As I tested with my Dehumidifier, both Low and High are available.
 */
export declare enum DehumidifierWindStrength {
    LowestOfTheLow = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_LOWST_LOW_W",
    Lowest = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_LOWST_W",
    Low = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_LOW_W",
    LowMid = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_LOW_MID_W",
    Mid = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_MID_W",
    MidHigh = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_MID_HIGH_W",
    High = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_HIGH_W",
    Power = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_POWER_W",
    Auto = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_AUTO_W"
}
export declare enum DehumidifierRACMode {
    OFF = "@AP_OFF_W",
    ON = "@AP_ON_W"
}
export declare enum DehumidifierOperation {
    OFF = "@operation_off",
    ON = "@operation_on"
}
export declare class DehumidifierDevice extends Device {
    poll(): Promise<DehumidifierStatus | null>;
    /**
     * Turn on or off the device
     * @param isOn
     */
    setOn(isOn: boolean): Promise<void>;
    setMode(mode: DehumidifierOperationMode): Promise<void>;
    setWindStrength(windStrength: DehumidifierWindStrength): Promise<void>;
    setAirRemoval(airRemoval: DehumidifierRACMode): Promise<void>;
}
export declare class DehumidifierStatus {
    device: DehumidifierDevice;
    data: any;
    constructor(device: DehumidifierDevice, data: any);
    readonly mode: DehumidifierOperationMode;
    readonly windStrength: DehumidifierWindStrength;
    readonly isAirRemovalOn: boolean;
    readonly targetHumidity: number;
    readonly currentHumidity: number;
    readonly isOn: boolean;
}
