import { notNull, all, any, notAll, none } from "../src/index";
import { Patterns, returnOf, orElse, patterns } from "../src/index";
import { toApplicationTo } from "../src/index";

describe(
    "notNull",
    () => {
        test("target is specified", () => expect(notNull(1)).toBeTruthy())
        test("target is undefined", () => expect(notNull(undefined)).toBeTruthy())
        test("target is null", () => expect(notNull(null)).toBeFalsy())
    },
)

describe(
    "all_array",
    () => {
        describe(
            "boolean",
            () => {
                test("empty", () => expect(all([])).toBeTruthy())
                test("all true", () => expect(all([1 === 1, true])).toBeTruthy())
                test("contains false", () => expect(all([1 === 1, false, true])).toBeFalsy())
                test("all false", () => expect(all([false, 1 > 5])).toBeFalsy())
            }
        )
        describe(
            "function/method returns boolean",
            () => {
                test("empty", () => expect(all([])).toBeTruthy())
                test("all true", () => expect(all([() => 1 === 1, () => true])).toBeTruthy())
                test("contains false", () => expect(all([() => 1 === 1, () => false, () => true])).toBeFalsy())
                test("all false", () => expect(all([() => false, () => 1 > 5])).toBeFalsy())
            }
        )
        describe(
            "mixed",
            () => {
                test("empty", () => expect(all([])).toBeTruthy())
                test("all true", () => expect(all([() => 1 === 1, true])).toBeTruthy())
                test("contains false", () => expect(all([1 === 1, () => false, () => true])).toBeFalsy())
                test("all false", () => expect(all([() => false, 1 > 5])).toBeFalsy())
            }
        )

        describe(
            "lazy evaluation",
            () => test("doesn't evaluate non-needed value", () =>
                expect(
                    all([
                        true,
                        false,
                        () => { throw new Error("unexpected evaluation"); }
                    ]))
                    .toBeFalsy())
        )
    }
)

describe(
    "all_varargs",
    () => {
        describe(
            "boolean",
            () => {
                test("empty", () => expect(all()).toBeTruthy())
                test("all true", () => expect(all(1 === 1, true)).toBeTruthy())
                test("contains false", () => expect(all(1 === 1, false, true)).toBeFalsy())
                test("all false", () => expect(all(false, 1 > 5)).toBeFalsy())
            }
        )
        describe(
            "function/method returns boolean",
            () => {
                test("empty", () => expect(all()).toBeTruthy())
                test("all true", () => expect(all(() => 1 === 1, () => true)).toBeTruthy())
                test("contains false", () => expect(all(() => 1 === 1, () => false, () => true)).toBeFalsy())
                test("all false", () => expect(all(() => false, () => 1 > 5)).toBeFalsy())
            }
        )
        describe(
            "mixed",
            () => {
                test("empty", () => expect(all()).toBeTruthy())
                test("all true", () => expect(all(() => 1 === 1, true)).toBeTruthy())
                test("contains false", () => expect(all(1 === 1, () => false, () => true)).toBeFalsy())
                test("all false", () => expect(all(() => false, 1 > 5)).toBeFalsy())
            }
        )
        describe(
            "lazy evaluation",
            () => test("doesn't evaluate non-needed value", () =>
                expect(
                    all(
                        true,
                        false,
                        () => { throw new Error("unexpected evaluation"); }
                    ))
                    .toBeFalsy())
        )
    }
)

