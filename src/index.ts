/**
 * 
 * @param target 
 * @returns if target is not null
 */
export function notNull<E>(target: E | null): target is E { return target !== null; }

/**
 * 
 * @param propositionOrBooleans 
 * @returns if contains no [return of proposition] or [boolean] that is false
 */
export const all = (propositionOrBooleans: Array<(() => boolean) | boolean>): boolean =>
    propositionOrBooleans
        .every((propositionOrBoolean: (() => boolean) | boolean) =>
            typeof propositionOrBoolean === "boolean"
                ? propositionOrBoolean
                : propositionOrBoolean());

/**
 * 
 * @param propositionOrBooleans 
 * @returns if contains any [return of proposition] or [boolean] that is true
 */
export const any = (propositionOrBooleans: Array<(() => boolean) | boolean>): boolean =>
    propositionOrBooleans
        .find((propositionOrBoolean: (() => boolean) | boolean) =>
            typeof propositionOrBoolean === "boolean"
                ? propositionOrBoolean
                : propositionOrBoolean()) !== undefined;