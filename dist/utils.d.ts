import { Device } from './core/device';
declare type Not<T> = [T] extends [never] ? unknown : never;
declare type Extractable<T, U> = Not<U extends any ? Not<T extends U ? unknown : never> : never>;
export declare function asEnum<E extends Record<keyof E, string | number>, K extends string | number>(e: E, k: K & Extractable<E[keyof E], K>): Extract<E[keyof E], K>;
export declare function asTime(hoursKey: string, minutesKey: string, data: any): number;
/**
 * Looks up an enum value for the provided attr.
 * @param attr The attribute to lookup in the enum.
 * @param data The JSON data from the API.
 * @param device A sub-class instance of a Device.
 * @returns The enum value.
 */
export declare function lookupEnum(attr: string, data: any, device: Device): any;
/**
 * Look up a reference value for the provided attribute.
 * @param attr The attribute to find the value for.
 * @param data The JSON data from the API.
 * @param device A sub-class instance of a Device.
 * @returns The looked up value.
 */
export declare function lookupReference(attr: string, data: any, device: Device): string | null;
/**
 * Looks up an enum value for the provided attr.
 * @param attr The attribute to lookup in the enum.
 * @param data The JSON data from the API.
 * @param device A sub-class instance of a Device.
 * @returns The enum value.
 */
export declare function lookupEnumLang(attr: string, data: any, device: Device): string;
export {};
