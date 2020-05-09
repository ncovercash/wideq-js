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
var DehumidifierOperationMode;
(function (DehumidifierOperationMode) {
    DehumidifierOperationMode["SLEEP"] = "@AP_MAIN_MID_OPMODE_SLEEP_W";
    DehumidifierOperationMode["SILENT"] = "@AP_MAIN_MID_OPMODE_SILENT_W";
    /** should be silent */
    DehumidifierOperationMode["CLIENT"] = "@AP_MAIN_MID_OPMODE_CILENT_DEHUM_W";
    DehumidifierOperationMode["AUTO"] = "@AP_MAIN_MID_OPMODE_AUTO_W";
    DehumidifierOperationMode["SMART"] = "@AP_MAIN_MID_OPMODE_SMART_DEHUM_W";
    DehumidifierOperationMode["FAST"] = "@AP_MAIN_MID_OPMODE_FAST_DEHUM_W";
    DehumidifierOperationMode["CONCENTRATION_DRY"] = "@AP_MAIN_MID_OPMODE_CONCENTRATION_DRY_W";
    DehumidifierOperationMode["CLOTHING_DRY"] = "@AP_MAIN_MID_OPMODE_CLOTHING_DRY_W";
})(DehumidifierOperationMode = exports.DehumidifierOperationMode || (exports.DehumidifierOperationMode = {}));
/**
 * WindStrength
 *
 * As I tested with my Dehumidifier, both Low and High are available.
 */
