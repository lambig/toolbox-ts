[![Build Status](https://app.travis-ci.com/lambig/toolbox-ts.svg?token=rcXQxJszfB4WCpwsWNgN&branch=main)](https://app.travis-ci.com/lambig/toolbox-ts)
# toolbox-ts
## all / any / none / notAll

Very simple functions to express logical evaluations.  
Evaluates boolean or function that returns boolean.

### usage
```
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
)) // true
```
Not only variable arguments but also arrays can be evaluated.
```
all([
    true,
    any([
        () => false,
        notAll(true, () => false)
    ]),
    none(
        false,
        () => true
    ])
)) // false
```
Short-circuit evaluation is used.
```
notAll(
    true,
    false,
    () => { throw new Error("unexpected evaluation"); }
)) // true
```

## Patterns

Makes conditions/values easy to be expressed in patterns.  
(NOTE: This is probably the next best thing, as a proper separation of concern should make implementation more concise. )

### Condition
- boolean
- function returns boolean (Proposition)
- function evaluates argument (Predicate)

### Value
- value
- function returns value (Supplier)

### usage

You can get value of the first pattern which satisfied by given value (or an undefined).
```
Patterns
    .of(
        [false, "some phrase"],
        [() => false, "another phrase"],
        [(target: string) => target.length > 5, returnOf(() => "yet another phrase")])
    .firstSatisfiedBy("abcdef")); // "yet another phrase"
```

You can define default value or its Supplier.
```
patterns(
    [false, "word"],
    [() => false, "some phrase"],
    [() => false, "another phrase"],
    [(target: string) => target.length < 5, returnOf(() => "yet another phrase")],
    orElse("default phrase"))
    .firstSatisfiedBy("abcdef")); // "default phrase"
```

Also, you can collect all values of the patterns which satisfied by given value as an array.
```
patterns(
    [false, "word"],
    [() => true, "some phrase"],
    [() => false, "another phrase"],
    [(target: string) => target.length > 5, returnOf(() => "yet another phrase")])
    .allSatisfiedBy("abcdef")) // ["some phrase", "yet another phrase"]
```

## toApplicationTo
```
[
    (a: number): string => `${a + 1}`,
    (a: number): string => `${a + 2}`,
    (a: number): string => `${a + 3}`,
    (a: number): string => `${a + 4}`,
    (a: number): string => `${a + 5}`
]
    .map(toApplicationTo(1)) // ["2", "3", "4", "5", "6"]
```
