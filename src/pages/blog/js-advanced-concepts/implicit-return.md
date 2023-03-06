---
title: 'What, Why and When to Use Implicit Return in Javascript?'
date: '2023-03-06'
tags:
  - javascript
  - js-advanced
---

## What is Implicit Return?

In short, implicit return is returning the value without using the `return` keyword. With the introduction of arrow functions in ES6, implicit return were made available as well.

Here is the example of function with implicit return:

```js
const getOrderId = () => 'Order-1';
```

The `getOrderId()` function above returns a string of `Order-1` without using the `return` keyword.

## Why Should I Use It?

Now the intention is matter here. Why would I want to use implicit return when I can just do a normal return?

The purpose here is to reduce noise from your code. After reducing noise, the code would be much more concise and readable.

### Example

Let's see the example below without implicit return.

```js
// Create proxy middleware for ExpressJS app
function createProxyMiddleware(proxyUrl) {
  return function proxy(req, res, next) {
    return 'Redirected';
  };
}
// Route user path endpoint to user service
app.use('/users', createProxyMiddleware('https://user.service.com'));
```

Now let's rewrite it with arrow function and implicit return.

```js
// Create proxy middleware for ExpressJS app
const createProxyMiddleware = (proxyUrl) = (req, res, next) => 'Redirected');
// Route user path endpoint to user service
app.use('/users', createProxyMiddleware('https://user.service.com'));
```

Now, isn't the rewrite look much more concise and cleaner?

## When Should I use Implicit Return

You should use it whenever it is possible. But it is ideal for the scenario when you writing a closure and higher-order function like the example above.

By now, you should already know the `what`, `why` and `when` of implicit return in Javascript.

Thanks for reading and see you in the next one.
