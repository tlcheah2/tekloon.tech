---
title: "How to Write Better-Organized Unit Test"
date: "2020-11-19"
tags:
  - javascript
---

This post discussed how I use [jest-in-case](https://github.com/atlassian/jest-in-case) library to write more organized tests. However, there is a pre-requisite to use this library you probably guess it right. 

If you're using Jest to write your test, then this post is probably going to be helpful to you.

## Problem Background

> I don't know about you, but lots of times when I write even slightly generic functions, I have lots of test cases that are basically the same test over and over with different values. - Jamie Kyle

The above statement resonates with me a lot especially when I started to face the situation where the unit tests code I wrote is triple or quadruple to my original code change. Even worst, most of the unit testing code is repetitive. 

Without further ado, let's look into the case study below.

## Case Study

The below function is a simple redirection function, where we will 

1. Check Transaction Status
2. Redirect User to Different Status page according to the transaction status

```jsx
/**
 * Payment Service Redirection
 * @param {Object} req - Express Request Object
 * @param {Object} res - Express Response Object
 */
exports.pspDepositRedirect = async (req, res) => {
  const { order_id } = req.query;

  const transaction = await findTransaction({ order_id });

  let redirectUrl = depositRedirectUrl.clientUrl;

  if (!transaction) {
    redirectUrl = redirectUrl.concat(depositRedirectUrl.failedUrlPath);
    return res.redirect(redirectUrl);
  }

  switch (transaction.status) {
    case STATUS.PENDING: {
      redirectUrl = redirectUrl.concat(depositRedirectUrl.pendingUrlPath);
      break;
    }
    case STATUS.APPROVED: {
      redirectUrl = redirectUrl.concat(depositRedirectUrl.successUrlPath);
      break;
    }
    case STATUS.FAILED:
    default: {
      redirectUrl = redirectUrl.concat(depositRedirectUrl.failedUrlPath);
      break;
    }
  }
  return res.redirect(redirectUrl);
};
```

Now let's try to write unit test for the above function. The typical Jest unit test for the above would look something like below.

```jsx
const faker = require('faker');
const transactionService = require('../../src/services/transactionService');

// Mocking transactionService
jest.mock('../../src/services/transactionService');

const mockRequest = args => ({
  ...args,
});

const mockResponse = () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(value => value),
    redirect: jest.fn(),
  };
  return res;
};

describe('pspDepositRedirect Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test('Successfully redirect to client deposit pending url', async () => {
    const orderId = faker.random.uuid();
    const req = mockRequest(
      { query: { order_id: orderId } },
    );
    const res = mockResponse();

    // Return transaction with pending stauts
    transactionService.findTransaction.mockResolvedValueOnce({
      status: STATUS.PENDING,
    });

    await pspDepositRedirect(req, res);

    const expectedRedirectUrl = `${depositRedirectUrl.clientUrl}${depositRedirectUrl.pendingUrlPath}`;
    expect(transactionService.findTransaction).toHaveBeenLastCalledWith({ order_id: orderId });
    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith(expectedRedirectUrl);
  });

  test('Successfully redirect to client deposit success url', async () => {
    const orderId = faker.random.uuid();
    const req = mockRequest(
      { query: { order_id: orderId } },
    );
    const res = mockResponse();

    // Return transaction with pending stauts
    transactionService.findTransaction.mockResolvedValueOnce({
      status: STATUS.APPROVED,
    });

    await pspDepositRedirect(req, res);

    const expectedRedirectUrl = `${depositRedirectUrl.clientUrl}${depositRedirectUrl.successUrlPath}`;
    expect(transactionService.findTransaction).toHaveBeenLastCalledWith({ order_id: orderId });
    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith(expectedRedirectUrl);
  });

  test('Successfully redirect to client deposit failed url', async () => {
    const orderId = faker.random.uuid();
    const req = mockRequest(
      { query: { order_id: orderId } },
    );
    const res = mockResponse();

    // Return transaction with pending stauts
    transactionService.findTransaction.mockResolvedValueOnce({
      status: STATUS.FAILED,
    });

    await pspDepositRedirect(req, res);

    const expectedRedirectUrl = `${depositRedirectUrl.clientUrl}${depositRedirectUrl.failedUrlPath}`;
    expect(transactionService.findTransaction).toHaveBeenLastCalledWith({ order_id: orderId });
    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith(expectedRedirectUrl);
  });
  
  test('Successfully redirect to client deposit failed url if transaction not found', async () => {
    const orderId = faker.random.uuid();
    const req = mockRequest(
      { query: { order_id: orderId } },
    );
    const res = mockResponse();

    // Return transaction with pending stauts
    transactionService.findTransaction.mockResolvedValueOnce(null);

    await pspDepositRedirect(req, res);

    const expectedRedirectUrl = `${depositRedirectUrl.clientUrl}${depositRedirectUrl.failedUrlPath}`;
    expect(transactionService.findTransaction).toHaveBeenLastCalledWith({ order_id: orderId });
    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith(expectedRedirectUrl);
  });
});
```

We wrote 4 test cases above to cover the following scenarios:

- Redirected to Deposit Pending Url when transaction status is "pending"
- Redirected to Deposit Success Url when transaction status is "approved"
- Redirected to Deposit Failed Url when transaction status is "failed"
- Redirected to Deposit Failed Url when transaction status is "failed"

From the above test cases, we realized all test cases have very close and similar code to each other. The only difference is

What are the problems for the above test cases?

- **Hard to maintain.** Given a simple example, If I am going to rename the ****`findTransaction` ****function to ****`findTansactions` ****, I probably have to find all lines with transactionService.findTransaction & update each test case.
- **Boring & Unproductive**. When you have to write so many test case scenario and repeat the same code base, it bored you out and made you less likely to write them and ultimately it is not productive.

### Write Test Case using jest-in-case

Now let's write the test case for the similar scenario we tested above using library `jest-in-case`.

```jsx
const faker = require('faker');
const cases = require('jest-in-case');
const transactionService = require('../../src/services/transactionService');

// Mocking transactionService
jest.mock('../../src/services/transactionService');

const mockRequest = args => ({
  ...args,
});

const mockResponse = () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(value => value),
    redirect: jest.fn(),
  };
  return res;
};

cases('pspDepositRedirect Test', async ({ expectedRedirectUrl, transaction }) => {
  const order_id = faker.random.uuid();
  const req = mockRequest(
    { query: { order_id } },
  );
  const res = mockResponse();

  // Return transaction with pending stauts
  transactionService.findTransaction.mockResolvedValueOnce(transaction);

  await pspDepositRedirect(req, res);

  expect(transactionService.findTransaction).toHaveBeenLastCalledWith({ order_id });
  expect(res.redirect).toHaveBeenCalledTimes(1);
  expect(res.redirect).toHaveBeenCalledWith(expectedRedirectUrl);
}, {
  'Successfully redirect to client deposit pending url': {
    transaction: { status: STATUS.PENDING },
    expectedRedirectUrl: `${depositRedirectUrl.clientUrl}${depositRedirectUrl.pendingUrlPath}`,
  },
  'Successfully redirect to client deposit success url': {
    transaction: { status: STATUS.APPROVED },
    expectedRedirectUrl: `${depositRedirectUrl.clientUrl}${depositRedirectUrl.successUrlPath}`,
  },
  'Successfully redirect to client deposit failed url': {
    transaction: { status: STATUS.FAILED },
    expectedRedirectUrl: `${depositRedirectUrl.membersAreaUrl}${depositRedirectUrl.failedUrlPath}`,
  },
  'Successfully redirect to client deposit failed url': {
    transaction: null,
    expectedRedirectUrl: `${depositRedirectUrl.membersAreaUrl}${depositRedirectUrl.failedUrlPath}`,
  },
});
```

Leveraging `jest-in-case` , I only have to write the test cases logic once and provide different input and expected result via the options. The test cases end up **2X lesser code**, cleaner & more readable. More importantly, it made developers more easy to maintain the test cases.

## Conclusion

From this article, we knew that `jest-in-case` is a good library that enables us:  

- Write cleaner and shorter test case. This also improve the productivity in writing test case.
- It is extremely useful when your test case have multiple scenarios based on the varies input.

## References

- jest-in-case [Github](https://github.com/atlassian/jest-in-case)
- James Kyle [website](https://jamie.build/jest-in-case.html) 
