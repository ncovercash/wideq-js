"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotLoggedInError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'NotLoggedInError';
    }
}
exports.NotLoggedInError = NotLoggedInError;
class NotConnectedError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'NotConnectedError';
    }
}
exports.NotConnectedError = NotConnectedError;
class APIError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
        this.name = 'APIError';
    }
}
exports.APIError = APIError;
class TokenError extends Error {
    constructor() {
        super('An authentication token was rejected.');
        this.name = 'TokenError';
    }
}
exports.TokenError = TokenError;
class MonitorError extends Error {
    constructor(deviceId, code) {
        super('Monitoring a device failed, possibly because the monitoring session failed and needs to be restarted.');
        this.deviceId = deviceId;
        this.code = code;
        this.name = 'MonitorError';
    }
}
exports.MonitorError = MonitorError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvcmUvZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxnQkFBaUIsU0FBUSxLQUFLO0lBQTNDOztRQUNTLFNBQUksR0FBRyxrQkFBa0IsQ0FBQztJQUNuQyxDQUFDO0NBQUE7QUFGRCw0Q0FFQztBQUVELE1BQWEsaUJBQWtCLFNBQVEsS0FBSztJQUE1Qzs7UUFDUyxTQUFJLEdBQUcsbUJBQW1CLENBQUM7SUFDcEMsQ0FBQztDQUFBO0FBRkQsOENBRUM7QUFFRCxNQUFhLFFBQVMsU0FBUSxLQUFLO0lBR2pDLFlBQ1MsSUFBWSxFQUNaLE9BQWU7UUFFdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSFIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFKakIsU0FBSSxHQUFHLFVBQVUsQ0FBQztJQU96QixDQUFDO0NBQ0Y7QUFURCw0QkFTQztBQUVELE1BQWEsVUFBVyxTQUFRLEtBQUs7SUFHbkM7UUFDRSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztRQUgxQyxTQUFJLEdBQUcsWUFBWSxDQUFDO0lBSTNCLENBQUM7Q0FDRjtBQU5ELGdDQU1DO0FBRUQsTUFBYSxZQUFhLFNBQVEsS0FBSztJQUdyQyxZQUNTLFFBQWdCLEVBQ2hCLElBQVk7UUFFbkIsS0FBSyxDQUFDLHVHQUF1RyxDQUFDLENBQUM7UUFIeEcsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBSmQsU0FBSSxHQUFHLGNBQWMsQ0FBQztJQU83QixDQUFDO0NBQ0Y7QUFURCxvQ0FTQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBOb3RMb2dnZWRJbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBwdWJsaWMgbmFtZSA9ICdOb3RMb2dnZWRJbkVycm9yJztcbn1cblxuZXhwb3J0IGNsYXNzIE5vdENvbm5lY3RlZEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBwdWJsaWMgbmFtZSA9ICdOb3RDb25uZWN0ZWRFcnJvcic7XG59XG5cbmV4cG9ydCBjbGFzcyBBUElFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIG5hbWUgPSAnQVBJRXJyb3InO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY29kZTogc3RyaW5nLFxuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcsXG4gICkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb2tlbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBwdWJsaWMgbmFtZSA9ICdUb2tlbkVycm9yJztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ0FuIGF1dGhlbnRpY2F0aW9uIHRva2VuIHdhcyByZWplY3RlZC4nKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTW9uaXRvckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBwdWJsaWMgbmFtZSA9ICdNb25pdG9yRXJyb3InO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGV2aWNlSWQ6IHN0cmluZyxcbiAgICBwdWJsaWMgY29kZTogc3RyaW5nLFxuICApIHtcbiAgICBzdXBlcignTW9uaXRvcmluZyBhIGRldmljZSBmYWlsZWQsIHBvc3NpYmx5IGJlY2F1c2UgdGhlIG1vbml0b3Jpbmcgc2Vzc2lvbiBmYWlsZWQgYW5kIG5lZWRzIHRvIGJlIHJlc3RhcnRlZC4nKTtcbiAgfVxufVxuIl19