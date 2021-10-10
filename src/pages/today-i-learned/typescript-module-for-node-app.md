---
title: "What Typescript Module Configuration for NodeJS App"
date: "2021-10-10"
tags:
  - typescript
  - nodejs
---

Today I will be sharing something I learned about `module` config when compiling typescript for NodeJS App.

Before we start, let's have a bit of context. When we want to compile the Typescript code into Javascript code, we normally have:

- Our typescript code base - files that end with `.ts`.
- Our typescript compiler configuration - normally we have this define in `tsconfig.json` or we could also define it in CLI when running `tsc` command.

Let say we have the initial `tsconfig.json` which looks like below.

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "target": "ES2017"
  },
  "include": ["src"]
}
```

Below is the example typscript code and we will compile the typescript code with the above configuration.

```ts
// index.ts
export function addNumber(a: number, b: number) {
  return a + b
}

console.log(addNumber(1, 2))
```

And, here is the compiled code of above ts code. It would look like something below:

```js
// index.js
export function addNumber(a, b) {
  return a + b
}
console.log(addNumber(1, 2))
```

If we run the above code with `node index.js`, you would get the below error.

> export function addNumber(a, b) {
> ^^^^^^
> SyntaxError: Unexpected token export

This is because Node project is using CommonJS module system. Below are the ways that we normally use to export function is NodeJS app.

```js
exports.addumber = (a, b) => {
  return a + b
}

// OR
const addumber = (a, b) => {
  return a + b
}

module.exports = { addNumber }
```

Both ways works perfectly fine in NodeJS.

## How to Resolve The Problem?

So how could we resolve the above situation without changing the codebase?`export` is something we would like to adopt in modern Javascript and we do not want to sacrifice this.

We can define `module` to `CommonJS` in `tsconfig.json`, this will helps us to compile the code to the way that NodeJS recognized.

Here is the sample of `tsconfig.json`.

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "target": "ES2017",
    "module": "CommonJS"
  },
  "include": ["src"]
}
```

The compiled code would look something like this:

```js
// index.js with module "CommonJS"
"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.addNumber = void 0
function addNumber(a, b) {
  return a + b
}
exports.addNumber = addNumber
console.log(addNumber(1, 2))
```

> Something worth to mention here is that if your `target` is set to `ES5` or `ES3`, the default value for module is `CommonJS`. So you don't have to explicitly set the module in this scenario. However, knowing why, when and how to explicitly set the configuration is crucial too, because that means you know what you are doing

That's all and thanks for reading. I hope it helps you.

## References

- Mike North Typescript Fundamental [course](https://www.typescript-training.com/course/fundamentals-v3)
- Official Typescript module [documentation](https://www.typescriptlang.org/tsconfig#module)
