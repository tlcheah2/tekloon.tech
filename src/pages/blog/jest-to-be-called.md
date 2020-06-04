---
title: "How Jest: toHaveBeenCalled() Work?"
date: "2020-06-04"
tags:
  - javascript
  - nodejs
---

This post documented down my discovery about Jest Matchers `toHaveBeenCalled()` function.

Before we go into the details of my discovery. Let's see how this function normally used.

## Example Usage of `toHaveBeenCalled()`

In the code below, `funcB()` is calling `funcA()`. When we write unit test for `funcB()`, we would need to ensure funcA is called as well. 

```js
// funcA.js
const funcA = () => {
    console.log('Calling Function A');
};

module.exports = {
    funcA,
}
```

```js
const { funcA } = require('./funcB);

const funcB = () => {
    funcA();
};

module.exports = {
    funcB,
}
```

Here is the example of the unit test. In the unit test below. We're using `toHaveBeenCalled()` to ensure `funcA()` was executed when we're calling `funcB()`.

```js
// funcB.test.js
const fA = require('../../src/utils/funcA');
// Must override with mocking 1st before import functionB
fA.funcA = jest.fn();
const { funcB } = require('../../src/utils/funcB');

test('funcA() is called', () => {
    funcB();
    expect(fA.funcA).toHaveBeenCalled();
});
```

## How Jest Actually Check Whether the Function Was Called?

Have you ever wonder how Jest actually determine your function was called? 

After you created the mock function using `jest.fn`, try to do `console.log(fA.funcA.mock)` and you will see the following outcome.

**Jest Mocking Object**
```json
{ calls: [], instances: [], invocationCallOrder: [], results: [] }
```

Whenever you called `funcA`, a new array will be created and push into `calls`. Thus, after you executed `funcB()`, you will be able to see there is new array inserted into `calls` array.

For e.g,

```js
{ calls: [ [] ] }
```

The length of `calls` turn from 0 to 1.  

### Checking calls array length

Checking whether `toHaveBeenCalled()` is passed is simpler than you think. 

Jest will leverage the length of `calls` to determine whether this function was called.

Refer to the [source code](https://github.com/facebook/jest/blob/4a59daa8715bde6a1b085ff7f4140f3a337045aa/packages/expect/src/spyMatchers.ts) `createToBeCalledMatcher` function in Github, we will be able to see this line of code.

```js
// From Jest
const count = receivedIsSpy
      ? received.calls.count()
      : received.mock.calls.length;
const calls = receivedIsSpy
    ? received.calls.all().map((x: any) => x.args)
    : received.mock.calls;
const pass = count > 0;
```

## Conclusion 

In this post, we discussed the detail implementation on `toHaveBeenCalled()` in Jest. I hope you now have better understanding on Jest `toHaveBeenCalled` function.


