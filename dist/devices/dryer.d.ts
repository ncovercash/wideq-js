import { Device } from '../core/device';
/**
 * The state of the dryer device.
 */
export declare enum DryerState {
    COOLING = "@WM_STATE_COOLING_W",
    END = "@WM_STATE_END_W",
    ERROR = "@WM_STATE_ERROR_W",
    DRYING = "@WM_STATE_DRYING_W",
    INITIAL = "@WM_STATE_INITIAL_W",
    OFF = "@WM_STATE_POWER_OFF_W",
    PAUSE = "@WM_STATE_PAUSE_W",
    RUNNING = "@WM_STATE_RUNNING_W",
    SMART_DIAGNOSIS = "@WM_STATE_SMART_DIAGNOSIS_W",
    WRINKLE_CARE = "@WM_STATE_WRINKLECARE_W"
}
/**
 * Represents the dry level setting of the dryer.
 */
export declare enum DryLevel {
    CUPBOARD = "@WM_DRY27_DRY_LEVEL_CUPBOARD_W",
    DAMP = "@WM_DRY27_DRY_LEVEL_DAMP_W",
    EXTRA = "@WM_DRY27_DRY_LEVEL_EXTRA_W",
    IRON = "@WM_DRY27_DRY_LEVEL_IRON_W",
    LESS = "@WM_DRY27_DRY_LEVEL_LESS_W",
    MORE = "@WM_DRY27_DRY_LEVEL_MORE_W",
    NORMAL = "@WM_DRY27_DRY_LEVEL_NORMAL_W",
    OFF = "-",
    VERY = "@WM_DRY27_DRY_LEVEL_VERY_W"
}
/**
 * A dryer error.
 */
export declare enum DryerError {
    ERROR_AE = "@WM_US_DRYER_ERROR_AE_W",
    ERROR_CE1 = "@WM_US_DRYER_ERROR_CE1_W",
    ERROR_DE4 = "@WM_WW_FL_ERROR_DE4_W",
    ERROR_DOOR = "@WM_US_DRYER_ERROR_DE_W",
    ERROR_DRAINMOTOR = "@WM_US_DRYER_ERROR_OE_W",
    ERROR_EMPTYWATER = "@WM_US_DRYER_ERROR_EMPTYWATER_W",
    ERROR_F1 = "@WM_US_DRYER_ERROR_F1_W",
    ERROR_LE1 = "@WM_US_DRYER_ERROR_LE1_W",
    ERROR_LE2 = "@WM_US_DRYER_ERROR_LE2_W",
    ERROR_NOFILTER = "@WM_US_DRYER_ERROR_NOFILTER_W",
    ERROR_NP = "@WM_US_DRYER_ERROR_NP_GAS_W",
    ERROR_PS = "@WM_US_DRYER_ERROR_PS_W",
    ERROR_TE1 = "@WM_US_DRYER_ERROR_TE1_W",
    ERROR_TE2 = "@WM_US_DRYER_ERROR_TE2_W",
    ERROR_TE5 = "@WM_US_DRYER_ERROR_TE5_W",
    ERROR_TE6 = "@WM_US_DRYER_ERROR_TE6_W"
}
/**
 * Represents temperature control setting.
 */
export declare enum TempControl {
    OFF = "-",
    ULTRA_LOW = "@WM_DRY27_TEMP_ULTRA_LOW_W",
    LOW = "@WM_DRY27_TEMP_LOW_W",
    MEDIUM = "@WM_DRY27_TEMP_MEDIUM_W",
    MID_HIGH = "@WM_DRY27_TEMP_MID_HIGH_W",
    HIGH = "@WM_DRY27_TEMP_HIGH_W"
}
/**
 * Represents a timed dry setting.
 */
export declare enum TimeDry {
    OFF = "-",
    TWENTY = "20",
    THIRTY = "30",
    FOURTY = "40",
    FIFTY = "50",
    SIXTY = "60"
}
export declare class DryerDevice extends Device {
    poll(): Promise<DryerStatus | null>;
}
export declare class DryerStatus {
    device: DryerDevice;
    data: any;
    constructor(device: DryerDevice, data: any);
    readonly state: DryerState;
    readonly previousState: DryerState;
    readonly dryLevel: DryLevel;
    readonly temperatureControl: TempControl;
    readonly timeDry: TimeDry;
    readonly isOn: boolean;
    readonly remainingTime: number;
    readonly initialTime: number;
    readonly course: string | null;
    readonly smartCourse: string | null;
    readonly error: string | null;
}
