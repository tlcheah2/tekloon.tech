---
title: "Writing Unit Test for Joi Schema Validation"
date: "2020-05-21"
tags:
  - javascript
---

<figure>

![A macbook with a plant](https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)

<figcaption>
Photo by <a href="https://unsplash.com/@codestorm">Safar Safarov</a> on Unsplash
</figcaption>

</figure>

I am using Joi Schema for Express Request Body Validation in one of my projects. So, I was writing Unit Test for Joi Schema middleware validation yesterday and I think it's good to document this down.

I created a sample Express project where we have a `POST` endpoint to create a journal for a book (where we journal down our learning for a book after we read it).

```
router.post('journal', bodyValidator(createJournalSchema), journalController.journal);
```

## What's bodyValidator do?

Body Validator basically validate the `req.body` to ensure all the required fields is provided before we proceed.

```
// requestValidator.js
/**
 * Validate body request
 * @param {Object} schema - Joi object schema
 */
const bodyValidator = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ error: errorMessages });
    }
    return next();
};
```

## Unit Testing for Joi Schema

According to the `bodyValidator` above, I designed 2 unit tests. 

1. Expect `Bad Request` (statusCode 400) return when the validation failed.
2. Expect Next Middleware to be called if the validation passed.

```
test('Return 400 when the create journal schema validation is failed', () => {
    const req = mockRequest({
        bookId: 1,
    });
    const res = mockResponse();
    const next = mockNext();
    bodyValidator(createJournalSchema)(req, res, next);
    // Expect status 400 bad request called if there is error
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(0);
});

test('Next middleware is called when the create journal schema validation is successful', () => {
    const req = mockRequest({
        bookId: 1,
        journal: 'This is the summary of my reading today...'
    });
    const res = mockResponse();
    const next = mockNext();
    bodyValidator(createJournalSchema)(req, res, next);
    // Expect next middleware called if validation is passed
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
});
```

In addition, you can also write more detailed unit tests where covered the invalid data type. For e.g, you can try changing `bookId` to '1' and expect validation failed which is not covered in this post.

Full source code can be found [here](https://github.com/tlcheah2/book-journal-backend).

Thanks for reading.



