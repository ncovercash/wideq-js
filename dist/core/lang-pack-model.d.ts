export interface LangValue {
    packs: any;
}
/**
 * A description of a device model's capabilities.
 */
export declare class LangPackModel {
    data: any;
    constructor(data: any);
    /**
     * Look up information about a value.
     */
    value(): LangValue;
    /**
     * Look up the encoded value for a friendly enum name.
     */
    enumValue(name: string): string;
    /**
     * Look up the friendly enum name for an encoded value.
     */
    enumName(value: string): any;
}
