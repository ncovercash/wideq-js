import { Device } from '../core/device';
/**
 * The state of the dishwasher device.
 */
export declare enum DishwasherState {
    INITIAL = "@DW_STATE_INITIAL_W",
    RUNNING = "@DW_STATE_RUNNING_W",
    PAUSED = "@DW_STATE_PAUSE_W",
    OFF = "@DW_STATE_POWER_OFF_W",
    COMPLETE = "@DW_STATE_COMPLETE_W",
    POWER_FAIL = "@DW_STATE_POWER_FAIL_W"
}
/**
 * The process within the dishwasher state.
 */
export declare enum DishwasherProcess {
    RESERVE = "@DW_STATE_RESERVE_W",
    RUNNING = "@DW_STATE_RUNNING_W",
    RINSING = "@DW_STATE_RINSING_W",
    DRYING = "@DW_STATE_DRYING_W",
    COMPLETE = "@DW_STATE_COMPLETE_W",
    NIGHT_DRYING = "@DW_STATE_NIGHTDRY_W",
    CANCELLED = "@DW_STATE_CANCEL_W"
}
export declare class DishwasherDevice extends Device {
    poll(): Promise<DishwasherStatus | null>;
}
export declare class DishwasherStatus {
    device: DishwasherDevice;
    data: any;
    constructor(device: DishwasherDevice, data: any);
    readonly state: DishwasherState;
    readonly process: DishwasherProcess | null;
    readonly isOn: boolean;
    readonly remainingTime: number;
    readonly initialTime: number;
    readonly reserveTime: number;
    readonly course: string | null;
    readonly smartCourse: string | null;
    readonly error: string | null;
}