var DehumidifierWindStrength;
(function (DehumidifierWindStrength) {
    DehumidifierWindStrength["LowestOfTheLow"] = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_LOWST_LOW_W";
    DehumidifierWindStrength["Lowest"] = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_LOWST_W";
    DehumidifierWindStrength["Low"] = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_LOW_W";
    DehumidifierWindStrength["LowMid"] = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_LOW_MID_W";
    DehumidifierWindStrength["Mid"] = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_MID_W";
    DehumidifierWindStrength["MidHigh"] = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_MID_HIGH_W";
    DehumidifierWindStrength["High"] = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_HIGH_W";
    DehumidifierWindStrength["Power"] = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_POWER_W";
    DehumidifierWindStrength["Auto"] = "@AP_MAIN_MID_WINDSTRENGTH_DHUM_AUTO_W";
})(DehumidifierWindStrength = exports.DehumidifierWindStrength || (exports.DehumidifierWindStrength = {}));
var DehumidifierRACMode;
(function (DehumidifierRACMode) {
    DehumidifierRACMode["OFF"] = "@AP_OFF_W";
    DehumidifierRACMode["ON"] = "@AP_ON_W";
})(DehumidifierRACMode = exports.DehumidifierRACMode || (exports.DehumidifierRACMode = {}));
var DehumidifierOperation;
(function (DehumidifierOperation) {
    DehumidifierOperation["OFF"] = "@operation_off";
    DehumidifierOperation["ON"] = "@operation_on";
})(DehumidifierOperation = exports.DehumidifierOperation || (exports.DehumidifierOperation = {}));
class DehumidifierDevice extends device_1.Device {
    poll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.monitor) {
                return null;
            }
            const resp = yield this.monitor.poll();
            if (resp) {
                const data = this.model.decodeMonitor(resp);
                return new DehumidifierStatus(this, data);
            }
            return null;
        });
    }
    /**
     * Turn on or off the device
     * @param isOn
     */
    setOn(isOn) {
        return __awaiter(this, void 0, void 0, function* () {
            const op = isOn ? DehumidifierOperation.ON : DehumidifierOperation.OFF;
            const opValue = this.model.enumValue('Operation', op);
            yield this.setControl('Operation', opValue);
        });
    }
    setMode(mode) {
        return __awaiter(this, void 0, void 0, function* () {
            const opValue = this.model.enumValue('OpMode', mode);
            yield this.setControl('OpMode', opValue);
        });
    }
    setWindStrength(windStrength) {
        return __awaiter(this, void 0, void 0, function* () {
            const opValue = this.model.enumValue('WindStrength', windStrength);
            yield this.setControl('WindStrength', opValue);
        });
    }
    setAirRemoval(airRemoval) {
        return __awaiter(this, void 0, void 0, function* () {
            const opValue = this.model.enumValue('AirRemoval', airRemoval);
            yield this.setControl('AirRemoval', opValue);
        });
    }
}
exports.DehumidifierDevice = DehumidifierDevice;
class DehumidifierStatus {
    constructor(device, data) {
        this.device = device;
        this.data = data;
    }
    get mode() {
        const key = utils_1.lookupEnum('OpMode', this.data, this.device);
        return utils_1.asEnum(DehumidifierOperationMode, key);
    }
    get windStrength() {
        const key = utils_1.lookupEnum('WindStrength', this.data, this.device);
        return utils_1.asEnum(DehumidifierWindStrength, key);
    }
    get isAirRemovalOn() {
        const key = utils_1.lookupEnum('AirRemoval', this.data, this.device);
        return utils_1.asEnum(DehumidifierRACMode, key) !== DehumidifierRACMode.OFF;
    }
    get targetHumidity() {
        return Number(this.data.HumidityCfg);
    }
    get currentHumidity() {
        return Number(this.data.SensorHumidity);
    }
    get isOn() {
        const key = utils_1.lookupEnum('Operation', this.data, this.device);
        return utils_1.asEnum(DehumidifierOperation, key) !== DehumidifierOperation.OFF;
    }
}
exports.DehumidifierStatus = DehumidifierStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVodW1pZGlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2RldmljZXMvZGVodW1pZGlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBd0M7QUFDeEMsb0NBQThDO0FBRTlDLElBQVkseUJBVVg7QUFWRCxXQUFZLHlCQUF5QjtJQUNuQyxrRUFBcUMsQ0FBQTtJQUNyQyxvRUFBdUMsQ0FBQTtJQUN2Qyx1QkFBdUI7SUFDdkIsMEVBQTZDLENBQUE7SUFDN0MsZ0VBQW1DLENBQUE7SUFDbkMsd0VBQTJDLENBQUE7SUFDM0Msc0VBQXlDLENBQUE7SUFDekMsMEZBQTZELENBQUE7SUFDN0QsZ0ZBQW1ELENBQUE7QUFDckQsQ0FBQyxFQVZXLHlCQUF5QixHQUF6QixpQ0FBeUIsS0FBekIsaUNBQXlCLFFBVXBDO0FBRUQ7Ozs7R0FJRztBQUNILElBQVksd0JBVVg7QUFWRCxXQUFZLHdCQUF3QjtJQUNsQyx5RkFBNkQsQ0FBQTtJQUM3RCw2RUFBaUQsQ0FBQTtJQUNqRCx3RUFBNEMsQ0FBQTtJQUM1QywrRUFBbUQsQ0FBQTtJQUNuRCx3RUFBNEMsQ0FBQTtJQUM1QyxpRkFBcUQsQ0FBQTtJQUNyRCwwRUFBOEMsQ0FBQTtJQUM5Qyw0RUFBZ0QsQ0FBQTtJQUNoRCwwRUFBOEMsQ0FBQTtBQUNoRCxDQUFDLEVBVlcsd0JBQXdCLEdBQXhCLGdDQUF3QixLQUF4QixnQ0FBd0IsUUFVbkM7QUFFRCxJQUFZLG1CQUdYO0FBSEQsV0FBWSxtQkFBbUI7SUFDN0Isd0NBQWlCLENBQUE7SUFDakIsc0NBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSFcsbUJBQW1CLEdBQW5CLDJCQUFtQixLQUFuQiwyQkFBbUIsUUFHOUI7QUFFRCxJQUFZLHFCQUdYO0FBSEQsV0FBWSxxQkFBcUI7SUFDL0IsK0NBQXNCLENBQUE7SUFDdEIsNkNBQW9CLENBQUE7QUFDdEIsQ0FBQyxFQUhXLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FB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LE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUFXLGVBQWU7UUFDeEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2IsTUFBTSxHQUFHLEdBQUcsa0JBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsT0FBTyxjQUFNLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLEtBQUsscUJBQXFCLENBQUMsR0FBRyxDQUFDO0lBQzFFLENBQUM7Q0FDRjtBQWxDRCxnREFrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZXZpY2UgfSBmcm9tICcuLi9jb3JlL2RldmljZSc7XG5pbXBvcnQgeyBhc0VudW0sIGxvb2t1cEVudW0gfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBlbnVtIERlaHVtaWRpZmllck9wZXJhdGlvbk1vZGUge1xuICBTTEVFUCA9ICdAQVBfTUFJTl9NSURfT1BNT0RFX1NMRUVQX1cnLFxuICBTSUxFTlQgPSAnQEFQX01BSU5fTUlEX09QTU9ERV9TSUxFTlRfVycsXG4gIC8qKiBzaG91bGQgYmUgc2lsZW50ICovXG4gIENMSUVOVCA9ICdAQVBfTUFJTl9NSURfT1BNT0RFX0NJTEVOVF9ERUhVTV9XJyxcbiAgQVVUTyA9ICdAQVBfTUFJTl9NSURfT1BNT0RFX0FVVE9fVycsXG4gIFNNQVJUID0gJ0BBUF9NQUlOX01JRF9PUE1PREVfU01BUlRfREVIVU1fVycsXG4gIEZBU1QgPSAnQEFQX01BSU5fTUlEX09QTU9ERV9GQVNUX0RFSFVNX1cnLFxuICBDT05DRU5UUkFUSU9OX0RSWSA9ICdAQVBfTUFJTl9NSURfT1BNT0RFX0NPTkNFTlRSQVRJT05fRFJZX1cnLFxuICBDTE9USElOR19EUlkgPSAnQEFQX01BSU5fTUlEX09QTU9ERV9DTE9USElOR19EUllfVycsXG59XG5cbi8qKlxuICogV2luZFN0cmVuZ3RoXG4gKlxuICogQXMgSSB0ZXN0ZWQgd2l0aCBteSBEZWh1bWlkaWZpZXIsIGJvdGggTG93IGFuZCBIaWdoIGFyZSBhdmFpbGFibGUuXG4gKi9cbmV4cG9ydCBlbnVtIERlaHVtaWRpZmllcldpbmRTdHJlbmd0aCB7XG4gIExvd2VzdE9mVGhlTG93ID0gJ0BBUF9NQUlOX01JRF9XSU5EU1RSRU5HVEhfREhVTV9MT1dTVF9MT1dfVycsXG4gIExvd2VzdCA9ICdAQVBfTUFJTl9NSURfV0lORFNUUkVOR1RIX0RIVU1fTE9XU1RfVycsXG4gIExvdyA9ICdAQVBfTUFJTl9NSURfV0lORFNUUkVOR1RIX0RIVU1fTE9XX1cnLFxuICBMb3dNaWQgPSAnQEFQX01BSU5fTUlEX1dJTkRTVFJFTkdUSF9ESFVNX0xPV19NSURfVycsXG4gIE1pZCA9ICdAQVBfTUFJTl9NSURfV0lORFNUUkVOR1RIX0RIVU1fTUlEX1cnLFxuICBNaWRIaWdoID0gJ0BBUF9NQUlOX01JRF9XSU5EU1RSRU5HVEhfREhVTV9NSURfSElHSF9XJyxcbiAgSGlnaCA9ICdAQVBfTUFJTl9NSURfV0lORFNUUkVOR1RIX0RIVU1fSElHSF9XJyxcbiAgUG93ZXIgPSAnQEFQX01BSU5fTUlEX1dJTkRTVFJFTkdUSF9ESFVNX1BPV0VSX1cnLFxuICBBdXRvID0gJ0BBUF9NQUlOX01JRF9XSU5EU1RSRU5HVEhfREhVTV9BVVRPX1cnLFxufVxuXG5leHBvcnQgZW51bSBEZWh1bWlkaWZpZXJSQUNNb2RlIHtcbiAgT0ZGID0gJ0BBUF9PRkZfVycsXG4gIE9OID0gJ0BBUF9PTl9XJyxcbn1cblxuZXhwb3J0IGVudW0gRGVodW1pZGlmaWVyT3BlcmF0aW9uIHtcbiAgT0ZGID0gJ0BvcGVyYXRpb25fb2ZmJyxcbiAgT04gPSAnQG9wZXJhdGlvbl9vbicsXG59XG5cbmV4cG9ydCBjbGFzcyBEZWh1bWlkaWZpZXJEZXZpY2UgZXh0ZW5kcyBEZXZpY2Uge1xuICBwdWJsaWMgYXN5bmMgcG9sbCgpIHtcbiAgICBpZiAoIXRoaXMubW9uaXRvcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMubW9uaXRvci5wb2xsKCk7XG4gICAgaWYgKHJlc3ApIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLm1vZGVsLmRlY29kZU1vbml0b3IocmVzcCk7XG4gICAgICByZXR1cm4gbmV3IERlaHVtaWRpZmllclN0YXR1cyh0aGlzLCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUdXJuIG9uIG9yIG9mZiB0aGUgZGV2aWNlXG4gICAqIEBwYXJhbSBpc09uXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgc2V0T24oaXNPbjogYm9vbGVhbikge1xuICAgIGNvbnN0IG9wID0gaXNPbiA/IERlaHVtaWRpZmllck9wZXJhdGlvbi5PTiA6IERlaHVtaWRpZmllck9wZXJhdGlvbi5PRkY7XG4gICAgY29uc3Qgb3BWYWx1ZSA9IHRoaXMubW9kZWwuZW51bVZhbHVlKCdPcGVyYXRpb24nLCBvcCk7XG5cbiAgICBhd2FpdCB0aGlzLnNldENvbnRyb2woJ09wZXJhdGlvbicsIG9wVmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldE1vZGUobW9kZTogRGVodW1pZGlmaWVyT3BlcmF0aW9uTW9kZSkge1xuICAgIGNvbnN0IG9wVmFsdWUgPSB0aGlzLm1vZGVsLmVudW1WYWx1ZSgnT3BNb2RlJywgbW9kZSk7XG5cbiAgICBhd2FpdCB0aGlzLnNldENvbnRyb2woJ09wTW9kZScsIG9wVmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFdpbmRTdHJlbmd0aCh3aW5kU3RyZW5ndGg6IERlaHVtaWRpZmllcldpbmRTdHJlbmd0aCkge1xuICAgIGNvbnN0IG9wVmFsdWUgPSB0aGlzLm1vZGVsLmVudW1WYWx1ZSgnV2luZFN0cmVuZ3RoJywgd2luZFN0cmVuZ3RoKTtcblxuICAgIGF3YWl0IHRoaXMuc2V0Q29udHJvbCgnV2luZFN0cmVuZ3RoJywgb3BWYWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0QWlyUmVtb3ZhbChhaXJSZW1vdmFsOiBEZWh1bWlkaWZpZXJSQUNNb2RlKSB7XG4gICAgY29uc3Qgb3BWYWx1ZSA9IHRoaXMubW9kZWwuZW51bVZhbHVlKCdBaXJSZW1vdmFsJywgYWlyUmVtb3ZhbCk7XG5cbiAgICBhd2FpdCB0aGlzLnNldENvbnRyb2woJ0FpclJlbW92YWwnLCBvcFZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVodW1pZGlmaWVyU3RhdHVzIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkZXZpY2U6IERlaHVtaWRpZmllckRldmljZSxcbiAgICBwdWJsaWMgZGF0YTogYW55LFxuICApIHtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbW9kZSgpIHtcbiAgICBjb25zdCBrZXkgPSBsb29rdXBFbnVtKCdPcE1vZGUnLCB0aGlzLmRhdGEsIHRoaXMuZGV2aWNlKTtcbiAgICByZXR1cm4gYXNFbnVtKERlaHVtaWRpZmllck9wZXJhdGlvbk1vZGUsIGtleSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHdpbmRTdHJlbmd0aCgpIHtcbiAgICBjb25zdCBrZXkgPSBsb29rdXBFbnVtKCdXaW5kU3RyZW5ndGgnLCB0aGlzLmRhdGEsIHRoaXMuZGV2aWNlKTtcbiAgICByZXR1cm4gYXNFbnVtKERlaHVtaWRpZmllcldpbmRTdHJlbmd0aCwga2V5KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNBaXJSZW1vdmFsT24oKSB7XG4gICAgY29uc3Qga2V5ID0gbG9va3VwRW51bSgnQWlyUmVtb3ZhbCcsIHRoaXMuZGF0YSwgdGhpcy5kZXZpY2UpO1xuICAgIHJldHVybiBhc0VudW0oRGVodW1pZGlmaWVyUkFDTW9kZSwga2V5KSAhPT0gRGVodW1pZGlmaWVyUkFDTW9kZS5PRkY7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRhcmdldEh1bWlkaXR5KCkge1xuICAgIHJldHVybiBOdW1iZXIodGhpcy5kYXRhLkh1bWlkaXR5Q2ZnKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY3VycmVudEh1bWlkaXR5KCkge1xuICAgIHJldHVybiBOdW1iZXIodGhpcy5kYXRhLlNlbnNvckh1bWlkaXR5KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaXNPbigpIHtcbiAgICBjb25zdCBrZXkgPSBsb29rdXBFbnVtKCdPcGVyYXRpb24nLCB0aGlzLmRhdGEsIHRoaXMuZGV2aWNlKTtcbiAgICByZXR1cm4gYXNFbnVtKERlaHVtaWRpZmllck9wZXJhdGlvbiwga2V5KSAhPT0gRGVodW1pZGlmaWVyT3BlcmF0aW9uLk9GRjtcbiAgfVxufVxuIl19