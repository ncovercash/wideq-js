"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_1 = require("../core/device");
const utils_1 = require("../utils");
/**
 * The state of the dishwasher device.
 */
var DishwasherState;
(function (DishwasherState) {
    DishwasherState["INITIAL"] = "@DW_STATE_INITIAL_W";
    DishwasherState["RUNNING"] = "@DW_STATE_RUNNING_W";
    DishwasherState["PAUSED"] = "@DW_STATE_PAUSE_W";
    DishwasherState["OFF"] = "@DW_STATE_POWER_OFF_W";
    DishwasherState["COMPLETE"] = "@DW_STATE_COMPLETE_W";
    DishwasherState["POWER_FAIL"] = "@DW_STATE_POWER_FAIL_W";
})(DishwasherState = exports.DishwasherState || (exports.DishwasherState = {}));
/**
 * The process within the dishwasher state.
 */
var DishwasherProcess;
(function (DishwasherProcess) {
    DishwasherProcess["RESERVE"] = "@DW_STATE_RESERVE_W";
    DishwasherProcess["RUNNING"] = "@DW_STATE_RUNNING_W";
    DishwasherProcess["RINSING"] = "@DW_STATE_RINSING_W";
    DishwasherProcess["DRYING"] = "@DW_STATE_DRYING_W";
    DishwasherProcess["COMPLETE"] = "@DW_STATE_COMPLETE_W";
    DishwasherProcess["NIGHT_DRYING"] = "@DW_STATE_NIGHTDRY_W";
    DishwasherProcess["CANCELLED"] = "@DW_STATE_CANCEL_W";
})(DishwasherProcess = exports.DishwasherProcess || (exports.DishwasherProcess = {}));
class DishwasherDevice extends device_1.Device {
    poll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.monitor) {
                return null;
            }
            const resp = yield this.monitor.poll();
            if (resp) {
                const data = this.model.decodeMonitor(resp);
                return new DishwasherStatus(this, data);
            }
            return null;
        });
    }
}
exports.DishwasherDevice = DishwasherDevice;
class DishwasherStatus {
    constructor(device, data) {
        this.device = device;
        this.data = data;
    }
    get state() {
        const key = utils_1.lookupEnum('DishwasherState', this.data, this.device);
        return utils_1.asEnum(DishwasherState, key);
    }
    get process() {
        const key = utils_1.lookupEnum('Process', this.data, this.device);
        return key !== '-' ? utils_1.asEnum(DishwasherProcess, key) : null;
    }
    get isOn() {
        return this.state !== DishwasherState.OFF;
    }
    get remainingTime() {
        return utils_1.asTime('Remain_Time_H', 'Remain_Time_M', this.data);
    }
    get initialTime() {
        return utils_1.asTime('Initial_Time_H', 'Initial_Time_M', this.data);
    }
    get reserveTime() {
        return utils_1.asTime('Reserve_Time_H', 'Reserve_Time_M', this.data);
    }
    get course() {
        const value = utils_1.lookupReference('Course', this.data, this.device);
        return value;
    }
    get smartCourse() {
        const value = utils_1.lookupReference('SmartCourse', this.data, this.device);
        return value;
    }
    get error() {
        const value = utils_1.lookupReference('Error', this.data, this.device);
        return value;
    }
}
exports.DishwasherStatus = DishwasherStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaHdhc2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kZXZpY2VzL2Rpc2h3YXNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUF3QztBQUN4QyxvQ0FBdUU7QUFFdkU7O0dBRUc7QUFDSCxJQUFZLGVBT1g7QUFQRCxXQUFZLGVBQWU7SUFDekIsa0RBQStCLENBQUE7SUFDL0Isa0RBQStCLENBQUE7SUFDL0IsK0NBQTRCLENBQUE7SUFDNUIsZ0RBQTZCLENBQUE7SUFDN0Isb0RBQWlDLENBQUE7SUFDakMsd0RBQXFDLENBQUE7QUFDdkMsQ0FBQyxFQVBXLGVBQWUsR0FBZix1QkFBZSxLQUFmLHVCQUFlLFFBTzFCO0FBRUQ7O0dBRUc7QUFDSCxJQUFZLGlCQVFYO0FBUkQsV0FBWSxpQkFBaUI7SUFDM0Isb0RBQStCLENBQUE7SUFDL0Isb0RBQStCLENBQUE7SUFDL0Isb0RBQStCLENBQUE7SUFDL0Isa0RBQTZCLENBQUE7SUFDN0Isc0RBQWlDLENBQUE7SUFDakMsMERBQXFDLENBQUE7SUFDckMscURBQWdDLENBQUE7QUFDbEMsQ0FBQyxFQVJXLGlCQUFpQixHQUFqQix5QkFBaUIsS0FBakIseUJBQWlCLFFBUTVCO0FBRUQsTUFBYSxnQkFBaUIsU0FBUSxlQUFNO0lBQzdCLElBQUk7O1lBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDekM7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtDQUNGO0FBZEQsNENBY0M7QUFFRCxNQUFhLGdCQUFnQjtJQUMzQixZQUNTLE1BQXdCLEVBQ3hCLElBQVM7UUFEVCxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFLO0lBQ2QsQ0FBQztJQUVMLElBQVcsS0FBSztRQUNkLE1BQU0sR0FBRyxHQUFHLGtCQUFVLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEUsT0FBTyxjQUFNLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDaEIsTUFBTSxHQUFHLEdBQUcsa0JBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsT0FBTyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFNLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM3RCxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLGVBQWUsQ0FBQyxHQUFHLENBQUM7SUFDNUMsQ0FBQztJQUVELElBQVcsYUFBYTtRQUN0QixPQUFPLGNBQU0sQ0FBQyxlQUFlLEVBQUUsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sY0FBTSxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE9BQU8sY0FBTSxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsTUFBTSxLQUFLLEdBQUcsdUJBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEUsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ3BCLE1BQU0sS0FBSyxHQUFHLHVCQUFlLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQVcsS0FBSztRQUNkLE1BQU0sS0FBSyxHQUFHLHVCQUFlLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGO0FBOUNELDRDQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERldmljZSB9IGZyb20gJy4uL2NvcmUvZGV2aWNlJztcbmltcG9ydCB7IGFzRW51bSwgYXNUaW1lLCBsb29rdXBFbnVtLCBsb29rdXBSZWZlcmVuY2UgfSBmcm9tICcuLi91dGlscyc7XG5cbi8qKlxuICogVGhlIHN0YXRlIG9mIHRoZSBkaXNod2FzaGVyIGRldmljZS5cbiAqL1xuZXhwb3J0IGVudW0gRGlzaHdhc2hlclN0YXRlIHtcbiAgSU5JVElBTCA9ICdARFdfU1RBVEVfSU5JVElBTF9XJyxcbiAgUlVOTklORyA9ICdARFdfU1RBVEVfUlVOTklOR19XJyxcbiAgUEFVU0VEID0gJ0BEV19TVEFURV9QQVVTRV9XJyxcbiAgT0ZGID0gJ0BEV19TVEFURV9QT1dFUl9PRkZfVycsXG4gIENPTVBMRVRFID0gJ0BEV19TVEFURV9DT01QTEVURV9XJyxcbiAgUE9XRVJfRkFJTCA9ICdARFdfU1RBVEVfUE9XRVJfRkFJTF9XJyxcbn1cblxuLyoqXG4gKiBUaGUgcHJvY2VzcyB3aXRoaW4gdGhlIGRpc2h3YXNoZXIgc3RhdGUuXG4gKi9cbmV4cG9ydCBlbnVtIERpc2h3YXNoZXJQcm9jZXNzIHtcbiAgUkVTRVJWRSA9ICdARFdfU1RBVEVfUkVTRVJWRV9XJyxcbiAgUlVOTklORyA9ICdARFdfU1RBVEVfUlVOTklOR19XJyxcbiAgUklOU0lORyA9ICdARFdfU1RBVEVfUklOU0lOR19XJyxcbiAgRFJZSU5HID0gJ0BEV19TVEFURV9EUllJTkdfVycsXG4gIENPTVBMRVRFID0gJ0BEV19TVEFURV9DT01QTEVURV9XJyxcbiAgTklHSFRfRFJZSU5HID0gJ0BEV19TVEFURV9OSUdIVERSWV9XJyxcbiAgQ0FOQ0VMTEVEID0gJ0BEV19TVEFURV9DQU5DRUxfVycsXG59XG5cbmV4cG9ydCBjbGFzcyBEaXNod2FzaGVyRGV2aWNlIGV4dGVuZHMgRGV2aWNlIHtcbiAgcHVibGljIGFzeW5jIHBvbGwoKSB7XG4gICAgaWYgKCF0aGlzLm1vbml0b3IpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLm1vbml0b3IucG9sbCgpO1xuICAgIGlmIChyZXNwKSB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5tb2RlbC5kZWNvZGVNb25pdG9yKHJlc3ApO1xuICAgICAgcmV0dXJuIG5ldyBEaXNod2FzaGVyU3RhdHVzKHRoaXMsIGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNod2FzaGVyU3RhdHVzIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkZXZpY2U6IERpc2h3YXNoZXJEZXZpY2UsXG4gICAgcHVibGljIGRhdGE6IGFueSxcbiAgKSB7IH1cblxuICBwdWJsaWMgZ2V0IHN0YXRlKCkge1xuICAgIGNvbnN0IGtleSA9IGxvb2t1cEVudW0oJ0Rpc2h3YXNoZXJTdGF0ZScsIHRoaXMuZGF0YSwgdGhpcy5kZXZpY2UpO1xuICAgIHJldHVybiBhc0VudW0oRGlzaHdhc2hlclN0YXRlLCBrZXkpO1xuICB9XG5cbiAgcHVibGljIGdldCBwcm9jZXNzKCkge1xuICAgIGNvbnN0IGtleSA9IGxvb2t1cEVudW0oJ1Byb2Nlc3MnLCB0aGlzLmRhdGEsIHRoaXMuZGV2aWNlKTtcbiAgICByZXR1cm4ga2V5ICE9PSAnLScgPyBhc0VudW0oRGlzaHdhc2hlclByb2Nlc3MsIGtleSkgOiBudWxsO1xuICB9XG5cbiAgcHVibGljIGdldCBpc09uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlICE9PSBEaXNod2FzaGVyU3RhdGUuT0ZGO1xuICB9XG5cbiAgcHVibGljIGdldCByZW1haW5pbmdUaW1lKCkge1xuICAgIHJldHVybiBhc1RpbWUoJ1JlbWFpbl9UaW1lX0gnLCAnUmVtYWluX1RpbWVfTScsIHRoaXMuZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGluaXRpYWxUaW1lKCkge1xuICAgIHJldHVybiBhc1RpbWUoJ0luaXRpYWxfVGltZV9IJywgJ0luaXRpYWxfVGltZV9NJywgdGhpcy5kYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcmVzZXJ2ZVRpbWUoKSB7XG4gICAgcmV0dXJuIGFzVGltZSgnUmVzZXJ2ZV9UaW1lX0gnLCAnUmVzZXJ2ZV9UaW1lX00nLCB0aGlzLmRhdGEpO1xuICB9XG5cbiAgcHVibGljIGdldCBjb3Vyc2UoKSB7XG4gICAgY29uc3QgdmFsdWUgPSBsb29rdXBSZWZlcmVuY2UoJ0NvdXJzZScsIHRoaXMuZGF0YSwgdGhpcy5kZXZpY2UpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc21hcnRDb3Vyc2UoKSB7XG4gICAgY29uc3QgdmFsdWUgPSBsb29rdXBSZWZlcmVuY2UoJ1NtYXJ0Q291cnNlJywgdGhpcy5kYXRhLCB0aGlzLmRldmljZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBlcnJvcigpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGxvb2t1cFJlZmVyZW5jZSgnRXJyb3InLCB0aGlzLmRhdGEsIHRoaXMuZGV2aWNlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiJdfQ==