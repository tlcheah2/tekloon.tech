---
title: 'Everything You Need to Know About Nullish Coeslacing Operator in Node.js'
date: '2023-03-05'
tags:
  - javascript
  - js-advanced
---

## What is the Nullish Coalescing Operator?

It is a binary operator that returns its right-hand side operand if its left-hand side operand is nullish. (What exactly this means?)

Let’s take a look at the example below.

```js
const text = null ?? 'I Love JS';
console.log(text); // Output: "I Love JS"
```

In short, it uses the default value that you declare on the right-hand side if the value on the left-hand side is nullish. The term nullish here refer to `null` and `undefined`.

## How Nullish Coalescing Different from Logical OR Operator?

At this point, you may be wondering what is the difference between nullish coeslacing and Logical OR operator. I have the same question in my mind when I first encountered this. For example:

```js
const text = null || 'I Love JS';
console.log(text); // Output: "I Love JS"
```

The above code generates the same output as the one using ??.

The difference between both of them is how they handle the falsy value such as:

```js
const text1 = undefined ?? 'I Love JS'; // Output: "I Love JS"
const text2 = null ?? 'I Love JS'; // Output: "I Love JS"
const text3 = false ?? 'I Love JS'; // Output: false
const text4 = 0 ?? 'I Love JS'; // Output: 0

const textA = undefined || 'I Love JS'; // Output: "I Love JS"
const textB = null || 'I Love JS'; // Output: "I Love JS"
const textC = false || 'I Love JS'; // Output: "I Love JS"
const textD = 0 || 'I Love JS'; // Output: "I Love JS"
```

From the above example, you will notice that using the logical OR operator, you will still get the default value if the left-operand is

- 0 and
- false

I hope this article does help you understand the difference between these two operators and that you will confidently use them for your use case after reading this article.

Thanks for reading.
