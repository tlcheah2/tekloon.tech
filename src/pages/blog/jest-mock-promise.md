---
title: "How to Mock Promise using Jest"
date: "2020-05-28"
tags:
  - javascript
  - nodejs
---

This post documented down how I use Jest to mock a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">promise</a>.

The scenario that I always come across is 

> When I want to test this functionA(), functionB() is called within functionA() and highly dependent to the return value of functionB(). This is the point where Mocking comes in.

What we want to achieve here is whether `functionA()` behave like expected. Thus, we can mock the return value of `functionB()`.

There are 2 scenario we can mock for `functionB()`. 

- Mock the successful return from `functionB()`.

- Mock error throw from `functionB()`.

In this post, we will be focus on mocking promise instead.

## Mocking Promise 

Let's imagine a scenario where you have 2 files, `payController.js` and `payService.js`. You are required to write 

```js
// payService.js
// Returning Promise
exports.initiateApplePayment = async () => {
};
```

```js
// payController.js
exports.createApplePayRequest = async () => {
  const result = payService.initiateApplePayment();
  // ....... the remaining code
};
```
When we're writing unit test for `createApplePayRequest()`, we can actually mock the return result for function `initiateApplePayment()`.

We can use `mockResolvedValue()` in order to mock promise that is fulfilled and returning value.

While for mocking promise that is rejected, we can use `mockRejectedValue()`.

Refer to the example test below for more details.

```js
payController.test.js
// Import payService.js
const payService = require('../../src/services/payService');

// Mocking the file allow you to setup mock for all function within this file.
jest.mock('../../src/services/payService');

describe('Pay Controller Test', () => {
  test('Create apple pay request successfully', () => {
    // Mock Fulfilled promise that returning value
    payService.initiateApplePayment.mockResolvedValue({ status: 'Successful', paymentId: 'randomAlphaNumeric' });

    const result = await payController.createApplePayRequest();
    expect(result).toEqual({ status: 'Successful', paymentId: 'randomAlphaNumeric' });
  });

  test('Create Apple Pay Request Failed', async (done) => {
    const expectedError = new Error('Failed to connect to ApplePay');
    payService.initiateApplePayment.mockRejectedValue(expectedError);

    try {
      await payController.createApplePayRequest();
    } catch (err) {
      // Since the initiateApplePayment() is rejected, we will get the error in catch block
      expect(err.message).toBe(expectedError.message);
      done();
    }
  });
})
```

## Conclusion

In short, 3 simple steps to mock promise using Jest.

1. Import the desired mock js module into your test file using `require()`.

2. Using `jest.mock('js-filepath')` to enable you to setup mocking for all functions within that module.

3. Using `mockResolvedValue()` to mock fulfilled promise and `mockRejectedValue()` for rejected promise. 