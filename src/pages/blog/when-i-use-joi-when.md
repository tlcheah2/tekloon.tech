---
title: "How to Use Joi.when() to Write Strict Validation"
date: "2020-05-25"
tags:
  - javascript
  - nodejs
---

This is another <a href="https://github.com/hapijs/joi" target="_blank">Joi</a> related post and documented down when I use `Joi.when()`.

The scenario that I always come across is 

> When you designing your API schema, certain field requirement are highly dependent on another field.

For example, there are 2 types of user, `teacher` and `student`. In the API schema, the `employeeId` only required when the userType is `teacher`. 

```js
{
    userType: 'teacher', // Should be teacher or student
    employeeId: 1 // Only available when userType is teacher
}
```

## 2 types of validation

There are 2 types of validation we can do over here. I called it `soft validation` and `strict validation`.

### Soft Validation

We can write our schema as below if we go for soft validation.

```js
const schema = Joi.object({
    userType: Joi.string().required(),
    employeeId: Joi.number().optional(),
});
```

In the above code, we declare the `employeeId` is an optional field. 

However, this soft validation does not tell the API caller they're passing in the wrong information. They could still pass the `employeeId` even when the userType is `student`.

Thus, I suggest using strict validation instead.

### Strict Validation

We can write our schema as below if we go for strict validation.

```js
const schema = Joi.object({
    userType: Joi.string().valid(['student', 'teacher']).required(),
    employeeId: Joi.when('userType', {
        is: 'teacher',
        then: Joi.number().required(),
        otherwise: Joi.forbidden(),
    }),
});
```

With the schema above, we perform a stricter validation which include: 

- Only `student` and `teacher` allowed for `userType`. 
- `employeeId` field is forbidden when userType is `student`.

## Conclusion

With the strict validation approach, developers have a much clearer expectation of each field. 

Thanks for reading.