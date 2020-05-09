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
const auth_1 = require("./core/auth");
const constants = __importStar(require("./core/constants"));
const constants_1 = require("./core/constants");
const device_1 = require("./core/device");
const device_info_1 = require("./core/device-info");
const gateway_1 = require("./core/gateway");
const lang_pack_model_1 = require("./core/lang-pack-model");
const lang_pack_product_1 = require("./core/lang-pack-product");
const model_info_1 = require("./core/model-info");
const session_1 = require("./core/session");
const ac_1 = require("./devices/ac");
const dehumidifier_1 = require("./devices/dehumidifier");
const dishwasher_1 = require("./devices/dishwasher");
const dryer_1 = require("./devices/dryer");
const refrigerator_1 = require("./devices/refrigerator");
const washer_1 = require("./devices/washer");
class Client {
    constructor(gateway, auth, session, country = constants.DEFAULT_COUNTRY, language = constants.DEFAULT_LANGUAGE) {
        this.gateway = gateway;
        this.auth = auth;
        this.session = session;
        this.country = country;
        this.language = language;
        this.devices = [];
        this.modelInfo = {};
        this.langPackProduct = {};
        this.langPackModel = {};
    }
    static loadFromToken(refreshToken, country = constants.DEFAULT_COUNTRY, language = constants.DEFAULT_LANGUAGE) {
        return __awaiter(this, void 0, void 0, function* () {
            const gateway = yield gateway_1.Gateway.discover(country, language);
            const auth = new auth_1.Auth(gateway, null, refreshToken);
            const client = new Client(gateway, auth, null, country, language);
            yield client.refresh();
            return client;
        });
    }
    static loadFromState(state) {
        let gateway;
        let auth;
        let session;
        let modelInfo = {};
        let country = constants.DEFAULT_COUNTRY;
        let language = constants.DEFAULT_LANGUAGE;
        let langPackProduct = {};
        let langPackModel = {};
        for (const key of Object.keys(state)) {
            switch (key) {
                case 'gateway':
                    {
                        const data = state.gateway;
                        gateway = new gateway_1.Gateway(data.authBase, data.apiRoot, data.oauthRoot, data.country || constants.DEFAULT_COUNTRY, data.language || constants.DEFAULT_LANGUAGE);
                    }
                    break;
                case 'auth':
                    {
                        const data = state.auth;
                        auth = new auth_1.Auth(gateway, data.accessToken, data.refreshToken);
                    }
                    break;
                case 'session':
                    session = new session_1.Session(auth, state.session);
                    break;
                case 'modelInfo':
                    modelInfo = state.modelInfo;
                    break;
                case 'country':
                    country = state.country;
                    break;
                case 'language':
                    language = state.language;
                    break;
                case 'langPackProduct':
                    langPackProduct = state.langPackProduct;
                    break;
                case 'langPackModel':
                    langPackModel = state.langPackModel;
                    break;
            }
        }
        const client = new Client(gateway, auth, session, country, language);
        client.modelInfo = modelInfo;
        client.langPackProduct = langPackProduct;
        client.langPackModel = langPackModel;
        return client;
    }
    toStateObject() {
        return {
            modelInfo: this.modelInfo,
            gateway: !this.gateway
                ? undefined
                : {
                    authBase: this.gateway.authBase,
                    apiRoot: this.gateway.apiRoot,
                    oauthRoot: this.gateway.oauthRoot,
                    country: this.gateway.country,
                    language: this.gateway.language,
                },
            auth: !this.auth
                ? undefined
                : {
                    accessToken: this.auth.accessToken,
                    refreshToken: this.auth.refreshToken,
                },
            session: !this.session
                ? undefined
                : this.session.sessionId,
            country: this.country,
            language: this.language,
            langPackProduct: this.langPackProduct,
            langPackModel: this.langPackModel,
        };
    }
    updateDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            const devices = yield this.session.getDevices();
            const deviceInfos = devices.map(device => new device_info_1.DeviceInfo(device));
            this.devices = deviceInfos;
        });
    }
    getDeviceInfo(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(this.devices) || this.devices.length === 0) {
                yield this.updateDevices();
            }
            return this.devices.find(({ id }) => id === deviceId);
        });
    }
    getDevice(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deviceInfo = yield this.getDeviceInfo(deviceId);
            if (!deviceInfo) {
                throw new Error(`Device not found: ${deviceInfo}`);
            }
            yield this.getModelInfo(deviceInfo);
            yield this.getLangPackProduct(deviceInfo);
            yield this.getLangPackModel(deviceInfo);
            switch (deviceInfo.data.deviceType) {
                case constants_1.DeviceType.AC:
                    return new ac_1.ACDevice(this, deviceInfo);
                case constants_1.DeviceType.DEHUMIDIFIER:
                    return new dehumidifier_1.DehumidifierDevice(this, deviceInfo);
                case constants_1.DeviceType.DISHWASHER:
                    return new dishwasher_1.DishwasherDevice(this, deviceInfo);
                case constants_1.DeviceType.DRYER:
                    return new dryer_1.DryerDevice(this, deviceInfo);
                case constants_1.DeviceType.WASHER:
                    return new washer_1.WasherDevice(this, deviceInfo);
                case constants_1.DeviceType.REFRIGERATOR:
                    return new refrigerator_1.RefrigeratorDevice(this, deviceInfo);
                default:
                    // throw new Error(`Not supported productType: ${modelInfo.data.Info.productType}`);
                    return new device_1.Device(this, deviceInfo);
            }
        });
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.auth = yield this.auth.refresh();
            ({
                session: this.session,
                items: this.devices,
            } = yield this.auth.startSession());
        });
    }
    getModelInfo(device) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = device.modelInfoUrl;
            if (!(url in this.modelInfo)) {
                this.modelInfo[url] = yield device.loadModelInfo();
            }
            return new model_info_1.ModelInfo(this.modelInfo[url]);
        });
    }
    getLangPackProduct(device) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = device.langPackProductUrl;
            if (!(url in this.langPackProduct)) {
                this.langPackProduct[url] = yield device.loadLangPackProduct();
            }
            return new lang_pack_product_1.LangPackProduct(this.langPackProduct[url]);
        });
    }
    getLangPackModel(device) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = device.langPackModelUrl;
            if (!(url in this.langPackModel)) {
                this.langPackModel[url] = yield device.loadLangPackModel();
            }
            return new lang_pack_model_1.LangPackModel(this.langPackModel[url]);
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFtQztBQUNuQyw0REFBOEM7QUFDOUMsZ0RBQThDO0FBQzlDLDBDQUF1QztBQUN2QyxvREFBZ0Q7QUFDaEQsNENBQXlDO0FBQ3pDLDREQUF1RDtBQUN2RCxnRUFBMkQ7QUFDM0Qsa0RBQThDO0FBQzlDLDRDQUF5QztBQUN6QyxxQ0FBd0M7QUFDeEMseURBQTREO0FBQzVELHFEQUF3RDtBQUN4RCwyQ0FBOEM7QUFDOUMseURBQTREO0FBQzVELDZDQUFnRDtBQUVoRCxNQUFhLE1BQU07SUFNakIsWUFDUyxPQUFnQixFQUNoQixJQUFVLEVBQ1YsT0FBdUIsRUFDdkIsVUFBVSxTQUFTLENBQUMsZUFBZSxFQUNuQyxXQUFXLFNBQVMsQ0FBQyxnQkFBZ0I7UUFKckMsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsWUFBTyxHQUFQLE9BQU8sQ0FBNEI7UUFDbkMsYUFBUSxHQUFSLFFBQVEsQ0FBNkI7UUFWdkMsWUFBTyxHQUFpQixFQUFFLENBQUM7UUFDM0IsY0FBUyxHQUEyQixFQUFFLENBQUM7UUFDdkMsb0JBQWUsR0FBMkIsRUFBRSxDQUFDO1FBQzdDLGtCQUFhLEdBQTJCLEVBQUUsQ0FBQztJQVNsRCxDQUFDO0lBRU0sTUFBTSxDQUFPLGFBQWEsQ0FBQyxZQUFvQixFQUFFLFVBQWtCLFNBQVMsQ0FBQyxlQUFlLEVBQUUsV0FBbUIsU0FBUyxDQUFDLGdCQUFnQjs7WUFDaEosTUFBTSxPQUFPLEdBQUcsTUFBTSxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDMUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsT0FBTyxFQUFFLElBQUksRUFB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RSxDQUFDO2FBQ2hFO1lBRUQsT0FBTyxJQUFJLG1DQUFlLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hELENBQUM7S0FBQTtJQUVZLGdCQUFnQixDQUFDLE1BQWtCOztZQUM5QyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7WUFDcEMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVEO1lBRUQsT0FBTyxJQUFJLCtCQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3BELENBQUM7S0FBQTtDQUNGO0FBbk5ELHdCQW1OQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dGggfSBmcm9tICcuL2NvcmUvYXV0aCc7XG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi9jb3JlL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBEZXZpY2VUeXBlIH0gZnJvbSAnLi9jb3JlL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBEZXZpY2UgfSBmcm9tICcuL2NvcmUvZGV2aWNlJztcbmltcG9ydCB7IERldmljZUluZm8gfSBmcm9tICcuL2NvcmUvZGV2aWNlLWluZm8nO1xuaW1wb3J0IHsgR2F0ZXdheSB9IGZyb20gJy4vY29yZS9nYXRld2F5JztcbmltcG9ydCB7IExhbmdQYWNrTW9kZWwgfSBmcm9tICcuL2NvcmUvbGFuZy1wYWNrLW1vZGVsJztcbmltcG9ydCB7IExhbmdQYWNrUHJvZHVjdCB9IGZyb20gJy4vY29yZS9sYW5nLXBhY2stcHJvZHVjdCc7XG5pbXBvcnQgeyBNb2RlbEluZm8gfSBmcm9tICcuL2NvcmUvbW9kZWwtaW5mbyc7XG5pbXBvcnQgeyBTZXNzaW9uIH0gZnJvbSAnLi9jb3JlL3Nlc3Npb24nO1xuaW1wb3J0IHsgQUNEZXZpY2UgfSBmcm9tICcuL2RldmljZXMvYWMnO1xuaW1wb3J0IHsgRGVodW1pZGlmaWVyRGV2aWNlIH0gZnJvbSAnLi9kZXZpY2VzL2RlaHVtaWRpZmllcic7XG5pbXBvcnQgeyBEaXNod2FzaGVyRGV2aWNlIH0gZnJvbSAnLi9kZXZpY2VzL2Rpc2h3YXNoZXInO1xuaW1wb3J0IHsgRHJ5ZXJEZXZpY2UgfSBmcm9tICcuL2RldmljZXMvZHJ5ZXInO1xuaW1wb3J0IHsgUmVmcmlnZXJhdG9yRGV2aWNlIH0gZnJvbSAnLi9kZXZpY2VzL3JlZnJpZ2VyYXRvcic7XG5pbXBvcnQgeyBXYXNoZXJEZXZpY2UgfSBmcm9tICcuL2RldmljZXMvd2FzaGVyJztcblxuZXhwb3J0IGNsYXNzIENsaWVudCB7XG4gIHB1YmxpYyBkZXZpY2VzOiBEZXZpY2VJbmZvW10gPSBbXTtcbiAgcHVibGljIG1vZGVsSW5mbzogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuICBwdWJsaWMgbGFuZ1BhY2tQcm9kdWN0OiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG4gIHB1YmxpYyBsYW5nUGFja01vZGVsOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBnYXRld2F5OiBHYXRld2F5LFxuICAgIHB1YmxpYyBhdXRoOiBBdXRoLFxuICAgIHB1YmxpYyBzZXNzaW9uOiBTZXNzaW9uIHwgbnVsbCxcbiAgICBwdWJsaWMgY291bnRyeSA9IGNvbnN0YW50cy5ERUZBVUxUX0NPVU5UUlksXG4gICAgcHVibGljIGxhbmd1YWdlID0gY29uc3RhbnRzLkRFRkFVTFRfTEFOR1VBR0UsXG4gICkge1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBsb2FkRnJvbVRva2VuKHJlZnJlc2hUb2tlbjogc3RyaW5nLCBjb3VudHJ5OiBzdHJpbmcgPSBjb25zdGFudHMuREVGQVVMVF9DT1VOVFJZLCBsYW5ndWFnZTogc3RyaW5nID0gY29uc3RhbnRzLkRFRkFVTFRfTEFOR1VBR0UpIHtcbiAgICBjb25zdCBnYXRld2F5ID0gYXdhaXQgR2F0ZXdheS5kaXNjb3Zlcihjb3VudHJ5LCBsYW5ndWFnZSk7XG4gICAgY29uc3QgYXV0aCA9IG5ldyBBdXRoKGdhdGV3YXksIG51bGwsIHJlZnJlc2hUb2tlbik7XG5cbiAgICBjb25zdCBjbGllbnQgPSBuZXcgQ2xpZW50KGdhdGV3YXksIGF1dGgsIG51bGwsIGNvdW50cnksIGxhbmd1YWdlKTtcbiAgICBhd2FpdCBjbGllbnQucmVmcmVzaCgpO1xuXG4gICAgcmV0dXJuIGNsaWVudDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgbG9hZEZyb21TdGF0ZShzdGF0ZToge1xuICAgIFtrZXkgaW4gJ2dhdGV3YXknIHwgJ2F1dGgnIHwgJ3Nlc3Npb24nIHwgJ21vZGVsSW5mbycgfCAnY291bnRyeScgfCAnbGFuZ3VhZ2UnIHwgJ2xhbmdQYWNrUHJvZHVjdCcgfCAnbGFuZ1BhY2tNb2RlbCddOiBhbnk7XG4gIH0pIHtcbiAgICBsZXQgZ2F0ZXdheTogR2F0ZXdheTtcbiAgICBsZXQgYXV0aDogQXV0aDtcbiAgICBsZXQgc2Vzc2lvbjogU2Vzc2lvbjtcbiAgICBsZXQgbW9kZWxJbmZvOiBDbGllbnRbJ21vZGVsSW5mbyddID0ge307XG4gICAgbGV0IGNvdW50cnk6IHN0cmluZyA9IGNvbnN0YW50cy5ERUZBVUxUX0NPVU5UUlk7XG4gICAgbGV0IGxhbmd1YWdlOiBzdHJpbmcgPSBjb25zdGFudHMuREVGQVVMVF9MQU5HVUFHRTtcbiAgICBsZXQgbGFuZ1BhY2tQcm9kdWN0OiBDbGllbnRbJ2xhbmdQYWNrUHJvZHVjdCddID0ge307XG4gICAgbGV0IGxhbmdQYWNrTW9kZWw6IENsaWVudFsnbGFuZ1BhY2tNb2RlbCddID0ge307XG5cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzdGF0ZSkpIHtcbiAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgIGNhc2UgJ2dhdGV3YXknOiB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHN0YXRlLmdhdGV3YXk7XG4gICAgICAgICAgZ2F0ZXdheSA9IG5ldyBHYXRld2F5KFxuICAgICAgICAgICAgZGF0YS5hdXRoQmFzZSxcbiAgICAgICAgICAgIGRhdGEuYXBpUm9vdCxcbiAgICAgICAgICAgIGRhdGEub2F1dGhSb290LFxuICAgICAgICAgICAgZGF0YS5jb3VudHJ5IHx8IGNvbnN0YW50cy5ERUZBVUxUX0NPVU5UUlksXG4gICAgICAgICAgICBkYXRhLmxhbmd1YWdlIHx8IGNvbnN0YW50cy5ERUZBVUxUX0xBTkdVQUdFLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnYXV0aCc6IHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gc3RhdGUuYXV0aDtcbiAgICAgICAgICBhdXRoID0gbmV3IEF1dGgoXG4gICAgICAgICAgICBnYXRld2F5ISxcbiAgICAgICAgICAgIGRhdGEuYWNjZXNzVG9rZW4sXG4gICAgICAgICAgICBkYXRhLnJlZnJlc2hUb2tlbixcbiAgICAgICAgICApO1xuICAgICAgICB9IGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ3Nlc3Npb24nOlxuICAgICAgICAgIHNlc3Npb24gPSBuZXcgU2Vzc2lvbihhdXRoISwgc3RhdGUuc2Vzc2lvbik7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbW9kZWxJbmZvJzpcbiAgICAgICAgICBtb2RlbEluZm8gPSBzdGF0ZS5tb2RlbEluZm87XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnY291bnRyeSc6XG4gICAgICAgICAgY291bnRyeSA9IHN0YXRlLmNvdW50cnk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbGFuZ3VhZ2UnOlxuICAgICAgICAgIGxhbmd1YWdlID0gc3RhdGUubGFuZ3VhZ2U7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbGFuZ1BhY2tQcm9kdWN0JzpcbiAgICAgICAgICBsYW5nUGFja1Byb2R1Y3QgPSBzdGF0ZS5sYW5nUGFja1Byb2R1Y3Q7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnbGFuZ1BhY2tNb2RlbCc6XG4gICAgICAgICAgbGFuZ1BhY2tNb2RlbCA9IHN0YXRlLmxhbmdQYWNrTW9kZWw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2xpZW50ID0gbmV3IENsaWVudChcbiAgICAgIGdhdGV3YXkhLFxuICAgICAgYXV0aCEsXG4gICAgICBzZXNzaW9uISxcbiAgICAgIGNvdW50cnksXG4gICAgICBsYW5ndWFnZSxcbiAgICApO1xuICAgIGNsaWVudC5tb2RlbEluZm8gPSBtb2RlbEluZm87XG4gICAgY2xpZW50LmxhbmdQYWNrUHJvZHVjdCA9IGxhbmdQYWNrUHJvZHVjdDtcbiAgICBjbGllbnQubGFuZ1BhY2tNb2RlbCA9IGxhbmdQYWNrTW9kZWw7XG5cbiAgICByZXR1cm4gY2xpZW50O1xuICB9XG5cbiAgcHVibGljIHRvU3RhdGVPYmplY3QoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vZGVsSW5mbzogdGhpcy5tb2RlbEluZm8sXG5cbiAgICAgIGdhdGV3YXk6ICF0aGlzLmdhdGV3YXlcbiAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgOiB7XG4gICAgICAgICAgYXV0aEJhc2U6IHRoaXMuZ2F0ZXdheS5hdXRoQmFzZSxcbiAgICAgICAgICBhcGlSb290OiB0aGlzLmdhdGV3YXkuYXBpUm9vdCxcbiAgICAgICAgICBvYXV0aFJvb3Q6IHRoaXMuZ2F0ZXdheS5vYXV0aFJvb3QsXG4gICAgICAgICAgY291bnRyeTogdGhpcy5nYXRld2F5LmNvdW50cnksXG4gICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMuZ2F0ZXdheS5sYW5ndWFnZSxcbiAgICAgICAgfSxcblxuICAgICAgYXV0aDogIXRoaXMuYXV0aFxuICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICA6IHtcbiAgICAgICAgICBhY2Nlc3NUb2tlbjogdGhpcy5hdXRoLmFjY2Vzc1Rva2VuLFxuICAgICAgICAgIHJlZnJlc2hUb2tlbjogdGhpcy5hdXRoLnJlZnJlc2hUb2tlbixcbiAgICAgICAgfSxcblxuICAgICAgc2Vzc2lvbjogIXRoaXMuc2Vzc2lvblxuICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICA6IHRoaXMuc2Vzc2lvbi5zZXNzaW9uSWQsXG5cbiAgICAgIGNvdW50cnk6IHRoaXMuY291bnRyeSxcbiAgICAgIGxhbmd1YWdlOiB0aGlzLmxhbmd1YWdlLFxuXG4gICAgICBsYW5nUGFja1Byb2R1Y3Q6IHRoaXMubGFuZ1BhY2tQcm9kdWN0LFxuICAgICAgbGFuZ1BhY2tNb2RlbDogdGhpcy5sYW5nUGFja01vZGVsLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgdXBkYXRlRGV2aWNlcygpIHtcbiAgICBjb25zdCBkZXZpY2VzOiBhbnlbXSA9IGF3YWl0IHRoaXMuc2Vzc2lvbiEuZ2V0RGV2aWNlcygpO1xuICAgIGNvbnN0IGRldmljZUluZm9zID0gZGV2aWNlcy5tYXAoZGV2aWNlID0+IG5ldyBEZXZpY2VJbmZvKGRldmljZSkpO1xuXG4gICAgdGhpcy5kZXZpY2VzID0gZGV2aWNlSW5mb3M7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0RGV2aWNlSW5mbyhkZXZpY2VJZDogc3RyaW5nKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMuZGV2aWNlcykgfHwgdGhpcy5kZXZpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgYXdhaXQgdGhpcy51cGRhdGVEZXZpY2VzKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZGV2aWNlcy5maW5kKCh7IGlkIH0pID0+IGlkID09PSBkZXZpY2VJZCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0RGV2aWNlKGRldmljZUlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBkZXZpY2VJbmZvID0gYXdhaXQgdGhpcy5nZXREZXZpY2VJbmZvKGRldmljZUlkKTtcbiAgICBpZiAoIWRldmljZUluZm8pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRGV2aWNlIG5vdCBmb3VuZDogJHtkZXZpY2VJbmZvfWApO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMuZ2V0TW9kZWxJbmZvKGRldmljZUluZm8pO1xuICAgIGF3YWl0IHRoaXMuZ2V0TGFuZ1BhY2tQcm9kdWN0KGRldmljZUluZm8pO1xuICAgIGF3YWl0IHRoaXMuZ2V0TGFuZ1BhY2tNb2RlbChkZXZpY2VJbmZvKTtcblxuICAgIHN3aXRjaCAoZGV2aWNlSW5mby5kYXRhLmRldmljZVR5cGUpIHtcbiAgICAgIGNhc2UgRGV2aWNlVHlwZS5BQzpcbiAgICAgICAgcmV0dXJuIG5ldyBBQ0RldmljZSh0aGlzLCBkZXZpY2VJbmZvKTtcbiAgICAgIGNhc2UgRGV2aWNlVHlwZS5ERUhVTUlESUZJRVI6XG4gICAgICAgIHJldHVybiBuZXcgRGVodW1pZGlmaWVyRGV2aWNlKHRoaXMsIGRldmljZUluZm8pO1xuICAgICAgY2FzZSBEZXZpY2VUeXBlLkRJU0hXQVNIRVI6XG4gICAgICAgIHJldHVybiBuZXcgRGlzaHdhc2hlckRldmljZSh0aGlzLCBkZXZpY2VJbmZvKTtcbiAgICAgIGNhc2UgRGV2aWNlVHlwZS5EUllFUjpcbiAgICAgICAgcmV0dXJuIG5ldyBEcnllckRldmljZSh0aGlzLCBkZXZpY2VJbmZvKTtcbiAgICAgIGNhc2UgRGV2aWNlVHlwZS5XQVNIRVI6XG4gICAgICAgIHJldHVybiBuZXcgV2FzaGVyRGV2aWNlKHRoaXMsIGRldmljZUluZm8pO1xuICAgICAgY2FzZSBEZXZpY2VUeXBlLlJFRlJJR0VSQVRPUjpcbiAgICAgICAgcmV0dXJuIG5ldyBSZWZyaWdlcmF0b3JEZXZpY2UodGhpcywgZGV2aWNlSW5mbyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoYE5vdCBzdXBwb3J0ZWQgcHJvZHVjdFR5cGU6ICR7bW9kZWxJbmZvLmRhdGEuSW5mby5wcm9kdWN0VHlwZX1gKTtcbiAgICAgICAgcmV0dXJuIG5ldyBEZXZpY2UodGhpcywgZGV2aWNlSW5mbyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlZnJlc2goKSB7XG4gICAgdGhpcy5hdXRoID0gYXdhaXQgdGhpcy5hdXRoLnJlZnJlc2goKTtcblxuICAgICh7XG4gICAgICBzZXNzaW9uOiB0aGlzLnNlc3Npb24sXG4gICAgICBpdGVtczogdGhpcy5kZXZpY2VzLFxuICAgIH0gPSBhd2FpdCB0aGlzLmF1dGguc3RhcnRTZXNzaW9uKCkpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldE1vZGVsSW5mbyhkZXZpY2U6IERldmljZUluZm8pIHtcbiAgICBjb25zdCB1cmwgPSBkZXZpY2UubW9kZWxJbmZvVXJsO1xuICAgIGlmICghKHVybCBpbiB0aGlzLm1vZGVsSW5mbykpIHtcbiAgICAgIHRoaXMubW9kZWxJbmZvW3VybF0gPSBhd2FpdCBkZXZpY2UubG9hZE1vZGVsSW5mbygpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgTW9kZWxJbmZvKHRoaXMubW9kZWxJbmZvW3VybF0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldExhbmdQYWNrUHJvZHVjdChkZXZpY2U6IERldmljZUluZm8pIHtcbiAgICBjb25zdCB1cmwgPSBkZXZpY2UubGFuZ1BhY2tQcm9kdWN0VXJsO1xuICAgIGlmICghKHVybCBpbiB0aGlzLmxhbmdQYWNrUHJvZHVjdCkpIHtcbiAgICAgIHRoaXMubGFuZ1BhY2tQcm9kdWN0W3VybF0gPSBhd2FpdCBkZXZpY2UubG9hZExhbmdQYWNrUHJvZHVjdCgpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgTGFuZ1BhY2tQcm9kdWN0KHRoaXMubGFuZ1BhY2tQcm9kdWN0W3VybF0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldExhbmdQYWNrTW9kZWwoZGV2aWNlOiBEZXZpY2VJbmZvKSB7XG4gICAgY29uc3QgdXJsID0gZGV2aWNlLmxhbmdQYWNrTW9kZWxVcmw7XG4gICAgaWYgKCEodXJsIGluIHRoaXMubGFuZ1BhY2tNb2RlbCkpIHtcbiAgICAgIHRoaXMubGFuZ1BhY2tNb2RlbFt1cmxdID0gYXdhaXQgZGV2aWNlLmxvYWRMYW5nUGFja01vZGVsKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBMYW5nUGFja01vZGVsKHRoaXMubGFuZ1BhY2tNb2RlbFt1cmxdKTtcbiAgfVxufVxuIl19