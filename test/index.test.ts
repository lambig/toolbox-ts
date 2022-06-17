import { notNull, all, any, notAll, none } from "../src/index"


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