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
const qs = __importStar(require("qs"));
const url = __importStar(require("url"));
const constants_1 = require("./constants");
const constants = __importStar(require("./constants"));
const request_1 = require("./request");
class Gateway {
    constructor(authBase, apiRoot, oauthRoot, country, language) {
        this.authBase = authBase;
        this.apiRoot = apiRoot;
        this.oauthRoot = oauthRoot;
        this.country = country;
        this.language = language;
    }
    static getGatewayInfo(countryCode, langCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return request_1.requestClient.lgedmPost(constants_1.GATEWAY_URL, { countryCode, langCode });
        });
    }
    static discover(country, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const gatewayInfo = yield this.getGatewayInfo(country, language);
            return new Gateway(gatewayInfo.empUri, gatewayInfo.thinqUri, gatewayInfo.oauthUri, country, language);
        });
    }
    get oauthUrl() {
        return url.resolve(this.authBase, 'login/sign_in') + qs.stringify({
            country: this.country,
            language: this.language,
            svcCode: constants.SVC_CODE,
            authSvr: 'oauth2',
            client_id: constants.CLIENT_ID,
            division: 'ha',
            grant_type: 'password',
        }, { addQueryPrefix: true });
    }
}
exports.Gateway = Gateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2F0ZXdheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb3JlL2dhdGV3YXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBeUI7QUFDekIseUNBQTJCO0FBRTNCLDJDQUEwQztBQUMxQyx1REFBeUM7QUFDekMsdUNBQTBDO0FBRTFDLE1BQWEsT0FBTztJQUNsQixZQUNTLFFBQWdCLEVBQ2hCLE9BQWUsRUFDZixTQUFpQixFQUNqQixPQUFlLEVBQ2YsUUFBZ0I7UUFKaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUV6QixDQUFDO0lBRU0sTUFBTSxDQUFPLGNBQWMsQ0FBQyxXQUFtQixFQUFFLFFBQWdCOztZQUN0RSxPQUFPLHVCQUFhLENBQUMsU0FBUyxDQUFDLHVCQUFXLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN6RSxDQUFDO0tBQUE7SUFFTSxNQUFNLENBQU8sUUFBUSxDQUFDLE9BQWUsRUFBRSxRQUFnQjs7WUFDNUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVqRSxPQUFPLElBQUksT0FBTyxDQUNoQixXQUFXLENBQUMsTUFBTSxFQUNsQixXQUFXLENBQUMsUUFBUSxFQUNwQixXQUFXLENBQUMsUUFBUSxFQUNwQixPQUFPLEVBQ1AsUUFBUSxDQUNULENBQUM7UUFDSixDQUFDO0tBQUE7SUFFRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNoRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9BQU8sRUFBRSxTQUFTLENBQUMsUUFBUTtZQUMzQixPQUFPLEVBQUUsUUFBUTtZQUNqQixTQUFTLEVBQUUsU0FBUyxDQUFDLFNBQVM7WUFDOUIsUUFBUSxFQUFFLElBQUk7WUFDZCxVQUFVLEVBQUUsVUFBVTtTQUN2QixFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNGO0FBckNELDBCQXFDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHFzIGZyb20gJ3FzJztcbmltcG9ydCAqIGFzIHVybCBmcm9tICd1cmwnO1xuXG5pbXBvcnQgeyBHQVRFV0FZX1VSTCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCAqIGFzIGNvbnN0YW50cyBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyByZXF1ZXN0Q2xpZW50IH0gZnJvbSAnLi9yZXF1ZXN0JztcblxuZXhwb3J0IGNsYXNzIEdhdGV3YXkge1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGF1dGhCYXNlOiBzdHJpbmcsXG4gICAgcHVibGljIGFwaVJvb3Q6IHN0cmluZyxcbiAgICBwdWJsaWMgb2F1dGhSb290OiBzdHJpbmcsXG4gICAgcHVibGljIGNvdW50cnk6IHN0cmluZyxcbiAgICBwdWJsaWMgbGFuZ3VhZ2U6IHN0cmluZyxcbiAgKSB7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGdldEdhdGV3YXlJbmZvKGNvdW50cnlDb2RlOiBzdHJpbmcsIGxhbmdDb2RlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gcmVxdWVzdENsaWVudC5sZ2VkbVBvc3QoR0FURVdBWV9VUkwsIHsgY291bnRyeUNvZGUsIGxhbmdDb2RlIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBkaXNjb3Zlcihjb3VudHJ5OiBzdHJpbmcsIGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBnYXRld2F5SW5mbyA9IGF3YWl0IHRoaXMuZ2V0R2F0ZXdheUluZm8oY291bnRyeSwgbGFuZ3VhZ2UpO1xuXG4gICAgcmV0dXJuIG5ldyBHYXRld2F5KFxuICAgICAgZ2F0ZXdheUluZm8uZW1wVXJpLFxuICAgICAgZ2F0ZXdheUluZm8udGhpbnFVcmksXG4gICAgICBnYXRld2F5SW5mby5vYXV0aFVyaSxcbiAgICAgIGNvdW50cnksXG4gICAgICBsYW5ndWFnZSxcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdldCBvYXV0aFVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB1cmwucmVzb2x2ZSh0aGlzLmF1dGhCYXNlLCAnbG9naW4vc2lnbl9pbicpICsgcXMuc3RyaW5naWZ5KHtcbiAgICAgIGNvdW50cnk6IHRoaXMuY291bnRyeSxcbiAgICAgIGxhbmd1YWdlOiB0aGlzLmxhbmd1YWdlLFxuICAgICAgc3ZjQ29kZTogY29uc3RhbnRzLlNWQ19DT0RFLFxuICAgICAgYXV0aFN2cjogJ29hdXRoMicsXG4gICAgICBjbGllbnRfaWQ6IGNvbnN0YW50cy5DTElFTlRfSUQsXG4gICAgICBkaXZpc2lvbjogJ2hhJyxcbiAgICAgIGdyYW50X3R5cGU6ICdwYXNzd29yZCcsXG4gICAgfSwgeyBhZGRRdWVyeVByZWZpeDogdHJ1ZSB9KTtcbiAgfVxufVxuIl19