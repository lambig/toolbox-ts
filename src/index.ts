/**
 * 
 * @param target 
 * @returns if target is not null
 */
export function notNull<E>(target: E | null): target is E { return target !== null; }

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
/**
 * Array with (initially) fixed length
 * big thanks to https://stackoverflow.com/a/59906630
 */
export type FixedLengthArray<T extends any[]> =
    Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
    & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> }

export type ProPositionOrBoolean = (() => boolean) | boolean;
const isProPositionOrBoolean = (arg: unknown): arg is ProPositionOrBoolean => (typeof arg === "boolean" || typeof arg === "function");

const truthy = (propositionOrBoolean: ProPositionOrBoolean) => typeof propositionOrBoolean === "boolean" ? propositionOrBoolean : propositionOrBoolean();
const propositionsOrBooleans = (args: ProPositionOrBoolean[] | FixedLengthArray<[ProPositionOrBoolean[]]>): ProPositionOrBoolean[] =>
    Array.isArray(args) && args.every(isProPositionOrBoolean)
        ? args
        : args[0];

/**
 * 
 * @param args 
 * @returns if contains no [return of proposition] or [boolean] that is false
 */
export const all = (...args: ProPositionOrBoolean[] | FixedLengthArray<[ProPositionOrBoolean[]]>): boolean => propositionsOrBooleans(args).every(truthy);

/**
 * 
 * @param args 
 * @returns if contains any [return of proposition] or [boolean] that is true
 */
export const any = (...args: ProPositionOrBoolean[] | FixedLengthArray<[ProPositionOrBoolean[]]>): boolean => propositionsOrBooleans(args).find(truthy) as boolean;

/**
 * 
 * @param args 
 * @returns if contains no [return of proposition] or [boolean] that is true
 */
export const none = (...args: ProPositionOrBoolean[] | FixedLengthArray<[ProPositionOrBoolean[]]>): boolean => !any(...args);

/**
 * 
 * @param args 
 * @returns if contains any [return of proposition] or [boolean] that is false
 */
export const notAll = (...args: ProPositionOrBoolean[] | FixedLengthArray<[ProPositionOrBoolean[]]>): boolean => !all(...args);