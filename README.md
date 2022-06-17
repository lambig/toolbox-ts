[![Build Status](https://app.travis-ci.com/lambig/toolbox-ts.svg?token=rcXQxJszfB4WCpwsWNgN&branch=main)](https://app.travis-ci.com/lambig/toolbox-ts)
# toolbox-ts
## all / any / none / notAll

Very simple functions to express logical evaluations.
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
