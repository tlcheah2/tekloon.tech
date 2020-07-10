---
title: "How To Test Non-Export Function in Javascript"
date: "2020-07-10"
tags:
  - javascript
  - nodejs

---

This post explained how to test non-export functions in Javascript with [Rewire](https://github.com/jhnns/rewire) and why you shouldn’t export every function using the House Metaphor.

## Problem Background

Before I go into the problem that I encountered, what is Non-Export Function actually? 

Non-Export function is the internal function that is only accessible within that `.js` file. Refer to the code sample below.

```javascript
// payment.js
const calculateConversionRate = (amount, rate) => {
  return amount * rate;
};

const makePayment = () => {
  // Business logic ......
  const amountToPaid = calculateConversionRate(amount, rate);
  // Continue business logic .....
};

module.exports = {
  makePayment,
}

```

You might familiar with such code. `calculateConversionRate` is the function where we used internally only. Thus, writing unit test for `calculateConversionRate()`  is difficult since we cannot access it. 

## The House Metaphor 

However, there is also a quick way to resolve this where we can just export `calculateConversionRate` and now we can access this function and write unit tests for it.

I used to take this approach as well. Although it is a quick way, but it is an unthoughtful act. In `payment.js`, what we wish to expose is `makePayment` function. Instead, with the purpose of unit testing, we choose to expose all functions.

Let’s use the house metaphor to explain this. If you have a house and you build the main gate/entrance, that’s what you want people to choose to enter your house. Would you want people to enter your house via roof, windows, backyard and etc?

> Export the function that which is not intended to be used externally is exactly like sticking the "Welcome" sticker on the window and roof.

This is also known as encapsulation in Computer Science. You’re wrapping the internal function and prevent it from access by any other module.

Now, you spot a glimpse of why this is not recommended, let’s explore other possibilities.

## Recommended Solution

Although Rewire was introduced as the easy monkey patching for unit tests library. However, this library also good to use to test non-export functions.

```javascript
// payment.test.js
const rewire = require('rewire');

const payment = rewire('../src/payment.js');
const calculateConversionRate = payment.__get__('calculateConversionRate');

test('Calculate Conversion Rate return correct rate', () => {
  const amount = 100;
  const rate = 4.1;
  const expectedResult = amount * rate;
  expect(calculateConversionRate(amount, rate)).toBe(expectedResult);
});

```

Using the rewire library, we can write unit tests for our non-export function without violating the encapsulation pattern in Computer Science.

## Conclusion

Here are the key points of this article.

- Exporting all functions is a bad idea. It's like you're sticking Welcome sticker on your roof, windows, backyard and etc. 
- Discussed how we can leverage the [Rewire](https://github.com/jhnns/rewire) library to test non-export functions easily.

Thank you for reading. See you in the next article.

## References

- [Stack Overflow](https://stackoverflow.com/questions/14874208/how-to-access-and-test-an-internal-non-exports-function-in-a-node-js-module)



