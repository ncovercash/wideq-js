export declare enum ValueType {
    Bit = "Bit",
    Enum = "Enum",
    Range = "Range",
    Reference = "Reference",
    StringComment = "StringComment"
}
export interface ModelDataValue {
    type: string;
    [key: string]: any;
}
export interface ModelData {
    Info: {
        productType: string;
        productCode: string;
        coutnry: string;
        modelType: string;
        model: string;
        modelName: string;
        networkType: string;
        version: string;
    };
    Value: {
        [key: string]: ModelDataValue;
    };
    [key: string]: any;
}
export interface BitValue {
    type: ValueType.Bit;
    options: any;
}
export interface EnumValue {
    type: ValueType.Enum;
    options: any;
}
export interface RangeValue {
    type: ValueType.Range;
    min: number;
    max: number;
    step: number;
}
export interface ReferenceValue {
    type: ValueType.Reference;
    reference: any;
}
export interface StringCommentValue {
    type: ValueType.StringComment;
    comment: string;
}
export declare class ModelInfo {
    data: ModelData;
    constructor(data: ModelData);
    value(name: string): BitValue | EnumValue | RangeValue | ReferenceValue | StringCommentValue | null;
    default(name: string): any;
    enumValue(key: string, name: string): string;
    enumName(key: string, value: string): any;
    referenceName(key: string, value: any): string | null;
    readonly binaryMonitorData: boolean;
    decodeMonitor(data: any): any;
    private decodeMonitorBinary;
    private decodeMonitorJson;
}