describe(
    "any_array",
    () => {
        describe(
            "boolean",
            () => {
                test("empty", () => expect(any([])).toBeFalsy())
                test("all true", () => expect(any([1 === 1, true])).toBeTruthy())
                test("all true", () => expect(any([1 === 1, true])).toBeTruthy())
                test("contains false", () => expect(any([1 === 1, false, true])).toBeTruthy())
                test("all false", () => expect(any([false, 1 > 5])).toBeFalsy())
            }
        )
        describe(
            "function/method returns boolean",
            () => {
                test("empty", () => expect(any([])).toBeFalsy())
                test("all true", () => expect(any([() => 1 === 1, () => true])).toBeTruthy())
                test("contains false", () => expect(any([() => 1 === 1, () => false, () => true])).toBeTruthy())
                test("all false", () => expect(any([() => false, () => 1 > 5])).toBeFalsy())
            }
        )
        describe(
            "mixed",
            () => {
                test("empty", () => expect(any([])).toBeFalsy())
                test("all true", () => expect(any([() => 1 === 1, true])).toBeTruthy())
                test("contains false", () => expect(any([1 === 1, () => false, () => true])).toBeTruthy())
                test("all false", () => expect(any([() => false, 1 > 5])).toBeFalsy())
            }
        )
        describe(
            "lazy evaluation",
            () => test("doesn't evaluate non-needed value", () =>
                expect(
                    any([
                        true,
                        () => { throw new Error("unexpected evaluation"); }
                    ]))
                    .toBeTruthy())
        )
    }
)

describe(
    "any_varargs",
    () => {
        describe(
            "boolean",
            () => {
                test("empty", () => expect(any()).toBeFalsy())
                test("all true", () => expect(any(1 === 1, true)).toBeTruthy())
                test("all true", () => expect(any(1 === 1, true)).toBeTruthy())
                test("contains false", () => expect(any(1 === 1, false, true)).toBeTruthy())
                test("all false", () => expect(any(false, 1 > 5)).toBeFalsy())
            }
        )
        describe(
            "function/method returns boolean",
            () => {
                test("empty", () => expect(any()).toBeFalsy())
                test("all true", () => expect(any(() => 1 === 1, () => true)).toBeTruthy())
                test("contains false", () => expect(any(() => 1 === 1, () => false, () => true)).toBeTruthy())
                test("all false", () => expect(any(() => false, () => 1 > 5)).toBeFalsy())
            }
        )
        describe(
            "mixed",
            () => {
                test("empty", () => expect(any()).toBeFalsy())
                test("all true", () => expect(any(() => 1 === 1, true)).toBeTruthy())
                test("contains false", () => expect(any(1 === 1, () => false, () => true)).toBeTruthy())
                test("all false", () => expect(any(() => false, 1 > 5)).toBeFalsy())
            }
        )
        describe(
            "lazy evaluation",
            () => test("doesn't evaluate non-needed value", () =>
                expect(
                    any(
                        true,
                        () => { throw new Error("unexpected evaluation"); }
                    ))
                    .toBeTruthy())
        )
    }
)

describe(
    "none_array",
    () => {
        describe(
            "boolean",
            () => {
                test("empty", () => expect(none([])).toBeTruthy())
                test("all true", () => expect(none([1 === 1, true])).toBeFalsy())
                test("all true", () => expect(none([1 === 1, true])).toBeFalsy())
                test("contains false", () => expect(none([1 === 1, false, true])).toBeFalsy())
                test("all false", () => expect(none([false, 1 > 5])).toBeTruthy())
            }
        )
        describe(
            "function/method returns boolean",
            () => {
                test("empty", () => expect(none([])).toBeTruthy())
                test("all true", () => expect(none([() => 1 === 1, () => true])).toBeFalsy())
                test("contains false", () => expect(none([() => 1 === 1, () => false, () => true])).toBeFalsy())
                test("all false", () => expect(none([() => false, () => 1 > 5])).toBeTruthy())
            }
        )
        describe(
            "mixed",
            () => {
                test("empty", () => expect(none([])).toBeTruthy())
                test("all true", () => expect(none([() => 1 === 1, true])).toBeFalsy())
                test("contains false", () => expect(none([1 === 1, () => false, () => true])).toBeFalsy())
                test("all false", () => expect(none([() => false, 1 > 5])).toBeTruthy())
            }
        )
        describe(
            "lazy evaluation",
            () => test("doesn't evaluate non-needed value", () =>
                expect(
                    none([
                        true,
                        () => { throw new Error("unexpected evaluation"); }
                    ]))
                    .toBeFalsy())
        )
    }
)

