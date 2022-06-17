[![Build Status](https://app.travis-ci.com/lambig/toolbox-ts.svg?token=rcXQxJszfB4WCpwsWNgN&branch=main)](https://app.travis-ci.com/lambig/toolbox-ts)
# toolbox-ts
## all / any / none / notAll

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
)) // false
```
