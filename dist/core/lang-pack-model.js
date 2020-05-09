"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
/**
 * A description of a device model's capabilities.
 */
class LangPackModel {
    constructor(data) {
        this.data = data;
    }
    /**
     * Look up information about a value.
     */
    value() {
        return {
            packs: this.data.pack,
        };
    }
    /**
     * Look up the encoded value for a friendly enum name.
     */
    enumValue(name) {
        const packs = this.value().packs || {};
        // invert them pa
        const packsInv = lodash_1.default.invert(packs);
        return packsInv[name];
    }
    /**
     * Look up the friendly enum name for an encoded value.
     */
    enumName(value) {
        const packs = this.value().packs || {};
        if (!(value in packs)) {
            return null;
        }
        return packs[value];
    }
}
exports.LangPackModel = LangPackModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy1wYWNrLW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvcmUvbGFuZy1wYWNrLW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQXVCO0FBTXZCOztHQUVHO0FBQ0gsTUFBYSxhQUFhO0lBQ3hCLFlBQ1MsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7SUFFbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNWLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1NBQ1QsQ0FBQztJQUNqQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxTQUFTLENBQUMsSUFBWTtRQUMzQixNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBSyxFQUFnQixDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdEQsaUJBQWlCO1FBQ2pCLE1BQU0sUUFBUSxHQUFHLGdCQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNJLFFBQVEsQ0FBQyxLQUFhO1FBQzNCLE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxLQUFLLEVBQWdCLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDckIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RCLENBQUM7Q0FDRjtBQXJDRCxzQ0FxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExhbmdWYWx1ZSB7XG4gIHBhY2tzOiBhbnk7XG59XG5cbi8qKlxuICogQSBkZXNjcmlwdGlvbiBvZiBhIGRldmljZSBtb2RlbCdzIGNhcGFiaWxpdGllcy5cbiAqL1xuZXhwb3J0IGNsYXNzIExhbmdQYWNrTW9kZWwge1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGRhdGE6IGFueSxcbiAgKSB7XG4gIH1cblxuICAvKipcbiAgICogTG9vayB1cCBpbmZvcm1hdGlvbiBhYm91dCBhIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIHZhbHVlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYWNrczogdGhpcy5kYXRhLnBhY2ssXG4gICAgfSBhcyBMYW5nVmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogTG9vayB1cCB0aGUgZW5jb2RlZCB2YWx1ZSBmb3IgYSBmcmllbmRseSBlbnVtIG5hbWUuXG4gICAqL1xuICBwdWJsaWMgZW51bVZhbHVlKG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHBhY2tzID0gKHRoaXMudmFsdWUoKSBhcyBMYW5nVmFsdWUpLnBhY2tzIHx8IHt9O1xuICAgIC8vIGludmVydCB0aGVtIHBhXG4gICAgY29uc3QgcGFja3NJbnYgPSBfLmludmVydChwYWNrcyk7XG5cbiAgICByZXR1cm4gcGFja3NJbnZbbmFtZV07XG4gIH1cblxuICAvKipcbiAgICogTG9vayB1cCB0aGUgZnJpZW5kbHkgZW51bSBuYW1lIGZvciBhbiBlbmNvZGVkIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIGVudW1OYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYWNrcyA9ICh0aGlzLnZhbHVlKCkgYXMgTGFuZ1ZhbHVlKS5wYWNrcyB8fCB7fTtcbiAgICBpZiAoISh2YWx1ZSBpbiBwYWNrcykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBwYWNrc1t2YWx1ZV07XG4gIH1cbn1cbiJdfQ==