describe(
    "none_varargs",
    () => {
        describe(
            "boolean",
            () => {
                test("empty", () => expect(none()).toBeTruthy())
                test("all true", () => expect(none(1 === 1, true)).toBeFalsy())
                test("all true", () => expect(none(1 === 1, true)).toBeFalsy())
                test("contains false", () => expect(none(1 === 1, false, true)).toBeFalsy())
                test("all false", () => expect(none(false, 1 > 5)).toBeTruthy())
            }
        )
        describe(
            "function/method returns boolean",
            () => {
                test("empty", () => expect(none()).toBeTruthy())
                test("all true", () => expect(none(() => 1 === 1, () => true)).toBeFalsy())
                test("contains false", () => expect(none(() => 1 === 1, () => false, () => true)).toBeFalsy())
                test("all false", () => expect(none(() => false, () => 1 > 5)).toBeTruthy())
            }
        )
        describe(
            "mixed",
            () => {
                test("empty", () => expect(none()).toBeTruthy())
                test("all true", () => expect(none(() => 1 === 1, true)).toBeFalsy())
                test("contains false", () => expect(none(1 === 1, () => false, () => true)).toBeFalsy())
                test("all false", () => expect(none(() => false, 1 > 5)).toBeTruthy())
            }
        )
        describe(
            "lazy evaluation",
            () => test("doesn't evaluate non-needed value", () =>
                expect(
                    none(
                        true,
                        () => { throw new Error("unexpected evaluation"); }
                    ))
                    .toBeFalsy())
        )
    }
)

describe(
    "notAll_array",
    () => {
        describe(
            "boolean",
            () => {
                test("empty", () => expect(notAll([])).toBeFalsy())
                test("notAll true", () => expect(notAll([1 === 1, true])).toBeFalsy())
                test("contains false", () => expect(notAll([1 === 1, false, true])).toBeTruthy())
                test("notAll false", () => expect(notAll([false, 1 > 5])).toBeTruthy())
            }
        )
        describe(
            "function/method returns boolean",
            () => {
                test("empty", () => expect(notAll([])).toBeFalsy())
                test("notAll true", () => expect(notAll([() => 1 === 1, () => true])).toBeFalsy())
                test("contains false", () => expect(notAll([() => 1 === 1, () => false, () => true])).toBeTruthy())
                test("notAll false", () => expect(notAll([() => false, () => 1 > 5])).toBeTruthy())
            }
        )
        describe(
            "mixed",
            () => {
                test("empty", () => expect(notAll([])).toBeFalsy())
                test("notAll true", () => expect(notAll([() => 1 === 1, true])).toBeFalsy())
                test("contains false", () => expect(notAll([1 === 1, () => false, () => true])).toBeTruthy())
                test("notAll false", () => expect(notAll([() => false, 1 > 5])).toBeTruthy())
            }
        )
        describe(
            "lazy evaluation",
            () => test("doesn't evaluate non-needed value", () =>
                expect(
                    notAll([
                        true,
                        false,
                        () => { throw new Error("unexpected evaluation"); }
                    ]))
                    .toBeTruthy())
        )
    }
)

describe(
    "notAll_varargs",
    () => {
        describe(
            "boolean",
            () => {
                test("empty", () => expect(notAll()).toBeFalsy())
                test("notAll true", () => expect(notAll(1 === 1, true)).toBeFalsy())
                test("contains false", () => expect(notAll(1 === 1, false, true)).toBeTruthy())
                test("notAll false", () => expect(notAll(false, 1 > 5)).toBeTruthy())
            }
        )
        describe(
            "function/method returns boolean",
            () => {
                test("empty", () => expect(notAll()).toBeFalsy())
                test("notAll true", () => expect(notAll(() => 1 === 1, () => true)).toBeFalsy())
                test("contains false", () => expect(notAll(() => 1 === 1, () => false, () => true)).toBeTruthy())
                test("notAll false", () => expect(notAll(() => false, () => 1 > 5)).toBeTruthy())
            }
        )
        describe(
            "mixed",
            () => {
                test("empty", () => expect(notAll()).toBeFalsy())
                test("notAll true", () => expect(notAll(() => 1 === 1, true)).toBeFalsy())
                test("contains false", () => expect(notAll(1 === 1, () => false, () => true)).toBeTruthy())
                test("notAll false", () => expect(notAll(() => false, 1 > 5)).toBeTruthy())
            }
        )
        describe(
            "lazy evaluation",
            () => test("doesn't evaluate non-needed value", () =>
                expect(
                    notAll(
                        true,
                        false,
                        () => { throw new Error("unexpected evaluation"); }
                    ))
                    .toBeTruthy())
        )
    }
)

