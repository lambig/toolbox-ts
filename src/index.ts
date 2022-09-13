export type Proposition = () => boolean;
export type ProPositionOrBoolean = Proposition | boolean;
export type Predicate<E> = (arg: E) => boolean;
export type Condition<E> = ProPositionOrBoolean | Predicate<E>;
export type Supplier<E> = () => E;
export type Returning<E> = E | ClassedSupplier<E>;
export type Pattern<I, O> = [Condition<I>, Returning<O>];

/**
 * Array with (initially) fixed length
 * big thanks to https://stackoverflow.com/a/59906630
 */
export type FixedLengthArray<T extends any[]> =
    Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
    & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> }

/**
 * 
 * @param target 
 * @returns if target is not null
 */
export function notNull<E>(target: E | null): target is E { return target !== null; }

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never



const isProPositionOrBoolean = (arg: unknown): arg is ProPositionOrBoolean => (typeof arg === "boolean" || typeof arg === "function");
const truthy = (propositionOrBoolean: ProPositionOrBoolean): boolean => propositionOrBoolean instanceof Function
    ? truthy(propositionOrBoolean())
    : Boolean(propositionOrBoolean);
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


const isBooleanSupplier = <E>(arg: Proposition | Predicate<E>): arg is Proposition => !arg.length;
const matchedBy = <I, O>(target: I) =>
    ([condition]: Pattern<I, O>): boolean =>
        typeof condition === "boolean"
            ? condition
            : isBooleanSupplier(condition)
                ? condition()
                : condition(target);
const asValue = <I, O>([, valueOrValueSupplier]: Pattern<I, O>): O => valueOrValueSupplier instanceof ClassedSupplier ? valueOrValueSupplier.value() : valueOrValueSupplier
/**
 * defines patterns
 * @param patterns tuples of Condition/Value
 * @returns instance of a new Patterns
 */
export const patterns = <X, Y>(...patterns: Pattern<X, Y>[]): Patterns<X, Y> => Patterns.of(...patterns);
/**
 * defines supplier of value
 * @param supplier function returns value
 * @returns supplier as ClassedSupplier
 */
export const returnOf = <E>(supplier: Supplier<E>): ClassedSupplier<E> => new ClassedSupplier(supplier);
/**
 * defines default value for patterns
 * @param returning default value or supplier of default value
 * @returns default pattern
 */
export const orElse = <I, O>(returning: Returning<O>): Pattern<I, O> => [true, returning];

class ClassedSupplier<E>{
    constructor(
        private readonly supplier: Supplier<E>
    ) { }
    /**
     * returns the value of supplier
     * @return value
     */
    value(): E {
        return this.supplier();
    }
};

export class Patterns<I, O> {
    private constructor(
        private readonly patterns: Pattern<I, O>[]
    ) { }
    /**
     * defines patterns
     * @param patterns tuples of Condition/Value
     * @returns instance of a new Patterns
     */
    static of<X, Y>(...patterns: Pattern<X, Y>[]): Patterns<X, Y> {
        return new Patterns(patterns);
    }

    /**
     * 
     * @param target to be evaluated by conditions in patterns
     * @returns value in the first satisfied pattern by target
     */
    firstSatisfiedBy(target: I): O | undefined {
        const value = this.patterns.find(matchedBy(target))?.[1];
        return value instanceof ClassedSupplier ? value.value() : value;
    }

    /**
     * 
     * @param target to be evaluated by conditions in patterns
     * @returns all values in satisfied patterns by target
     */
    allSatisfiedBy(target: I): O[] {
        return this.patterns.filter(matchedBy(target)).map(asValue);
    }
}

/**
 * map [f, g, h] to [f(target), g(target), h(target)]
 * @param target 
 * @returns 
 */
export const toApplicationTo = <I, O>(target: I) => (func: ((input: I) => O)) => func(target);