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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const crypto_1 = __importDefault(require("crypto"));
const luxon_1 = require("luxon");
const qs = __importStar(require("qs"));
const url_1 = require("url");
const constants = __importStar(require("./constants"));
const errors_1 = require("./errors");
const request_1 = require("./request");
const session_1 = require("./session");
class Auth {
    constructor(gateway, accessToken, refreshToken) {
        this.gateway = gateway;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    static fromUrl(gateway, url) {
        const urlObject = new url_1.URL(url);
        const params = qs.parse(urlObject.search.slice(1));
        assert.ok('access_token' in params);
        assert.ok('refresh_token' in params);
        const accessToken = params.access_token;
        const refreshToken = params.refresh_token;
        return new Auth(gateway, accessToken, refreshToken);
    }
    static login(apiRoot, accessToken, countryCode, langCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = url_1.resolve(apiRoot + '/', 'member/login');
            const data = {
                countryCode,
                langCode,
                loginType: 'EMP',
                token: accessToken,
            };
            return request_1.requestClient.lgedmPost(url, data);
        });
    }
    startSession() {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionInfo = yield Auth.login(this.gateway.apiRoot, this.accessToken, this.gateway.country, this.gateway.language);
            const sessionId = sessionInfo.jsessionId;
            return {
                session: new session_1.Session(this, sessionId),
                items: sessionInfo.items ? (Array.isArray(sessionInfo.items) ? sessionInfo.items : [sessionInfo.items]) : [],
            };
        });
    }
    static oauth2Signature(message, secret) {
        return crypto_1.default.createHmac('sha1', Buffer.from(secret)).update(message).digest('base64');
    }
    static refreshAuth(oauthRoot, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenUrl = url_1.resolve(oauthRoot + '/', 'oauth2/token');
            const data = {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            };
            const timestamp = luxon_1.DateTime.utc().toRFC2822();
            const requestUrl = '/oauth2/token' + qs.stringify(data, { addQueryPrefix: true });
            const signature = this.oauth2Signature(`${requestUrl}\n${timestamp}`, constants.OAUTH_SECRET_KEY);
            const headers = {
                'lgemp-x-app-key': constants.OAUTH_CLIENT_KEY,
                'lgemp-x-signature': signature,
                'lgemp-x-date': timestamp,
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            };
            const resp = yield request_1.requestClient.post(tokenUrl, qs.stringify(data), { headers }).then(resp => resp.data);
            if (resp.status !== 1) {
                throw new errors_1.TokenError();
            }
            return resp.access_token;
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            const newAccessToken = yield Auth.refreshAuth(this.gateway.oauthRoot, this.refreshToken);
            return new Auth(this.gateway, newAccessToken, this.refreshToken);
        });
    }
}
exports.Auth = Auth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb3JlL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBaUM7QUFDakMsb0RBQTRCO0FBQzVCLGlDQUFpQztBQUNqQyx1Q0FBeUI7QUFDekIsNkJBQWlEO0FBRWpELHVEQUF5QztBQUN6QyxxQ0FBc0M7QUFFdEMsdUNBQTBDO0FBQzFDLHVDQUFvQztBQUVwQyxNQUFhLElBQUk7SUFDZixZQUNTLE9BQWdCLEVBQ2hCLFdBQTBCLEVBQzFCLFlBQW9CO1FBRnBCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFDMUIsaUJBQVksR0FBWixZQUFZLENBQVE7SUFFN0IsQ0FBQztJQUVNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBZ0IsRUFBRSxHQUFXO1FBQ2pELE1BQU0sU0FBUyxHQUFHLElBQUksU0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRCxNQUFNLENBQUMsRUFBRSxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsSUFBSSxNQUFNLENBQUMsQ0FBQztRQUVyQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFFMUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxNQUFNLENBQU8sS0FBSyxDQUFDLE9BQWUsRUFBRSxXQUFtQixFQUFFLFdBQW1CLEVBQUUsUUFBZ0I7O1lBQ25HLE1B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QTtJQUVZLE9BQU87O1lBQ2xCLE1BQU0sY0FBYyxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFekYsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkUsQ0FBQztLQUFBO0NBQ0Y7QUF2RkQsb0JBdUZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcbmltcG9ydCAqIGFzIHFzIGZyb20gJ3FzJztcbmltcG9ydCB7IHJlc29sdmUgYXMgcmVzb2x2ZVVybCwgVVJMIH0gZnJvbSAndXJsJztcblxuaW1wb3J0ICogYXMgY29uc3RhbnRzIGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IFRva2VuRXJyb3IgfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQgeyBHYXRld2F5IH0gZnJvbSAnLi9nYXRld2F5JztcbmltcG9ydCB7IHJlcXVlc3RDbGllbnQgfSBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHsgU2Vzc2lvbiB9IGZyb20gJy4vc2Vzc2lvbic7XG5cbmV4cG9ydCBjbGFzcyBBdXRoIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBnYXRld2F5OiBHYXRld2F5LFxuICAgIHB1YmxpYyBhY2Nlc3NUb2tlbjogc3RyaW5nIHwgbnVsbCxcbiAgICBwdWJsaWMgcmVmcmVzaFRva2VuOiBzdHJpbmcsXG4gICkge1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBmcm9tVXJsKGdhdGV3YXk6IEdhdGV3YXksIHVybDogc3RyaW5nKSB7XG4gICAgY29uc3QgdXJsT2JqZWN0ID0gbmV3IFVSTCh1cmwpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHFzLnBhcnNlKHVybE9iamVjdC5zZWFyY2guc2xpY2UoMSkpO1xuXG4gICAgYXNzZXJ0Lm9rKCdhY2Nlc3NfdG9rZW4nIGluIHBhcmFtcyk7XG4gICAgYXNzZXJ0Lm9rKCdyZWZyZXNoX3Rva2VuJyBpbiBwYXJhbXMpO1xuXG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBwYXJhbXMuYWNjZXNzX3Rva2VuO1xuICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHBhcmFtcy5yZWZyZXNoX3Rva2VuO1xuXG4gICAgcmV0dXJuIG5ldyBBdXRoKGdhdGV3YXksIGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW4pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBsb2dpbihhcGlSb290OiBzdHJpbmcsIGFjY2Vzc1Rva2VuOiBzdHJpbmcsIGNvdW50cnlDb2RlOiBzdHJpbmcsIGxhbmdDb2RlOiBzdHJpbmcpIHtcbiAgICBjb25zdCB1cmwgPSByZXNvbHZlVXJsKGFwaVJvb3QgKyAnLycsICdtZW1iZXIvbG9naW4nKTtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgY291bnRyeUNvZGUsXG4gICAgICBsYW5nQ29kZSxcbiAgICAgIGxvZ2luVHlwZTogJ0VNUCcsXG4gICAgICB0b2tlbjogYWNjZXNzVG9rZW4sXG4gICAgfTtcblxuICAgIHJldHVybiByZXF1ZXN0Q2xpZW50LmxnZWRtUG9zdCh1cmwsIGRhdGEpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHN0YXJ0U2Vzc2lvbigpOiBQcm9taXNlPHsgc2Vzc2lvbjogU2Vzc2lvbiwgaXRlbXM6IGFueVtdIH0+IHtcbiAgICBjb25zdCBzZXNzaW9uSW5mbyA9IGF3YWl0IEF1dGgubG9naW4oXG4gICAgICB0aGlzLmdhdGV3YXkuYXBpUm9vdCxcbiAgICAgIHRoaXMuYWNjZXNzVG9rZW4hLFxuICAgICAgdGhpcy5nYXRld2F5LmNvdW50cnksXG4gICAgICB0aGlzLmdhdGV3YXkubGFuZ3VhZ2UsXG4gICAgKTtcbiAgICBjb25zdCBzZXNzaW9uSWQgPSBzZXNzaW9uSW5mby5qc2Vzc2lvbklkO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNlc3Npb246IG5ldyBTZXNzaW9uKHRoaXMsIHNlc3Npb25JZCksXG4gICAgICBpdGVtczogc2Vzc2lvbkluZm8uaXRlbXMgPyAoXG4gICAgICAgIEFycmF5LmlzQXJyYXkoc2Vzc2lvbkluZm8uaXRlbXMpID8gc2Vzc2lvbkluZm8uaXRlbXMgOiBbc2Vzc2lvbkluZm8uaXRlbXNdXG4gICAgICApIDogW10sXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgb2F1dGgyU2lnbmF0dXJlKG1lc3NhZ2U6IHN0cmluZywgc2VjcmV0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gY3J5cHRvLmNyZWF0ZUhtYWMoJ3NoYTEnLCBCdWZmZXIuZnJvbShzZWNyZXQpKS51cGRhdGUobWVzc2FnZSkuZGlnZXN0KCdiYXNlNjQnKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgcmVmcmVzaEF1dGgob2F1dGhSb290OiBzdHJpbmcsIHJlZnJlc2hUb2tlbjogc3RyaW5nKSB7XG4gICAgY29uc3QgdG9rZW5VcmwgPSByZXNvbHZlVXJsKG9hdXRoUm9vdCArICcvJywgJ29hdXRoMi90b2tlbicpO1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBncmFudF90eXBlOiAncmVmcmVzaF90b2tlbicsXG4gICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW4sXG4gICAgfTtcblxuICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGVUaW1lLnV0YygpLnRvUkZDMjgyMigpO1xuXG4gICAgY29uc3QgcmVxdWVzdFVybCA9ICcvb2F1dGgyL3Rva2VuJyArIHFzLnN0cmluZ2lmeShkYXRhLCB7IGFkZFF1ZXJ5UHJlZml4OiB0cnVlIH0pO1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IHRoaXMub2F1dGgyU2lnbmF0dXJlKGAke3JlcXVlc3RVcmx9XFxuJHt0aW1lc3RhbXB9YCwgY29uc3RhbnRzLk9BVVRIX1NFQ1JFVF9LRVkpO1xuXG4gICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgICdsZ2VtcC14LWFwcC1rZXknOiBjb25zdGFudHMuT0FVVEhfQ0xJRU5UX0tFWSxcbiAgICAgICdsZ2VtcC14LXNpZ25hdHVyZSc6IHNpZ25hdHVyZSxcbiAgICAgICdsZ2VtcC14LWRhdGUnOiB0aW1lc3RhbXAsXG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IHJlcXVlc3RDbGllbnQucG9zdCh0b2tlblVybCwgcXMuc3RyaW5naWZ5KGRhdGEpLCB7IGhlYWRlcnMgfSkudGhlbihyZXNwID0+IHJlc3AuZGF0YSk7XG4gICAgaWYgKHJlc3Auc3RhdHVzICE9PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgVG9rZW5FcnJvcigpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNwLmFjY2Vzc190b2tlbiBhcyBzdHJpbmc7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVmcmVzaCgpIHtcbiAgICBjb25zdCBuZXdBY2Nlc3NUb2tlbiA9IGF3YWl0IEF1dGgucmVmcmVzaEF1dGgodGhpcy5nYXRld2F5Lm9hdXRoUm9vdCwgdGhpcy5yZWZyZXNoVG9rZW4pO1xuXG4gICAgcmV0dXJuIG5ldyBBdXRoKHRoaXMuZ2F0ZXdheSwgbmV3QWNjZXNzVG9rZW4sIHRoaXMucmVmcmVzaFRva2VuKTtcbiAgfVxufVxuIl19