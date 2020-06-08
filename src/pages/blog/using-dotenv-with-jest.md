---
title: "How to Setup dotenv with Jest Testing - In-depth Explanation"
date: "2020-06-08"
tags:
  - javascript
  - nodejs
---

When I am writing unit test for my Nodejs Express project, I realized the configuration I needed is not loaded as environment variables, which we usually access via `process.env.VARIABLE_NAME`.

I started out by writing `require('dotenv').config()` on the first line of the test file before all the tests started.

## Disadvantages for this Approach.

There are several disadvantages when using this approach:

- Painful as you always have to remember to write this at your first line of the test file. 

- Redundant effort.

## Can We Setup It Once Globally Before Running the Test?

Turned out this question came through my mind.

> Can I Load the Environment Variable Before I Run All the Test?

Lastly, I found out I can achieve this using `setupFiles` in the Jest configuration.

### Step by Step Guide

1. Firstly, create `jest.config.js` at your project directory.

2. Add the following code into your `jest.config.js`.

    ```js
    module.exports = {
        setupFiles: [
            'dotenv/config'
        ],
    }
    ```

3. Running Jest Test now can read all your environment variable without writing `require('dotenv').config()` in each of the test file.

That's all you need to load the environment variable before you run your test. We will have  an in-depth explanation of how the `setupFiles` work at next section.

## In-depth Explanation on Jest config 'setupFiles'

Prior before we running every test file, we will be running all the path that declare in `setupFiles`. 

In this example, we are equivalent doing `require('dotenv/config')`. This is equivalent to doing `require('dotenv').config()`.

Thus, we're running the same function. Ultimately, I think dotenv library provide multiple ways to expose their APIs to handle different needs.

For complete source code on how I set it up, you can refer to this [branch](https://github.com/tlcheah2/book-journal-backend/tree/jest-using-dotenv).

## References

- [Using dotenv with Jest](https://medium.com/@lusbuab/using-dotenv-with-jest-7e735b34e55f)




