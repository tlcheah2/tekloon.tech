---
title: "Good time to use Promise.all()"
date: "2021-09-30"
tags:
  - javascript
---

Today I will talk about good time to use `Promise.all()`.

## Why? (The Motivation Behind)

As you might have known, we could use `Promise.all()` to run multiple async operations concurrently. Let me elaborate some characteristics about `Promise.all`:

- We will only get response(callback) when all the async operations finished (whether success or failed).
- We could group several async operation and have them run concurrently and only proceed when all of them completed.

The above points leads to:

- **Better Performance** since we could them concurrently
- **Better Grouping** of Logic. When we could group several async operations related with each otherm, it will look cleaner and easier to understand from the code as well.

Next, we will real code example on how some good time to use `Promise.all`

## How?

Below scenario is a series of validation to check when sending withdrawal request to backed and we need to query database to get this information.

👎 example. This example was not optimized because we get the balance 1st, then only proceed to retrieve the conversion rate.

```js
// Check has balance
const balance = await transactionService.getBalance()
// Get conversion rates
const conversionRate = await conversionRatesService.getConversionRates()
```

👍 example. Good example is we could optimized them and call them concurrently.

```js
// Check has balance
const [balance, conversionRate] = await Promise.all([
  transactionService.getBalance(),
  conversionRatesService.getConversionRates(),
])
```
