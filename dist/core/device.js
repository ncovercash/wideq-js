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
const monitor_1 = require("./monitor");
var OnOffEnum;
(function (OnOffEnum) {
    OnOffEnum["OFF"] = "@CP_OFF_EN_W";
    OnOffEnum["ON"] = "@CP_ON_EN_W";
})(OnOffEnum = exports.OnOffEnum || (exports.OnOffEnum = {}));
class Device {
    constructor(client, device) {
        this.client = client;
        this.device = device;
    }
    poll() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented.');
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            this.model = yield this.client.getModelInfo(this.device);
            this.langPackProduct = yield this.client.getLangPackProduct(this.device);
            this.langPackModel = yield this.client.getLangPackModel(this.device);
        });
    }
    setControl(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.session.setDeviceControls(this.device.id, { [key]: value });
        });
    }
    createControlBinaryBuffer(status, keyToChange = undefined, newValue = undefined) {
        const spec = this.model.data.ControlWifi.action.SetControl;
        // e.g. [data] = "[{{TempRefrigerator}}, {{TempFreezer}}, {{IcePlus}}, {{FreshAirFilter}}, {{SmartSavingMode}}, 255, 255, 255, 255, 255, 255]"
        const specData = spec.data.substring(1, spec.data.length - 1).split(",").map((s) => s.trim());
        let result = [];
        specData.forEach((part) => {
            // variable
            if (part.startsWith("{{")) {
                part = part.substring(2, part.length - 2); // chop off {{ and }}
                if (part == keyToChange) {
                    result.push(Number(newValue));
                }
                else {
                    result.push(Number(status.data[part]));
                }
            }
            else { // constant
                result.push(Number(part));
            }
        });
        return Buffer.from(result);
    }
    setControlBinary(status, keyToChange = undefined, newValue = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            const buffer = this.createControlBinaryBuffer(status, keyToChange, newValue);
            return this.client.session.setDeviceControlBinary(this.device.id, buffer);
        });
    }
    getConfig(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.session.getDeviceConfig(this.device.id, key);
            return JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
        });
    }
    getControl(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.session.getDeviceConfig(this.device.id, key, 'Control');
            // The response comes in a funky key / value format: "(key:value)".
            const value = (data.split(':')[1] || '').slice(0, -1);
            return value;
        });
    }
    startMonitor() {
        return __awaiter(this, void 0, void 0, function* () {
            const monitor = new monitor_1.Monitor(this.client.session, this.device.id);
            yield monitor.start();
            this.monitor = monitor;
        });
    }
    stopMonitor() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.monitor) {
                return;
            }
            this.monitor.stop();
        });
    }
}
exports.Device = Device;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvcmUvZGV2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1Q0FBb0M7QUFRcEMsSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ25CLGlDQUFvQixDQUFBO0lBQ3BCLCtCQUFrQixDQUFBO0FBQ3BCLENBQUMsRUFIVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUdwQjtBQUVELE1BQWEsTUFBTTtJQU1qQixZQUNTLE1BQWMsRUFDZCxNQUFrQjtRQURsQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUUzQixDQUFDO0lBRVksSUFBSTs7WUFDZixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDdEMsQ0FBQztLQUFBO0lBRVksSUFBSTs7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkUsQ0FBQztLQUFBO0lBRVksVUFBVSxDQUFDLEdBQVcsRUFBRSxLQUFVOztZQUM3QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7S0FBQTtJQUVNLHlCQUF5QixDQUFD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LEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsRSxNQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFWSxXQUFXOztZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDakIsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixDQUFDO0tBQUE7Q0FDRjtBQXBGRCx3QkFvRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb25pdG9yIH0gZnJvbSAnLi9tb25pdG9yJztcblxuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAnLi4vY2xpZW50JztcbmltcG9ydCB7IERldmljZUluZm8gfSBmcm9tICcuL2RldmljZS1pbmZvJztcbmltcG9ydCB7IExhbmdQYWNrTW9kZWwgfSBmcm9tICcuL2xhbmctcGFjay1tb2RlbCc7XG5pbXBvcnQgeyBMYW5nUGFja1Byb2R1Y3QgfSBmcm9tICcuL2xhbmctcGFjay1wcm9kdWN0JztcbmltcG9ydCB7IE1vZGVsSW5mbyB9IGZyb20gJy4vbW9kZWwtaW5mbyc7XG5cbmV4cG9ydCBlbnVtIE9uT2ZmRW51bSB7XG4gIE9GRiA9ICdAQ1BfT0ZGX0VOX1cnLFxuICBPTiA9ICdAQ1BfT05fRU5fVycsXG59XG5cbmV4cG9ydCBjbGFzcyBEZXZpY2Uge1xuICBwdWJsaWMgbW9kZWwhOiBNb2RlbEluZm87XG4gIHB1YmxpYyBsYW5nUGFja1Byb2R1Y3QhOiBMYW5nUGFja1Byb2R1Y3Q7XG4gIHB1YmxpYyBsYW5nUGFja01vZGVsITogTGFuZ1BhY2tNb2RlbDtcbiAgcHVibGljIG1vbml0b3I/OiBNb25pdG9yO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY2xpZW50OiBDbGllbnQsXG4gICAgcHVibGljIGRldmljZTogRGV2aWNlSW5mbyxcbiAgKSB7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcG9sbCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkLicpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvYWQoKSB7XG4gICAgdGhpcy5tb2RlbCA9IGF3YWl0IHRoaXMuY2xpZW50LmdldE1vZGVsSW5mbyh0aGlzLmRldmljZSk7XG4gICAgdGhpcy5sYW5nUGFja1Byb2R1Y3QgPSBhd2FpdCB0aGlzLmNsaWVudC5nZXRMYW5nUGFja1Byb2R1Y3QodGhpcy5kZXZpY2UpO1xuICAgIHRoaXMubGFuZ1BhY2tNb2RlbCA9IGF3YWl0IHRoaXMuY2xpZW50LmdldExhbmdQYWNrTW9kZWwodGhpcy5kZXZpY2UpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldENvbnRyb2woa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuc2Vzc2lvbiEuc2V0RGV2aWNlQ29udHJvbHModGhpcy5kZXZpY2UuaWQsIHsgW2tleV06IHZhbHVlIH0pO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUNvbnRyb2xCaW5hcnlCdWZmZXIoc3RhdHVzOiBhbnksIGtleVRvQ2hhbmdlOiBzdHJpbmd8dW5kZWZpbmVkPXVuZGVmaW5lZCwgbmV3VmFsdWU6IHN0cmluZ3x1bmRlZmluZWQ9dW5kZWZpbmVkKTogQnVmZmVyIHtcbiAgICBjb25zdCBzcGVjID0gdGhpcy5tb2RlbC5kYXRhLkNvbnRyb2xXaWZpLmFjdGlvbi5TZXRDb250cm9sO1xuICAgIC8vIGUuZy4gW2RhdGFdID0gXCJbe3tUZW1wUmVmcmlnZXJhdG9yfX0sIHt7VGVtcEZyZWV6ZXJ9fSwge3tJY2VQbHVzfX0sIHt7RnJlc2hBaXJGaWx0ZXJ9fSwge3tTbWFydFNhdmluZ01vZGV9fSwgMjU1LCAyNTUsIDI1NSwgMjU1LCAyNTUsIDI1NV1cIlxuICAgIGNvbnN0IHNwZWNEYXRhID0gc3BlYy5kYXRhLnN1YnN0cmluZygxLCBzcGVjLmRhdGEubGVuZ3RoLTEpLnNwbGl0KFwiLFwiKS5tYXAoKHM6IHN0cmluZykgPT4gcy50cmltKCkpO1xuXG4gICAgbGV0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcblxuICAgIHNwZWNEYXRhLmZvckVhY2goKHBhcnQ6IHN0cmluZykgPT4ge1xuICAgICAgLy8gdmFyaWFibGVcbiAgICAgIGlmIChwYXJ0LnN0YXJ0c1dpdGgoXCJ7e1wiKSkge1xuICAgICAgICBwYXJ0ID0gcGFydC5zdWJzdHJpbmcoMiwgcGFydC5sZW5ndGgtMik7IC8vIGNob3Agb2ZmIHt7IGFuZCB9fVxuICAgICAgICBpZiAocGFydCA9PSBrZXlUb0NoYW5nZSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKE51bWJlcihuZXdWYWx1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKE51bWJlcihzdGF0dXMuZGF0YVtwYXJ0XSkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgeyAvLyBjb25zdGFudFxuICAgICAgICByZXN1bHQucHVzaChOdW1iZXIocGFydCkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHJlc3VsdCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0Q29udHJvbEJpbmFyeShzdGF0dXM6IGFueSwga2V5VG9DaGFuZ2U6IHN0cmluZ3x1bmRlZmluZWQ9dW5kZWZpbmVkLCBuZXdWYWx1ZTogc3RyaW5nfHVuZGVmaW5lZD11bmRlZmluZWQpIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLmNyZWF0ZUNvbnRyb2xCaW5hcnlCdWZmZXIoc3RhdHVzLCBrZXlUb0NoYW5nZSwgbmV3VmFsdWUpO1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5zZXNzaW9uIS5zZXREZXZpY2VDb250cm9sQmluYXJ5KHRoaXMuZGV2aWNlLmlkLCBidWZmZXIpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldENvbmZpZyhrZXk6IHN0cmluZykge1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLmNsaWVudC5zZXNzaW9uIS5nZXREZXZpY2VDb25maWcodGhpcy5kZXZpY2UuaWQsIGtleSk7XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShCdWZmZXIuZnJvbShkYXRhLCAnYmFzZTY0JykudG9TdHJpbmcoJ3V0Zi04JykpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldENvbnRyb2woa2V5OiBzdHJpbmcpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5jbGllbnQuc2Vzc2lvbiEuZ2V0RGV2aWNlQ29uZmlnKHRoaXMuZGV2aWNlLmlkLCBrZXksICdDb250cm9sJyk7XG5cbiAgICAvLyBUaGUgcmVzcG9uc2UgY29tZXMgaW4gYSBmdW5reSBrZXkgLyB2YWx1ZSBmb3JtYXQ6IFwiKGtleTp2YWx1ZSlcIi5cbiAgICBjb25zdCB2YWx1ZSA9IChkYXRhLnNwbGl0KCc6JylbMV0gfHwgJycpLnNsaWNlKDAsIC0xKTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdGFydE1vbml0b3IoKSB7XG4gICAgY29uc3QgbW9uaXRvciA9IG5ldyBNb25pdG9yKHRoaXMuY2xpZW50LnNlc3Npb24hLCB0aGlzLmRldmljZS5pZCk7XG4gICAgYXdhaXQgbW9uaXRvci5zdGFydCgpO1xuXG4gICAgdGhpcy5tb25pdG9yID0gbW9uaXRvcjtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdG9wTW9uaXRvcigpIHtcbiAgICBpZiAoIXRoaXMubW9uaXRvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubW9uaXRvci5zdG9wKCk7XG4gIH1cbn1cbiJdfQ==