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
const constants_1 = require("./constants");
const request_1 = require("./request");
class DeviceInfo {
    constructor(data) {
        this.data = data;
    }
    loadModelInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return request_1.requestClient.get(this.modelInfoUrl).then(resp => resp.data);
        });
    }
    loadLangPackProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.langPackProductUrl && request_1.requestClient.get(this.langPackProductUrl).then(resp => resp.data);
        });
    }
    loadLangPackModel() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.langPackModelUrl && request_1.requestClient.get(this.langPackModelUrl).then(resp => resp.data);
        });
    }
    get modelId() {
        return this.data.modelNm;
    }
    get id() {
        return this.data.deviceId;
    }
    get modelInfoUrl() {
        return this.data.modelJsonUrl;
    }
    get langPackProductUrl() {
        return this.data.langPackProductTypeUri;
    }
    get langPackModelUrl() {
        return this.data.langPackModelUri;
    }
    get macAddress() {
        return this.data.macAddress;
    }
    get name() {
        return this.data.alias;
    }
    get type() {
        return constants_1.DeviceType[this.data.deviceType];
    }
    toString() {
        return `${this.id}: ${this.name} (${this.type} ${this.modelId})`;
    }
}
exports.DeviceInfo = DeviceInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLWluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29yZS9kZXZpY2UtaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQXlDO0FBQ3pDLHVDQUEwQztBQWExQyxNQUFhLFVBQVU7SUFDckIsWUFDUyxJQUFnQjtRQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO0lBRXpCLENBQUM7SUFFWSxhQUFhOztZQUN4QixPQUFPLHVCQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEUsQ0FBQztLQUFBO0lBRVksbUJBQW1COztZQUM5QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsSUFBSSx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkcsQ0FBQztLQUFBO0lBRVksaUJBQWlCOztZQUM1QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkcsQ0FBQztLQUFBO0lBRUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQVcsRUFBRTtRQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQVcsWUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFXLGtCQUFrQjtRQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUM7SUFDMUMsQ0FBQztJQUVELElBQVcsZ0JBQWdCO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNiLE9BQU8sc0JBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxRQUFRO1FBQ2IsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQztJQUNuRSxDQUFDO0NBQ0Y7QUFyREQsZ0NBcURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGV2aWNlVHlwZSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IHJlcXVlc3RDbGllbnQgfSBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERldmljZURhdGEge1xuICBtb2RlbE5tOiBzdHJpbmc7XG4gIGRldmljZUlkOiBzdHJpbmc7XG4gIG1vZGVsSnNvblVybDogc3RyaW5nO1xuICBsYW5nUGFja1Byb2R1Y3RUeXBlVXJpOiBzdHJpbmc7XG4gIGxhbmdQYWNrTW9kZWxVcmk6IHN0cmluZztcbiAgbWFjQWRkcmVzczogc3RyaW5nO1xuICBhbGlhczogc3RyaW5nO1xuICBkZXZpY2VUeXBlOiBEZXZpY2VUeXBlO1xufVxuXG5leHBvcnQgY2xhc3MgRGV2aWNlSW5mbyB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGF0YTogRGV2aWNlRGF0YSxcbiAgKSB7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbG9hZE1vZGVsSW5mbygpIHtcbiAgICByZXR1cm4gcmVxdWVzdENsaWVudC5nZXQodGhpcy5tb2RlbEluZm9VcmwpLnRoZW4ocmVzcCA9PiByZXNwLmRhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGxvYWRMYW5nUGFja1Byb2R1Y3QoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFuZ1BhY2tQcm9kdWN0VXJsICYmIHJlcXVlc3RDbGllbnQuZ2V0KHRoaXMubGFuZ1BhY2tQcm9kdWN0VXJsKS50aGVuKHJlc3AgPT4gcmVzcC5kYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBsb2FkTGFuZ1BhY2tNb2RlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5sYW5nUGFja01vZGVsVXJsICYmIHJlcXVlc3RDbGllbnQuZ2V0KHRoaXMubGFuZ1BhY2tNb2RlbFVybCkudGhlbihyZXNwID0+IHJlc3AuZGF0YSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1vZGVsSWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5tb2RlbE5tO1xuICB9XG5cbiAgcHVibGljIGdldCBpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmRldmljZUlkO1xuICB9XG5cbiAgcHVibGljIGdldCBtb2RlbEluZm9VcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5tb2RlbEpzb25Vcmw7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxhbmdQYWNrUHJvZHVjdFVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmxhbmdQYWNrUHJvZHVjdFR5cGVVcmk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxhbmdQYWNrTW9kZWxVcmwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YS5sYW5nUGFja01vZGVsVXJpO1xuICB9XG5cbiAgcHVibGljIGdldCBtYWNBZGRyZXNzKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFjQWRkcmVzcztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmFsaWFzO1xuICB9XG5cbiAgcHVibGljIGdldCB0eXBlKCkge1xuICAgIHJldHVybiBEZXZpY2VUeXBlW3RoaXMuZGF0YS5kZXZpY2VUeXBlXTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5pZH06ICR7dGhpcy5uYW1lfSAoJHt0aGlzLnR5cGV9ICR7dGhpcy5tb2RlbElkfSlgO1xuICB9XG59XG4iXX0=