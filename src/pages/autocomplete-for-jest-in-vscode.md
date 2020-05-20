---
title: "Add Autocomplete for Jest in VS Code"
date: "2020-05-20"
tags:
  - javascript
---
<figure>

![A man with hood](https://images.unsplash.com/photo-1583139927896-012a0534cfe9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)

<figcaption>
Photo by <a href="https://unsplash.com/@aminmoshrefi">Amin Moshrefi</a> on Unsplash
</figcaption>

</figure>

## Problem Background

I am writing unit tests for my Node application using Jest. However, I encountered an issue which is the VsCode Intellisense (code autocomplete) is not working.

Referring to the documentation is pretty troublesome and not productive too.

So, how do I get my VSCode Intellisense for Jest?

## Solution

The solution turned out seems to be pretty easy after read through the Github issue.

We just have to install the `@types/jest` as our development dependencies.

```
npm i -D @types/jest
```

Happy coding. 😃😃😃

## References

- Jest Community Github [Issue](https://github.com/jest-community/vscode-jest/issues/440)