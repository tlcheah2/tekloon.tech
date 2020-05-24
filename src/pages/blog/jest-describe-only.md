---
title: "How I Use .only from Jest"
date: "2020-05-24"
tags:
  - javascript
---

## Problem Background

Have you ever trying to develop new enhancement for a huge module and there is 1 test file for that module?

This single test file have multiple `describe` block and test cases. However, you might just want to run the individual test suite that you're working on. But since all the test cases lie within the same file, you will have to execute all the irrelevant test case to your feature when execute your unit test.

You can get the idea at the code below.

```
payController.test.js
desribe('Apple Pay Integration Test', () => {
    // 5 test case
});

desribe('Stripe Integration Test', () => {
    // 5 test case
});

desribe('GPay Integration Test', () => {
    // 5 test case
});

// This is where we write our new enhancement unit test
describe('New Integration Test', () => {
});
```

Every time I want to test my new enhancement, I would need to run the prior 15 test case that queue in front.

## Solution

Use `describe.only` to run the particular `describe` block. Or, you could use `test.only` to run an individual test case.

For e.g, I could run my particular test case only. The 3 `describe` blocks without `.only` would be skipped. Refer the code below.

```
payController.test.js
desribe('Apple Pay Integration Test', () => {
    // 5 test case
});

desribe('Stripe Integration Test', () => {
    // 5 test case
});

desribe('GPay Integration Test', () => {
    // 5 test case
});

// Only this describe block will be run, the others describe block without .only will be skipped. 
describe.only('New Integration Test', () => {
    test('Return success', () => {})

    // Only this test case will run
    test.only('Return success', () => {})
});
```

## Conclusion 

In short, we can simply just run our test cases during development using `.only`.
