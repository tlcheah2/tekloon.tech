---
title: "You Need to Write Effective Unit Test"
date: "2020-09-22"
tags:
  - nodejs

---

Writing Unit Tests has become a daily task for a software engineer. There are several purposes of writing unit test:

- **Better Product Experience & Quality**. Companies want to launch products with lesser issues.
- **Time-Saving**. Ensure the developed enhancement work as expected, reduce the **Ding-Dong game** so we can reduce the bug-fixing time that operation time. For e.g, QA -> Dev -> QA ->Dev ->QA -> Deployment.
- **Improve the Engineer’s confidence**. If you write unit tests, you would probably gain more confidence along the process for anything you developed and released.

Since unit tests lead to so many benefits, but why there are possibilities for things go wrong. For e.g,

> Manager: Hi Tek Loon, there are some issues in the ticket you worked yesterday. Can you please have a look?
>
> Me: Sure. Will look into it. 
>
> Me (Talking to myself) : All unit tests passed yesterday. Why there are still issues raised?

Did this situation sound familiar to you? It did happen to me quite some times.

Thus, I decided to found out what I can do better in order to reduce this situation and improve my productivity.

## Writing Effective Test

Turned out the unit test I wrote was not effective at all. To be accurate, the unit tests that I wrote were not specific enough. Let's look at some examples below.

Imagine that we have a file named `clientController` . There is a `getClient` function where we can retrieve client information.

```javascript
// clientController.js
exports.getClient = async (req, res, next) => {
  try {
    // Find Client from MongoDB
  	const clientData = await Client.findOne({ client_id: req.user.user_id });
    // Return 
    if (clientData) {
      console.log('Return client:', clientData);
      return res.status(200).json({ data: clientData });
    }
    console.error('Client Not Found');
    return res.status(401).json({ errors: ['Client Not Found'] });
  } catch (error) {
    return next(error);
  }
};
```

### Normal Simple Test Case I wrote for Controller

Below is the simple test case I will wrote to test the `getClient` function.

```javascript
test('Return 200 when successfully received client information', async () => {
    const req = mockRequest(null, { user: { user_id: 1 } });
    const res = mockResponse();
    const next = mockNext();
    await clientController.getClient(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
});
```

The above test case was passed. However, this test case wasn't **effective** because it is not **specific** enough. I have just validated

- We validate that `res.json` to be called. But I never know what does it returned. Is the correct client information returned?

Thus, what needs to be specific over here then?

- Expect the **returning client information is correct**.

A more specific unit test would look like this.

#### Better Unit Test (More Specific)

```javascript
test('Return 200 when successfully received client information', async () => {
  const req = mockRequest(null, { user: { user_id: 1 } });
  const res = mockResponse();
  const next = mockNext();
  await clientController.getClient(req, res, next);
  
  const expectedResult = Client.findOne({ client_id: req.user.user_id });

  expect(res.status).toHaveBeenCalledWith(200);
  // Now we ensure res.json only have been called once
  expect(res.json).toHaveBeenCalledTimes(1);
  // Now we ensure the res.json is returning object with data, and data contain the client information
  expect(res.json).toHaveBeenCalledWith({ data: expectedResult });
});
```

With 2 more lines of code. now the unit test was handled more specific and it is an effective unit test.

## Conclusion

Here are the key points of this article.

- Writing unit tests are not sufficient, you need to write effective unit tests.
- Effective unit tests always contributed by specificity. Which means the more specific result you expect, the more effective and accurate your unit tests.

Thank you for reading. See you in the next article.