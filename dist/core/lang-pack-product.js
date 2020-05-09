"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
/**
 * A description of a device model's capabilities.
 */
class LangPackProduct {
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
exports.LangPackProduct = LangPackProduct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy1wYWNrLXByb2R1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29yZS9sYW5nLXBhY2stcHJvZHVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUF1QjtBQUd2Qjs7R0FFRztBQUNILE1BQWEsZUFBZTtJQUMxQixZQUNTLElBQVM7UUFBVCxTQUFJLEdBQUosSUFBSSxDQUFLO0lBRWxCLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFDVixPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtTQUNULENBQUM7SUFDakIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksU0FBUyxDQUFDLElBQVk7UUFDM0IsTUFBTSxLQUFLLEdBQUksSUFBSSxDQUFDLEtBQUssRUFBZ0IsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ3RELGlCQUFpQjtRQUNqQixNQUFNLFFBQVEsR0FBRyxnQkFBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRLENBQUMsS0FBYTtRQUMzQixNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBSyxFQUFnQixDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQ0Y7QUFyQ0QsMENBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IExhbmdWYWx1ZSB9IGZyb20gJy4vbGFuZy1wYWNrLW1vZGVsJztcblxuLyoqXG4gKiBBIGRlc2NyaXB0aW9uIG9mIGEgZGV2aWNlIG1vZGVsJ3MgY2FwYWJpbGl0aWVzLlxuICovXG5leHBvcnQgY2xhc3MgTGFuZ1BhY2tQcm9kdWN0IHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBkYXRhOiBhbnksXG4gICkge1xuICB9XG5cbiAgLyoqXG4gICAqIExvb2sgdXAgaW5mb3JtYXRpb24gYWJvdXQgYSB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyB2YWx1ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGFja3M6IHRoaXMuZGF0YS5wYWNrLFxuICAgIH0gYXMgTGFuZ1ZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIExvb2sgdXAgdGhlIGVuY29kZWQgdmFsdWUgZm9yIGEgZnJpZW5kbHkgZW51bSBuYW1lLlxuICAgKi9cbiAgcHVibGljIGVudW1WYWx1ZShuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwYWNrcyA9ICh0aGlzLnZhbHVlKCkgYXMgTGFuZ1ZhbHVlKS5wYWNrcyB8fCB7fTtcbiAgICAvLyBpbnZlcnQgdGhlbSBwYVxuICAgIGNvbnN0IHBhY2tzSW52ID0gXy5pbnZlcnQocGFja3MpO1xuXG4gICAgcmV0dXJuIHBhY2tzSW52W25hbWVdO1xuICB9XG5cbiAgLyoqXG4gICAqIExvb2sgdXAgdGhlIGZyaWVuZGx5IGVudW0gbmFtZSBmb3IgYW4gZW5jb2RlZCB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBlbnVtTmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGFja3MgPSAodGhpcy52YWx1ZSgpIGFzIExhbmdWYWx1ZSkucGFja3MgfHwge307XG4gICAgaWYgKCEodmFsdWUgaW4gcGFja3MpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFja3NbdmFsdWVdO1xuICB9XG59XG4iXX0=