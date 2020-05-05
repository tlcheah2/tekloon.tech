---
title: "Introduction to Optional Chaining Operator"
date: "2020-05-05"
tags:
  - javascript
  - nodejs
---

With the recent release of Nodejs v14, it comes with the newly upgraded Javascript engine: v8.1. One of the things worth mentioning is **optional chaining**.

This post introduces you to the optional chaining operator and how you can use it to make your code looks cleaner and neater.

Example of optional chaining.

`peopleA?.name?.firstName`

One of the main problems I encountered in writing Javascript is when we have nested objects, we were required to write a long `if` statement. Given the code below.

```js
const peopleA = {
    name: {
        firstName: 'Tek Loon',
        lastName: 'Cheah',
    }
}

// If we want to access first name, this is the validation required
if (peopleA && peopleA.name) {
    const fname = peopleA.name.firstName;
    console.log(`First name is ${fname}`); 
    // Output: First name is Tek Loon
}
```

Refer to the code above, if we wanted to access `firstName` in the object, we would have to perform null & undefined checking on `peopleA` and `name` nested object. 

We would probably end up with most common error, where we trying to access the property of undefined or null. 

> _Cannot read property 'firstName' of undefined_

With optional chaining introduced, we can now write cleaner and shorter code.

```js
const peopleA = {
    name: {
        firstName: 'Tek Loon',
        lastName: 'Cheah',
    }
}

// Validation in single line
const fname = peopleA?.name?.firstName;
console.log(`First name is ${fname}`); 
// Output: First name is Tek Loon
```
## Conclusion

Optional chaining allows us to organize our code cleaner by reducing `if` statement. I am glad it released in Node v14. 

Thanks for reading.





