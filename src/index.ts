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


export type Proposition = () => boolean;
export type Predicate<E> = (arg: E) => boolean;
export type Condition<E> = boolean | Predicate<E> | Proposition;
export type Supplier<E> = () => E;
export type Returning<E> = E | ClassedSupplier<E>;
export type Pattern<I, O> = [Condition<I>, Returning<O>];

const isBooleanSupplier = <E>(arg: Proposition | Predicate<E>): arg is Proposition => {
    return !arg.length;
}
const matchedBy = <I, O>(target: I) =>
    ([condition]: Pattern<I, O>): boolean =>
        typeof condition === "boolean"
            ? condition
            : isBooleanSupplier(condition)
                ? condition()
                : condition(target);
const asValue = <I, O>([, valueOrValueSupplier]: Pattern<I, O>): O => valueOrValueSupplier instanceof ClassedSupplier ? valueOrValueSupplier.value() : valueOrValueSupplier
export const patterns = <X, Y>(...patterns: Pattern<X, Y>[]): Patterns<X, Y> => Patterns.of(...patterns);
export const returnOf = <E>(supplier: Supplier<E>): ClassedSupplier<E> => new ClassedSupplier(supplier);
export const orElse = <E>(returning: Returning<E>): [boolean, Returning<E>] => [true, returning];

class ClassedSupplier<E>{
    private readonly supplier: Supplier<E>;
    constructor(supplier: Supplier<E>) {
        this.supplier = supplier;
    }
    value(): E {
        return this.supplier();
    }
};

export class Patterns<I, O> {
    private readonly patterns: Pattern<I, O>[];
    private constructor(patterns: Pattern<I, O>[]) {
        this.patterns = patterns;
    }
    static of<X, Y>(...patterns: Pattern<X, Y>[]): Patterns<X, Y> {
        return new Patterns(patterns);
    }

    firstSatisfiedBy(target: I): O | undefined {
        const value = this.patterns.find(matchedBy(target))?.[1];
        return value instanceof ClassedSupplier ? value.value() : value;
    }

    allSatisfiedBy(target: I): O[] {
        return this.patterns.filter(matchedBy(target)).map(asValue);
    }
}