"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const url = __importStar(require("url"));
const uuid = __importStar(require("uuid"));
const errors_1 = require("./errors");
const request_1 = require("./request");
class Session {
    constructor(auth, sessionId) {
        this.auth = auth;
        this.sessionId = sessionId;
    }
    post(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = url.resolve(this.auth.gateway.apiRoot + '/', path.startsWith('/') ? path.slice(1) : path);
            return request_1.requestClient.lgedmPost(target, data, this.auth.accessToken, this.sessionId);
        });
    }
    getDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.post('/device/deviceList');
            let { item: items = [] } = resp;
            if (!Array.isArray(items)) {
                items = [items];
            }
            return items;
        });
    }
    startMonitor(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.post('rti/rtiMon', {
                cmd: 'Mon',
                cmdOpt: 'Start',
                deviceId,
                workId: uuid.v4(),
            });
            return resp.workId;
        });
    }
    pollMonitor(deviceId, workId) {
        return __awaiter(this, void 0, void 0, function* () {
            const works = [{ deviceId, workId }];
            const resp = yield this.post('rti/rtiResult', { workList: works }).then(resp => resp.workList);
            if (!('returnCode' in resp)) {
                return null;
            }
            const code = _.get(resp, 'returnCode', '');
            if (code !== '0000') {
                throw new errors_1.MonitorError(deviceId, code);
            }
            if (!('returnData' in resp)) {
                return null;
            }
            return Buffer.from(resp.returnData, 'base64');
        });
    }
    stopMonitor(deviceId, workId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('rti/rtiMon', {
                cmd: 'Mon',
                cmdOpt: 'Stop',
                deviceId,
                workId,
            });
        });
    }
    setDeviceControls(deviceId, values) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post('rti/rtiControl', {
                cmd: 'Control',
                cmdOpt: 'Set',
                value: values,
                deviceId,
                workId: uuid.v4(),
                data: '',
            });
        });
    }
    setDeviceControlBinary(deviceId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post('rti/rtiControl', {
                cmd: 'Control',
                cmdOpt: 'Set',
                value: "ControlData",
                deviceId,
                workId: uuid.v4(),
                data: data.toString("base64"),
                format: "B64"
            });
        });
    }
    getDeviceConfig(deviceId, key, category = 'Config') {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.post('rti/rtiControl', {
                cmd: category,
                cmdOpt: 'Get',
                value: key,
                deviceId,
                workId: uuid.v4(),
                data: '',
            });
            return resp.returnData;
        });
    }
}
exports.Session = Session;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb3JlL3Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBNEI7QUFDNUIseUNBQTJCO0FBQzNCLDJDQUE2QjtBQUU3QixxQ0FBd0M7QUFDeEMsdUNBQTBDO0FBSTFDLE1BQWEsT0FBTztJQUNsQixZQUNTLElBQVUsRUFDVixTQUFpQjtRQURqQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsY0FBUyxHQUFULFNBQVMsQ0FBUTtJQUUxQixDQUFDO0lBRVksSUFBSSxDQUFDLElBQVksRUFBRSxJQUFVOztZQUN4QyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekcsT0FBTyx1QkFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2RixDQUFDO0tBQUE7SUFFWSxVQUFVOztZQUNyQixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUVuRCxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pCLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pCO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFD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LEVBQUUsRUFBRTthQUNULENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDO0tBQUE7Q0FFRjtBQW5HRCwwQkFtR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgKiBhcyB1cmwgZnJvbSAndXJsJztcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBBdXRoIH0gZnJvbSAnLi9hdXRoJztcbmltcG9ydCB7IE1vbml0b3JFcnJvciB9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7IHJlcXVlc3RDbGllbnQgfSBmcm9tICcuL3JlcXVlc3QnO1xuXG5leHBvcnQgdHlwZSBXb3JrSWQgPSB0eXBlb2YgdXVpZFsndjQnXTtcblxuZXhwb3J0IGNsYXNzIFNlc3Npb24ge1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGF1dGg6IEF1dGgsXG4gICAgcHVibGljIHNlc3Npb25JZDogc3RyaW5nLFxuICApIHtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwb3N0KHBhdGg6IHN0cmluZywgZGF0YT86IGFueSkge1xuICAgIGNvbnN0IHRhcmdldCA9IHVybC5yZXNvbHZlKHRoaXMuYXV0aC5nYXRld2F5LmFwaVJvb3QgKyAnLycsIHBhdGguc3RhcnRzV2l0aCgnLycpID8gcGF0aC5zbGljZSgxKSA6IHBhdGgpO1xuICAgIHJldHVybiByZXF1ZXN0Q2xpZW50LmxnZWRtUG9zdCh0YXJnZXQsIGRhdGEsIHRoaXMuYXV0aC5hY2Nlc3NUb2tlbiEsIHRoaXMuc2Vzc2lvbklkKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXREZXZpY2VzKCkge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLnBvc3QoJy9kZXZpY2UvZGV2aWNlTGlzdCcpO1xuXG4gICAgbGV0IHsgaXRlbTogaXRlbXMgPSBbXSB9ID0gcmVzcDtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICBpdGVtcyA9IFtpdGVtc107XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHN0YXJ0TW9uaXRvcihkZXZpY2VJZDogc3RyaW5nKSB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMucG9zdCgncnRpL3J0aU1vbicsIHtcbiAgICAgIGNtZDogJ01vbicsXG4gICAgICBjbWRPcHQ6ICdTdGFydCcsXG4gICAgICBkZXZpY2VJZCxcbiAgICAgIHdvcmtJZDogdXVpZC52NCgpLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3Aud29ya0lkO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHBvbGxNb25pdG9yKGRldmljZUlkOiBzdHJpbmcsIHdvcmtJZDogV29ya0lkKSB7XG4gICAgY29uc3Qgd29ya3MgPSBbeyBkZXZpY2VJZCwgd29ya0lkIH1dO1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLnBvc3QoJ3J0aS9ydGlSZXN1bHQnLCB7IHdvcmtMaXN0OiB3b3JrcyB9KS50aGVuKHJlc3AgPT4gcmVzcC53b3JrTGlzdCk7XG5cbiAgICBpZiAoISgncmV0dXJuQ29kZScgaW4gcmVzcCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNvZGUgPSBfLmdldChyZXNwLCAncmV0dXJuQ29kZScsICcnKTtcbiAgICBpZiAoY29kZSAhPT0gJzAwMDAnKSB7XG4gICAgICB0aHJvdyBuZXcgTW9uaXRvckVycm9yKGRldmljZUlkLCBjb2RlKTtcbiAgICB9XG5cbiAgICBpZiAoISgncmV0dXJuRGF0YScgaW4gcmVzcCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBCdWZmZXIuZnJvbShyZXNwLnJldHVybkRhdGEsICdiYXNlNjQnKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdG9wTW9uaXRvcihkZXZpY2VJZDogc3RyaW5nLCB3b3JrSWQ6IFdvcmtJZCkge1xuICAgIGF3YWl0IHRoaXMucG9zdCgncnRpL3J0aU1vbicsIHtcbiAgICAgIGNtZDogJ01vbicsXG4gICAgICBjbWRPcHQ6ICdTdG9wJyxcbiAgICAgIGRldmljZUlkLFxuICAgICAgd29ya0lkLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldERldmljZUNvbnRyb2xzKGRldmljZUlkOiBzdHJpbmcsIHZhbHVlczogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMucG9zdCgncnRpL3J0aUNvbnRyb2wnLCB7XG4gICAgICBjbWQ6ICdDb250cm9sJyxcbiAgICAgIGNtZE9wdDogJ1NldCcsXG4gICAgICB2YWx1ZTogdmFsdWVzLFxuICAgICAgZGV2aWNlSWQsXG4gICAgICB3b3JrSWQ6IHV1aWQudjQoKSxcbiAgICAgIGRhdGE6ICcnLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldERldmljZUNvbnRyb2xCaW5hcnkoZGV2aWNlSWQ6IHN0cmluZywgZGF0YTogQnVmZmVyKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zdCgncnRpL3J0aUNvbnRyb2wnLCB7XG4gICAgICBjbWQ6ICdDb250cm9sJyxcbiAgICAgIGNtZE9wdDogJ1NldCcsXG4gICAgICB2YWx1ZTogXCJDb250cm9sRGF0YVwiLFxuICAgICAgZGV2aWNlSWQsXG4gICAgICB3b3JrSWQ6IHV1aWQudjQoKSxcbiAgICAgIGRhdGE6IGRhdGEudG9TdHJpbmcoXCJiYXNlNjRcIiksXG4gICAgICBmb3JtYXQ6IFwiQjY0XCJcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXREZXZpY2VDb25maWcoZGV2aWNlSWQ6IHN0cmluZywga2V5OiBzdHJpbmcsIGNhdGVnb3J5ID0gJ0NvbmZpZycpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLnBvc3QoJ3J0aS9ydGlDb250cm9sJywge1xuICAgICAgY21kOiBjYXRlZ29yeSxcbiAgICAgIGNtZE9wdDogJ0dldCcsXG4gICAgICB2YWx1ZToga2V5LFxuICAgICAgZGV2aWNlSWQsXG4gICAgICB3b3JrSWQ6IHV1aWQudjQoKSxcbiAgICAgIGRhdGE6ICcnLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3AucmV0dXJuRGF0YTtcbiAgfVxuXG59XG4iXX0=