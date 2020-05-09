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
const errors_1 = require("./errors");
class Monitor {
    constructor(session, deviceId) {
        this.session = session;
        this.deviceId = deviceId;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.workId = yield this.session.startMonitor(this.deviceId);
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.workId && (yield this.session.stopMonitor(this.deviceId, this.workId));
        });
    }
    poll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.workId) {
                return null;
            }
            try {
                return yield this.session.pollMonitor(this.deviceId, this.workId);
            }
            catch (e) {
                if (e instanceof errors_1.MonitorError) {
                    yield this.stop();
                    yield this.start();
                }
                else {
                    throw e;
                }
            }
            return null;
        });
    }
}
exports.Monitor = Monitor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb3JlL21vbml0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFDQUF3QztBQUd4QyxNQUFhLE9BQU87SUFHbEIsWUFDUyxPQUFnQixFQUNoQixRQUFnQjtRQURoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQVE7SUFFekIsQ0FBQztJQUVZLEtBQUs7O1lBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0QsQ0FBQztLQUFBO0lBRVksSUFBSTs7WUFDZixJQUFJLENBQUMsTUFBTSxLQUFJLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztRQUM1RSxDQUFDO0tBQUE7SUFFWSxJQUFJOztZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNoQixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsSUFBSTtnQkFDRixPQUFPLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkU7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixJQUFJLENBQUMsWUFBWSxxQkFBWSxFQUFFO29CQUM3QixNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDbEIsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3BCO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxDQUFDO2lCQUNUO2FBQ0Y7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FBQTtDQUNGO0FBbkNELDBCQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbml0b3JFcnJvciB9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7IFNlc3Npb24sIFdvcmtJZCB9IGZyb20gJy4vc2Vzc2lvbic7XG5cbmV4cG9ydCBjbGFzcyBNb25pdG9yIHtcbiAgcHVibGljIHdvcmtJZD86IFdvcmtJZDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHNlc3Npb246IFNlc3Npb24sXG4gICAgcHVibGljIGRldmljZUlkOiBzdHJpbmcsXG4gICkge1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHN0YXJ0KCkge1xuICAgIHRoaXMud29ya0lkID0gYXdhaXQgdGhpcy5zZXNzaW9uLnN0YXJ0TW9uaXRvcih0aGlzLmRldmljZUlkKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdG9wKCkge1xuICAgIHRoaXMud29ya0lkICYmIGF3YWl0IHRoaXMuc2Vzc2lvbi5zdG9wTW9uaXRvcih0aGlzLmRldmljZUlkLCB0aGlzLndvcmtJZCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcG9sbCgpIHtcbiAgICBpZiAoIXRoaXMud29ya0lkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2Vzc2lvbi5wb2xsTW9uaXRvcih0aGlzLmRldmljZUlkLCB0aGlzLndvcmtJZCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBNb25pdG9yRXJyb3IpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5zdG9wKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuc3RhcnQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==