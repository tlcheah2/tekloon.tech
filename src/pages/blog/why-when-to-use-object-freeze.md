---
title: "Why & When You Should Use Object.freeze()"
date: "2020-05-12"
tags:
  - javascript
  - nodejs
---

![Macbook with Mug and Table Lamp](https://images.unsplash.com/photo-1526040652367-ac003a0475fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)

I want to share with you guys how I use `Object.freeze()`. This post breaks into two parts, why I use it and when I use it?

## Why I Use It?

If you familiar with Javascript, especially [ES6](http://es6-features.org/#Constants). You probably know that we can make an immutable variable using `const`. 

However, using `const` will not work if your variable is an object or array since your object itself can still be altered.

Given the example below, the `username` within mysqlConfig object is altered.

```
const mysqlConfig = {
    username: 'test',
    password: 'test',
};

mysqlConfig.username = 'handsome';

console.log(mysqlConfig); // Output { username: 'handsome', password: 'test };
```

Thus, it will be frustrating and hard-to-debug when your code is overridden somewhere. In addition, we also shouldn't spend our time solving this kind of issue. Luckily, `Object.freeze()` come to help.

With the example below, using `Object.freeze()` will prevent any new key to be added, existing properties to be removed and existing properties to be changed.

```
const mysqlConfig = Object.freeze({
    username: 'test',
    password: 'test',
});

mysqlConfig.username = 'handsome';

console.log('mysqlConfig', mysqlConfig); // Output { username: 'test', password: 'test };
```

In addition, you can also choose to go for a stricter configuration by using `use strict;`. Refer the code block below.

```
'use strict';

const mysqlConfig = Object.freeze({
    username: 'test',
    password: 'test',
});

mysqlConfig.username = 'handsome';
// Error Will be throw over here.
```

Here is the example of the error you will see from your console.

> TypeError: Cannot assign to read only property 'username' of object

## When I use it?

Now we already understand the behavior of `Object.freeze()`, I think you could probably already discovered when you should use it.

Gotcha !!  🎉🎉🎉.

We can leverage `Object.freeze` for our enumeration and configuration. Given the example in this post, you probably wouldn't want your `mysql` config to be altered somewhere. This is when you should use `Object.freeze()`.

Thanks for reading and I hope you find something useful from this post.

## Credits

Photo by [Rich Tervet](https://unsplash.com/@richtervet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on Unsplash