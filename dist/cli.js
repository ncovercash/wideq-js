#!/usr/bin/env node
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
const commander_1 = __importDefault(require("commander"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const readline = __importStar(require("readline"));
const client_1 = require("./client");
const auth_1 = require("./core/auth");
const constants = __importStar(require("./core/constants"));
const errors_1 = require("./core/errors");
const gateway_1 = require("./core/gateway");
const version = fs.existsSync(path.join(__dirname, '../package.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')).toString()).version : '';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const input = (question) => new Promise((resolve) => {
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.question(question, (answer) => resolve(answer));
});
const options = {
    country: constants.DEFAULT_COUNTRY,
    language: constants.DEFAULT_LANGUAGE,
    refreshToken: '',
    statePath: 'wideq-state.json',
};
const program = new commander_1.default.Command('WideQJS');
program
    .version(version)
    .option('-c, --country <type>', 'Country code for account', constants.DEFAULT_COUNTRY)
    .on('option:country', (value) => options.country = value)
    .option('-l, --language <type>', 'Language code for account', constants.DEFAULT_LANGUAGE)
    .on('option:language', (value) => options.language = value)
    .option('-t, --token <type>', 'Refresh token')
    .on('option:token', (value) => options.refreshToken = value)
    .option('-s, --state-path <type>', 'State file path', 'wideq-state.json')
    .on('option:statePath', (value) => options.statePath = value);
program
    .command('auth')
    .description('Authenticate')
    .action(() => __awaiter(this, void 0, void 0, function* () {
    const { country, language, refreshToken, statePath } = options;
    const client = yield init(country, language, refreshToken, statePath);
    console.info('Refresh token: ' + client.auth.refreshToken);
    saveState(statePath, client);
    process.exit(0);
}));
program
    .command('ls', { isDefault: true })
    .description('List devices')
    .action(() => __awaiter(this, void 0, void 0, function* () {
    const { country, language, refreshToken, statePath } = options;
    const client = yield init(country, language, refreshToken, statePath);
    for (const device of client.devices) {
        console.info(String(device));
    }
    saveState(statePath, client);
    process.exit(0);
}));
program
    .command('monitor <deviceId>')
    .description('Monitor any device, displaying generic information about its status.')
    .action((deviceId) => __awaiter(this, void 0, void 0, function* () {
    const { country, language, refreshToken, statePath } = options;
    const client = yield init(country, language, refreshToken, statePath);
    const dev = yield client.getDevice(deviceId);
    saveState(statePath, client);
    yield dev.load();
    yield dev.startMonitor();
    try {
        for (;;) {
            yield delay(1000);
            console.info('polling...');
            try {
                const status = yield dev.poll();
                if (!status) {
                    console.info('no status');
                    continue;
                }
                const keys = Reflect.ownKeys(status.constructor.prototype);
                for (const key of keys) {
                    if (typeof key === 'string' && !['constructor'].includes(key)) {
                        console.info(`- ${key}: ${String(Reflect.get(status, key))}`);
                    }
                }
            }
            catch (e) {
                if (e instanceof errors_1.NotLoggedInError) {
                    yield dev.stopMonitor();
                    yield client.refresh();
                    console.info(client.devices);
                }
                console.error(e);
            }
        }
    }
    catch (e) {
        console.error(e);
    }
    finally {
        yield dev.stopMonitor();
    }
}));
function authenticate(gateway) {
    return __awaiter(this, void 0, void 0, function* () {
        const loginUrl = gateway.oauthUrl;
        console.info('Log in here:', loginUrl);
        const callbackUrl = yield input('Then paste the URL where the browser is redirected: ');
        return auth_1.Auth.fromUrl(gateway, callbackUrl);
    });
}
function init(country, language, refreshToken, stateFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let state = {};
        if (stateFilePath) {
            if (fs.existsSync(stateFilePath)) {
                try {
                    state = JSON.parse(fs.readFileSync(stateFilePath).toString());
                }
                catch (_a) { }
            }
        }
        const client = refreshToken ?
            yield client_1.Client.loadFromToken(refreshToken, country, language) :
            client_1.Client.loadFromState(Object.assign({ country,
                language }, state));
        if (!client.gateway) {
            client.gateway = yield gateway_1.Gateway.discover(country, language);
        }
        if (!client.auth) {
            client.auth = yield authenticate(client.gateway);
        }
        if (!client.session && client.auth) {
            ({
                session: client.session,
                items: client.devices,
            } = yield client.auth.startSession());
        }
        try {
            yield client.updateDevices();
        }
        catch (e) {
            if (e instanceof errors_1.NotLoggedInError) {
                yield client.refresh();
                yield client.updateDevices();
            }
            else {
                throw e;
            }
        }
        return client;
    });
}
function saveState(stateFilePath, client) {
    fs.writeFileSync(stateFilePath, JSON.stringify(client.toStateObject()));
}
program.parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSwwREFBa0M7QUFDbEMsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUM3QixtREFBcUM7QUFFckMscUNBQWtDO0FBQ2xDLHNDQUFtQztBQUNuQyw0REFBOEM7QUFDOUMsMENBQWlEO0FBQ2pELDRDQUF5QztBQUV6QyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3RLLE1BQU0sS0FBSyxHQUFHLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRWhGLE1BQU0sS0FBSyxHQUFHLENBQUMsUUFBZ0IsRUFBRSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtJQUNsRSxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25FLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNyRCxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sT0FBTyxH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QUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCBjb21tYW5kZXIgZnJvbSAnY29tbWFuZGVyJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyByZWFkbGluZSBmcm9tICdyZWFkbGluZSc7XG5cbmltcG9ydCB7IENsaWVudCB9IGZyb20gJy4vY2xpZW50JztcbmltcG9ydCB7IEF1dGggfSBmcm9tICcuL2NvcmUvYXV0aCc7XG5pbXBvcnQgKiBhcyBjb25zdGFudHMgZnJvbSAnLi9jb3JlL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBOb3RMb2dnZWRJbkVycm9yIH0gZnJvbSAnLi9jb3JlL2Vycm9ycyc7XG5pbXBvcnQgeyBHYXRld2F5IH0gZnJvbSAnLi9jb3JlL2dhdGV3YXknO1xuXG5jb25zdCB2ZXJzaW9uID0gZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vcGFja2FnZS5qc29uJykpID8gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3BhY2thZ2UuanNvbicpKS50b1N0cmluZygpKS52ZXJzaW9uIDogJyc7XG5jb25zdCBkZWxheSA9IChtczogbnVtYmVyKSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuXG5jb25zdCBpbnB1dCA9IChxdWVzdGlvbjogc3RyaW5nKSA9PiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlKSA9PiB7XG4gIGNvbnN0IHJsID0gcmVhZGxpbmUuY3JlYXRlSW50ZXJmYWNlKHByb2Nlc3Muc3RkaW4sIHByb2Nlc3Muc3Rkb3V0KTtcbiAgcmwucXVlc3Rpb24ocXVlc3Rpb24sIChhbnN3ZXIpID0+IHJlc29sdmUoYW5zd2VyKSk7XG59KTtcblxuY29uc3Qgb3B0aW9ucyA9IHtcbiAgY291bnRyeTogY29uc3RhbnRzLkRFRkFVTFRfQ09VTlRSWSxcbiAgbGFuZ3VhZ2U6IGNvbnN0YW50cy5ERUZBVUxUX0xBTkdVQUdFLFxuICByZWZyZXNoVG9rZW46ICcnLFxuICBzdGF0ZVBhdGg6ICd3aWRlcS1zdGF0ZS5qc29uJyxcbn07XG5cbmNvbnN0IHByb2dyYW0gPSBuZXcgY29tbWFuZGVyLkNvbW1hbmQoJ1dpZGVRSlMnKTtcbnByb2dyYW1cbiAgLnZlcnNpb24odmVyc2lvbilcbiAgLm9wdGlvbignLWMsIC0tY291bnRyeSA8dHlwZT4nLCAnQ291bnRyeSBjb2RlIGZvciBhY2NvdW50JywgY29uc3RhbnRzLkRFRkFVTFRfQ09VTlRSWSlcbiAgLm9uKCdvcHRpb246Y291bnRyeScsICh2YWx1ZSkgPT4gb3B0aW9ucy5jb3VudHJ5ID0gdmFsdWUpXG4gIC5vcHRpb24oJy1sLCAtLWxhbmd1YWdlIDx0eXBlPicsICdMYW5ndWFnZSBjb2RlIGZvciBhY2NvdW50JywgY29uc3RhbnRzLkRFRkFVTFRfTEFOR1VBR0UpXG4gIC5vbignb3B0aW9uOmxhbmd1YWdlJywgKHZhbHVlKSA9PiBvcHRpb25zLmxhbmd1YWdlID0gdmFsdWUpXG4gIC5vcHRpb24oJy10LCAtLXRva2VuIDx0eXBlPicsICdSZWZyZXNoIHRva2VuJylcbiAgLm9uKCdvcHRpb246dG9rZW4nLCAodmFsdWUpID0+IG9wdGlvbnMucmVmcmVzaFRva2VuID0gdmFsdWUpXG4gIC5vcHRpb24oJy1zLCAtLXN0YXRlLXBhdGggPHR5cGU+JywgJ1N0YXRlIGZpbGUgcGF0aCcsICd3aWRlcS1zdGF0ZS5qc29uJylcbiAgLm9uKCdvcHRpb246c3RhdGVQYXRoJywgKHZhbHVlKSA9PiBvcHRpb25zLnN0YXRlUGF0aCA9IHZhbHVlKTtcblxucHJvZ3JhbVxuICAuY29tbWFuZCgnYXV0aCcpXG4gIC5kZXNjcmlwdGlvbignQXV0aGVudGljYXRlJylcbiAgLmFjdGlvbihhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgeyBjb3VudHJ5LCBsYW5ndWFnZSwgcmVmcmVzaFRva2VuLCBzdGF0ZVBhdGggfSA9IG9wdGlvbnM7XG5cbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBpbml0KGNvdW50cnksIGxhbmd1YWdlLCByZWZyZXNoVG9rZW4sIHN0YXRlUGF0aCk7XG5cbiAgICBjb25zb2xlLmluZm8oJ1JlZnJlc2ggdG9rZW46ICcgKyBjbGllbnQuYXV0aC5yZWZyZXNoVG9rZW4pO1xuXG4gICAgc2F2ZVN0YXRlKHN0YXRlUGF0aCwgY2xpZW50KTtcbiAgICBwcm9jZXNzLmV4aXQoMCk7XG4gIH0pO1xuXG5wcm9ncmFtXG4gIC5jb21tYW5kKCdscycsIHsgaXNEZWZhdWx0OiB0cnVlIH0pXG4gIC5kZXNjcmlwdGlvbignTGlzdCBkZXZpY2VzJylcbiAgLmFjdGlvbihhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgeyBjb3VudHJ5LCBsYW5ndWFnZSwgcmVmcmVzaFRva2VuLCBzdGF0ZVBhdGggfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgaW5pdChjb3VudHJ5LCBsYW5ndWFnZSwgcmVmcmVzaFRva2VuLCBzdGF0ZVBhdGgpO1xuXG4gICAgZm9yIChjb25zdCBkZXZpY2Ugb2YgY2xpZW50LmRldmljZXMpIHtcbiAgICAgIGNvbnNvbGUuaW5mbyhTdHJpbmcoZGV2aWNlKSk7XG4gICAgfVxuXG4gICAgc2F2ZVN0YXRlKHN0YXRlUGF0aCwgY2xpZW50KTtcbiAgICBwcm9jZXNzLmV4aXQoMCk7XG4gIH0pO1xuXG5wcm9ncmFtXG4gIC5jb21tYW5kKCdtb25pdG9yIDxkZXZpY2VJZD4nKVxuICAuZGVzY3JpcHRpb24oJ01vbml0b3IgYW55IGRldmljZSwgZGlzcGxheWluZyBnZW5lcmljIGluZm9ybWF0aW9uIGFib3V0IGl0cyBzdGF0dXMuJylcbiAgLmFjdGlvbihhc3luYyAoZGV2aWNlSWQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHsgY291bnRyeSwgbGFuZ3VhZ2UsIHJlZnJlc2hUb2tlbiwgc3RhdGVQYXRoIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IGluaXQoY291bnRyeSwgbGFuZ3VhZ2UsIHJlZnJlc2hUb2tlbiwgc3RhdGVQYXRoKTtcblxuICAgIGNvbnN0IGRldiA9IGF3YWl0IGNsaWVudC5nZXREZXZpY2UoZGV2aWNlSWQpO1xuICAgIHNhdmVTdGF0ZShzdGF0ZVBhdGgsIGNsaWVudCk7XG5cbiAgICBhd2FpdCBkZXYubG9hZCgpO1xuICAgIGF3YWl0IGRldi5zdGFydE1vbml0b3IoKTtcbiAgICB0cnkge1xuICAgICAgZm9yICg7IDspIHtcbiAgICAgICAgYXdhaXQgZGVsYXkoMTAwMCk7XG4gICAgICAgIGNvbnNvbGUuaW5mbygncG9sbGluZy4uLicpO1xuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICBjb25zdCBzdGF0dXMgPSBhd2FpdCBkZXYucG9sbCgpO1xuICAgICAgICAgIGlmICghc3RhdHVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ25vIHN0YXR1cycpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qga2V5cyA9IFJlZmxlY3Qub3duS2V5cygoc3RhdHVzIGFzIGFueSkuY29uc3RydWN0b3IucHJvdG90eXBlKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYgIVsnY29uc3RydWN0b3InXS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgLSAke2tleX06ICR7U3RyaW5nKFJlZmxlY3QuZ2V0KHN0YXR1cywga2V5KSl9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBOb3RMb2dnZWRJbkVycm9yKSB7XG4gICAgICAgICAgICBhd2FpdCBkZXYuc3RvcE1vbml0b3IoKTtcbiAgICAgICAgICAgIGF3YWl0IGNsaWVudC5yZWZyZXNoKCk7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oY2xpZW50LmRldmljZXMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBhd2FpdCBkZXYuc3RvcE1vbml0b3IoKTtcbiAgICB9XG4gIH0pO1xuXG5hc3luYyBmdW5jdGlvbiBhdXRoZW50aWNhdGUoZ2F0ZXdheTogR2F0ZXdheSkge1xuICBjb25zdCBsb2dpblVybCA9IGdhdGV3YXkub2F1dGhVcmw7XG5cbiAgY29uc29sZS5pbmZvKCdMb2cgaW4gaGVyZTonLCBsb2dpblVybCk7XG4gIGNvbnN0IGNhbGxiYWNrVXJsID0gYXdhaXQgaW5wdXQoJ1RoZW4gcGFzdGUgdGhlIFVSTCB3aGVyZSB0aGUgYnJvd3NlciBpcyByZWRpcmVjdGVkOiAnKTtcblxuICByZXR1cm4gQXV0aC5mcm9tVXJsKGdhdGV3YXksIGNhbGxiYWNrVXJsKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5pdChjb3VudHJ5OiBzdHJpbmcsIGxhbmd1YWdlOiBzdHJpbmcsIHJlZnJlc2hUb2tlbjogc3RyaW5nLCBzdGF0ZUZpbGVQYXRoPzogc3RyaW5nKSB7XG4gIGxldCBzdGF0ZTogYW55ID0ge307XG5cbiAgaWYgKHN0YXRlRmlsZVBhdGgpIHtcbiAgICBpZiAoZnMuZXhpc3RzU3luYyhzdGF0ZUZpbGVQYXRoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3RhdGUgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhzdGF0ZUZpbGVQYXRoKS50b1N0cmluZygpKTtcbiAgICAgIH0gY2F0Y2ggeyB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY2xpZW50ID0gcmVmcmVzaFRva2VuID9cbiAgICBhd2FpdCBDbGllbnQubG9hZEZyb21Ub2tlbihyZWZyZXNoVG9rZW4sIGNvdW50cnksIGxhbmd1YWdlKSA6XG4gICAgQ2xpZW50LmxvYWRGcm9tU3RhdGUoe1xuICAgICAgY291bnRyeSxcbiAgICAgIGxhbmd1YWdlLFxuXG4gICAgICAuLi5zdGF0ZSxcbiAgICB9KTtcblxuICBpZiAoIWNsaWVudC5nYXRld2F5KSB7XG4gICAgY2xpZW50LmdhdGV3YXkgPSBhd2FpdCBHYXRld2F5LmRpc2NvdmVyKGNvdW50cnksIGxhbmd1YWdlKTtcbiAgfVxuXG4gIGlmICghY2xpZW50LmF1dGgpIHtcbiAgICBjbGllbnQuYXV0aCA9IGF3YWl0IGF1dGhlbnRpY2F0ZShjbGllbnQuZ2F0ZXdheSk7XG4gIH1cblxuICBpZiAoIWNsaWVudC5zZXNzaW9uICYmIGNsaWVudC5hdXRoKSB7XG4gICAgKHtcbiAgICAgIHNlc3Npb246IGNsaWVudC5zZXNzaW9uLFxuICAgICAgaXRlbXM6IGNsaWVudC5kZXZpY2VzLFxuICAgIH0gPSBhd2FpdCBjbGllbnQuYXV0aC5zdGFydFNlc3Npb24oKSk7XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IGNsaWVudC51cGRhdGVEZXZpY2VzKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIE5vdExvZ2dlZEluRXJyb3IpIHtcbiAgICAgIGF3YWl0IGNsaWVudC5yZWZyZXNoKCk7XG4gICAgICBhd2FpdCBjbGllbnQudXBkYXRlRGV2aWNlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbGllbnQ7XG59XG5cbmZ1bmN0aW9uIHNhdmVTdGF0ZShzdGF0ZUZpbGVQYXRoOiBzdHJpbmcsIGNsaWVudDogQ2xpZW50KSB7XG4gIGZzLndyaXRlRmlsZVN5bmMoc3RhdGVGaWxlUGF0aCwgSlNPTi5zdHJpbmdpZnkoY2xpZW50LnRvU3RhdGVPYmplY3QoKSkpO1xufVxuXG5wcm9ncmFtLnBhcnNlKHByb2Nlc3MuYXJndik7XG4iXX0=