describe(
    "all_any_notAll_none_combinated",
    () => {
        test("true", () => expect(
            all(
                true,
                any(
                    () => false,
                    notAll(true, () => false)
                ),
                none(
                    false,
                    () => false
                )
            )).toBeTruthy());
        test("false", () => expect(
            all(
                true,
                any(
                    () => false,
                    notAll(true, () => false)
                ),
                none(
                    false,
                    () => true
                )
            )).toBeFalsy());
    }
);

describe(
    "patterns#firstSatisfiedBy",
    () => {
        test("satisfying a condition", () =>
            expect(
                Patterns
                    .of(
                        [false, "some phrase"],
                        [() => false, "another phrase"],
                        [(target: string) => target.length > 5, returnOf(() => "yet another phrase")])
                    .firstSatisfiedBy("abcdef"))
                .toEqual("yet another phrase"));
        test("satisfying multiple conditions", () =>
            expect(
                patterns(
                    [false, "word"],
                    [() => true, "some phrase"],
                    [() => false, "another phrase"],
                    [(target: string) => target.length > 5, returnOf(() => "yet another phrase")])
                    .firstSatisfiedBy("abcdef"))
                .toEqual("some phrase"));
        test("not satisfied", () =>
            expect(
                patterns(
                    [false, "word"],
                    [() => false, "some phrase"],
                    [() => false, "another phrase"],
                    [(target: string) => target.length < 5, returnOf(() => "yet another phrase")])
                    .firstSatisfiedBy("abcdef"))
                .toBeUndefined());
        test("default", () =>
            expect(
                patterns(
                    [false, "word"],
                    [() => false, "some phrase"],
                    [() => false, "another phrase"],
                    [(target: string) => target.length < 5, returnOf(() => "yet another phrase")],
                    orElse("default phrase"))
                    .firstSatisfiedBy("abcdef"))
                .toEqual("default phrase"));
        test("no conditions", () =>
            expect(patterns().firstSatisfiedBy("abcdef"))
                .toBeUndefined());

    });

describe("patterns#allSatisfiedBy",
    () => {
        test("satisfying a condition", () =>
            expect(
                Patterns
                    .of(
                        [false, "some phrase"],
                        [() => false, "another phrase"],
                        [(target: string) => target.length > 5, returnOf(() => "yet another phrase")])
                    .allSatisfiedBy("abcdef"))
                .toEqual(expect.arrayContaining(["yet another phrase"])));
        test("satisfying multiple conditions", () =>
            expect(
                patterns(
                    [false, "word"],
                    [() => true, "some phrase"],
                    [() => false, "another phrase"],
                    [(target: string) => target.length > 5, returnOf(() => "yet another phrase")])
                    .allSatisfiedBy("abcdef"))
                .toEqual(expect.arrayContaining(["some phrase", "yet another phrase"])));
        test("not satisfied", () =>
            expect(
                patterns(
                    [false, "word"],
                    [() => false, "some phrase"],
                    [() => false, "another phrase"],
                    [(target: string) => target.length < 5, returnOf(() => "yet another phrase")])
                    .allSatisfiedBy("abcdef"))
                .toEqual(expect.arrayContaining([])));
        test("no conditions", () =>
            expect(patterns().allSatisfiedBy("abcdef"))
                .toEqual(expect.arrayContaining([])));
    }
)

describe("toApplicationTo",
    () => {
        test("application", () =>
            expect(
                [
                    (a: number): string => `${a + 1}`,
                    (a: number): string => `${a + 2}`,
                    (a: number): string => `${a + 3}`,
                    (a: number): string => `${a + 4}`,
                    (a: number): string => `${a + 5}`
                ]
                    .map(toApplicationTo(1)))
                .toEqual(expect.arrayContaining(["2", "3", "4", "5", "6"])));
    });