---
title: "Using Custom Property in CSS"
date: "2021-09-29"
tags:
  - css
---

Today I learned How to Set Custom Property in CSS.

## Why? (The Motivation Behind)

Custom Property in CSS basically allows us to do something like variable assignment in programming. For e.g, `const price = 10.00`, so now you could re-use price to wherever part of your code.

Having this in your CSS is really a game-changer and make your CSS more **maintainable**. You could easily change your website theme by just changing the color code of your property.

The best & most frequently use case for this is `color`.

Let's see real code example below.

## How?

I am defining several color properties within the `body` selector. This is because you will be able to use the defined properties for all the children within `body`.

In the below example, I am defining 3 color properties and used them in other css classes:

- primaryColor
- accentColor
- textTitle

Custom property starts with `--` and we use `var()` to retrieve the value of custom property.

```css
body {
  margin: 0;
  --primaryColor: #ffffff;
  --accentColor: tomato;
  --textTitle: black;
  background-color: var(--primaryColor);
}

.btn-primary {
  background-color: var(--accentColor);
}

.btn-login {
  background-color: var(--primaryColor);
}
```
