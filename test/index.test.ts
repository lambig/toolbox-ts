import { notNull, all, any } from "../src/index"


describe(
    "notNull",
    () => {
        test("target is specified", () => expect(notNull(1)).toBeTruthy())
        test("target is undefined", () => expect(notNull(undefined)).toBeTruthy())
        test("target is null", () => expect(notNull(null)).toBeFalsy())
    },
)

describe(
    "all",
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
    }
)

describe(
    "any",
    () => {
        describe(
            "boolean",
            () => {
                test("empty", () => expect(any([])).toBeFalsy())
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
    }
)