import { Device } from '../core/device';
/**
 * The state of the washer device.
 */
export declare enum WasherState {
    ADD_DRAIN = "@WM_STATE_ADD_DRAIN_W",
    COMPLETE = "@WM_STATE_COMPLETE_W",
    DETECTING = "@WM_STATE_DETECTING_W",
    DETERGENT_AMOUNT = "@WM_STATE_DETERGENT_AMOUNT_W",
    DRYING = "@WM_STATE_DRYING_W",
    END = "@WM_STATE_END_W",
    ERROR_AUTO_OFF = "@WM_STATE_ERROR_AUTO_OFF_W",
    FRESH_CARE = "@WM_STATE_FRESHCARE_W",
    FROZEN_PREVENT_INITIAL = "@WM_STATE_FROZEN_PREVENT_INITIAL_W",
    FROZEN_PREVENT_PAUSE = "@WM_STATE_FROZEN_PREVENT_PAUSE_W",
    FROZEN_PREVENT_RUNNING = "@WM_STATE_FROZEN_PREVENT_RUNNING_W",
    INITIAL = "@WM_STATE_INITIAL_W",
    OFF = "@WM_STATE_POWER_OFF_W",
    PAUSE = "@WM_STATE_PAUSE_W",
    PRE_WASH = "@WM_STATE_PREWASH_W",
    RESERVE = "@WM_STATE_RESERVE_W",
    RINSING = "@WM_STATE_RINSING_W",
    RINSE_HOLD = "@WM_STATE_RINSE_HOLD_W",
    RUNNING = "@WM_STATE_RUNNING_W",
    SMART_DIAGNOSIS = "@WM_STATE_SMART_DIAG_W",
    SMART_DIAGNOSIS_DATA = "@WM_STATE_SMART_DIAGDATA_W",
    SPINNING = "@WM_STATE_SPINNING_W",
    TCL_ALARM_NORMAL = "TCL_ALARM_NORMAL",
    TUBCLEAN_COUNT_ALARM = "@WM_STATE_TUBCLEAN_COUNT_ALRAM_W"
}
export declare class WasherDevice extends Device {
    poll(): Promise<WasherStatus | null>;
    setOn(isOn: boolean): Promise<void>;
}
export declare class WasherStatus {
    device: WasherDevice;
    data: any;
    constructor(device: WasherDevice, data: any);
    readonly state: WasherState;
    readonly stateText: string;
    readonly previousState: WasherState;
    readonly previousStateText: string;
    readonly isOn: boolean;
    readonly isRemoteStart: boolean;
    readonly isChildLock: boolean;
    readonly remainingTime: number;
    readonly initialTime: number;
    readonly reserveTime: number;
    readonly course: string | null;
    readonly smartCourse: string | null;
    readonly error: string | null;
}
