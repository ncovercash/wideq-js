"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const errors_1 = require("./errors");
const constants = __importStar(require("./constants"));
const debug = require('debug')('wideq:core:request');
const client = axios_1.default.create();
client.defaults.headers['post'] = {
    'x-thinq-application-key': constants.APP_KEY,
    'x-thinq-security-key': constants.SECURITY_KEY,
    'Accept': 'application/json',
};
client.interceptors.request.use((config) => {
    debug(' -> %s', config.url);
    return config;
});
client.interceptors.response.use((resp) => {
    debug(' <- %s', resp.config.url);
    return resp;
});
client.lgedmPost = ((url, data, accessToken, sessionId) => __awaiter(this, void 0, void 0, function* () {
    const headers = {};
    if (typeof accessToken === 'string') {
        headers['x-thinq-token'] = accessToken;
    }
    if (typeof sessionId === 'string') {
        headers['x-thinq-jsessionId'] = sessionId;
    }
    const resp = yield client.post(url, { [constants.DATA_ROOT]: data }, {
        headers,
    });
    const out = resp.data[constants.DATA_ROOT];
    // we must release control otherwise it bricks the stock app for a while
    if (url.endsWith("rtiControl")) {
        yield client.post(url.replace("rtiControl", "delControlPermission"), {
            [constants.DATA_ROOT]: {
                deviceId: data.deviceId // this exists for control commands
            }
        }, { headers });
    }
    if ('returnCd' in out) {
        const code = out.returnCd;
        if (code !== '0000') {
            switch (code) {
                case '0102':
                    throw new errors_1.NotLoggedInError();
                case '0106':
                    throw new errors_1.NotConnectedError();
                default:
                    const message = (out.returnMsg || '');
                    throw new errors_1.APIError(code, message);
            }
        }
        return out;
    }
}));
exports.requestClient = client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb3JlL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrREFBNkM7QUFDN0MscUNBQXlFO0FBRXpFLHVEQUF5QztBQUV6QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQU1yRCxNQUFNLE1BQU0sR0FBRyxlQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDOUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUc7SUFDaEMseUJBQXlCLEVBQUUsU0FBUyxDQUFDLE9BQU87SUFDNUMsc0JBQXNCLEVBQUUsU0FBUyxDQUFDLFlBQVk7SUFDOUMsUUFBUSxFQUFFLGtCQUFrQjtDQUM3QixDQUFDO0FBRUYsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDekMsS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFNUIsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUN4QyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFakMsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUMsQ0FBQztBQUVGLE1BQWMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxFQUFFO0lBQ3ZFLE1BQU0sT0FBTyxHQUE4QixFQUFFLENBQUM7SUFFOUMsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7UUFDbkMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLFdBQVcsQ0FBQztLQUN4QztJQUNELElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQ2pDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLFNBQVMsQ0FBQztLQUMzQztJQUVELE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNuRSxPQUFPO0tBQ1IsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFM0Msd0VBQXdFO0lBQ3hFLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUM5QixNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsc0JBQXNCLENBQUMsRUFBRTtZQUNuRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDckIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsbUNBQW1DO2FBQzVEO1NBQ0YsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDakI7SUFFRCxJQUFJLFVBQVUsSUFBSSxHQUFHLEVBQUU7UUFDckIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQWtCLENBQUM7UUFFcEMsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQ25CLFFBQVEsSUFBSSxFQUFFO2dCQUNaLEtBQUssTUFBTTtvQkFDVCxNQUFNLElBQUkseUJBQWdCLEVBQUUsQ0FBQztnQkFFL0IsS0FBSyxNQUFNO29CQUNULE1BQU0sSUFBSSwwQkFBaUIsRUFBRSxDQUFDO2dCQUVoQztvQkFDRSxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFXLENBQUM7b0JBQ2hELE1BQU0sSUFBSSxpQkFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNyQztTQUNGO1FBRUQsT0FBTyxHQUFHLENBQUM7S0FDWjtBQUVILENBQUMsQ0FBQSxDQUFvQyxDQUFDO0FBRXpCLFFBQUEsYUFBYSxHQUFHLE1BQTRCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MsIHsgQXhpb3NJbnN0YW5jZSB9IGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IEFQSUVycm9yLCBOb3RDb25uZWN0ZWRFcnJvciwgTm90TG9nZ2VkSW5FcnJvciB9IGZyb20gJy4vZXJyb3JzJztcblxuaW1wb3J0ICogYXMgY29uc3RhbnRzIGZyb20gJy4vY29uc3RhbnRzJztcblxuY29uc3QgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCd3aWRlcTpjb3JlOnJlcXVlc3QnKTtcblxuZXhwb3J0IGludGVyZmFjZSBMR0VETUF4aW9zSW5zdGFuY2UgZXh0ZW5kcyBBeGlvc0luc3RhbmNlIHtcbiAgbGdlZG1Qb3N0KHVybDogc3RyaW5nLCBkYXRhOiBhbnksIGFjY2Vzc1Rva2VuPzogc3RyaW5nLCBzZXNzaW9uSWQ/OiBzdHJpbmcpOiBQcm9taXNlPGFueT47XG59XG5cbmNvbnN0IGNsaWVudCA9IGF4aW9zLmNyZWF0ZSgpO1xuY2xpZW50LmRlZmF1bHRzLmhlYWRlcnNbJ3Bvc3QnXSA9IHtcbiAgJ3gtdGhpbnEtYXBwbGljYXRpb24ta2V5JzogY29uc3RhbnRzLkFQUF9LRVksXG4gICd4LXRoaW5xLXNlY3VyaXR5LWtleSc6IGNvbnN0YW50cy5TRUNVUklUWV9LRVksXG4gICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG59O1xuXG5jbGllbnQuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKChjb25maWcpID0+IHtcbiAgZGVidWcoJyAtPiAlcycsIGNvbmZpZy51cmwpO1xuXG4gIHJldHVybiBjb25maWc7XG59KTtcblxuY2xpZW50LmludGVyY2VwdG9ycy5yZXNwb25zZS51c2UoKHJlc3ApID0+IHtcbiAgZGVidWcoJyA8LSAlcycsIHJlc3AuY29uZmlnLnVybCk7XG5cbiAgcmV0dXJuIHJlc3A7XG59KTtcblxuKGNsaWVudCBhcyBhbnkpLmxnZWRtUG9zdCA9IChhc3luYyAodXJsLCBkYXRhLCBhY2Nlc3NUb2tlbiwgc2Vzc2lvbklkKSA9PiB7XG4gIGNvbnN0IGhlYWRlcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuID09PSAnc3RyaW5nJykge1xuICAgIGhlYWRlcnNbJ3gtdGhpbnEtdG9rZW4nXSA9IGFjY2Vzc1Rva2VuO1xuICB9XG4gIGlmICh0eXBlb2Ygc2Vzc2lvbklkID09PSAnc3RyaW5nJykge1xuICAgIGhlYWRlcnNbJ3gtdGhpbnEtanNlc3Npb25JZCddID0gc2Vzc2lvbklkO1xuICB9XG5cbiAgY29uc3QgcmVzcCA9IGF3YWl0IGNsaWVudC5wb3N0KHVybCwgeyBbY29uc3RhbnRzLkRBVEFfUk9PVF06IGRhdGEgfSwge1xuICAgIGhlYWRlcnMsXG4gIH0pO1xuICBjb25zdCBvdXQgPSByZXNwLmRhdGFbY29uc3RhbnRzLkRBVEFfUk9PVF07XG5cbiAgLy8gd2UgbXVzdCByZWxlYXNlIGNvbnRyb2wgb3RoZXJ3aXNlIGl0IGJyaWNrcyB0aGUgc3RvY2sgYXBwIGZvciBhIHdoaWxlXG4gIGlmICh1cmwuZW5kc1dpdGgoXCJydGlDb250cm9sXCIpKSB7XG4gICAgYXdhaXQgY2xpZW50LnBvc3QodXJsLnJlcGxhY2UoXCJydGlDb250cm9sXCIsIFwiZGVsQ29udHJvbFBlcm1pc3Npb25cIiksIHtcbiAgICAgIFtjb25zdGFudHMuREFUQV9ST09UXToge1xuICAgICAgICBkZXZpY2VJZDogZGF0YS5kZXZpY2VJZCAvLyB0aGlzIGV4aXN0cyBmb3IgY29udHJvbCBjb21tYW5kc1xuICAgICAgfVxuICAgIH0sIHsgaGVhZGVycyB9KTtcbiAgfVxuXG4gIGlmICgncmV0dXJuQ2QnIGluIG91dCkge1xuICAgIGNvbnN0IGNvZGUgPSBvdXQucmV0dXJuQ2QgYXMgc3RyaW5nO1xuXG4gICAgaWYgKGNvZGUgIT09ICcwMDAwJykge1xuICAgICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgIGNhc2UgJzAxMDInOlxuICAgICAgICAgIHRocm93IG5ldyBOb3RMb2dnZWRJbkVycm9yKCk7XG5cbiAgICAgICAgY2FzZSAnMDEwNic6XG4gICAgICAgICAgdGhyb3cgbmV3IE5vdENvbm5lY3RlZEVycm9yKCk7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gKG91dC5yZXR1cm5Nc2cgfHwgJycpIGFzIHN0cmluZztcbiAgICAgICAgICB0aHJvdyBuZXcgQVBJRXJyb3IoY29kZSwgbWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG59KSBhcyBMR0VETUF4aW9zSW5zdGFuY2VbJ2xnZWRtUG9zdCddO1xuXG5leHBvcnQgY29uc3QgcmVxdWVzdENsaWVudCA9IGNsaWVudCBhcyBMR0VETUF4aW9zSW5zdGFuY2U7XG4iXX0=