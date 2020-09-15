---
title: "How to Skip Loop in forEach & Best Scenario using forEach"
date: "2020-09-15"
tags:
  - javascript

---

This article documented down on how to skip to the next iteration when you're using `foreach`. Besides, you will also know the correct scenario to use `foreach`. 

Without further ado, let's start.

## Easily skipping forEach loop

Skipping a `foreach` loop is easy. Simply using `return` when it is matching the condition. Refer the code below.

```javascript
const arr = ['Peter', 'Sam', 'Helena'];

arr.forEach((name) => {
	if (name === 'Helena') {
		return;
	}
	console.log(`Person name: ${name}`);
});
```

**Output**

```bash
"Person name: Peter"
"Person name: Sam"
```

With this example, we're skipping the loop when the iteration reached **"Helena"**.

However, are we using `forEach` in all the scenarios? 
The answer is obvious, **No!** 

## Best Scenario to use forEach

### Scenario 1: I want to see all guests with first-name Mary

For this scenario, it would be the best case for `forEach`. This is because no matter what happened, we're going to loop until the end of the array and find out the person with the first name Mary.

```javascript
const guestNames = [
  { firstName: 'Mary', lastName: 'Skola'},
  { firstName: 'Peter', lastName: 'Machinki'},
  { firstName: 'Mary', lastName: 'Jones'},
  { firstName: 'Helen', lastName: 'Kovavic'},
];

guestNames.forEach((name, index) => {
  console.log(`Running ${index + 1} iteration`);
  // We're skipping as long as the firstName is not Mary.
  if (name.firstName !== 'Mary') {
    return;
  }
  console.log(`Guest: ${name.firstName} ${name.lastName}`);
});
```

**Output**

```bash
"Running 1 iteration"
"Guest: Mary Skola"
"Running 2 iteration"
"Running 3 iteration"
"Guest: Mary Jones"
"Running 4 iteration"
```

### Scenario 2: I want to see the guest with name “Mary Jones”

For this scenario, you can also simply achieve what you want using `forEach` loop. However, that is not the best-case scenario. This is because you would have to go through the whole size of the array to find "Mary Jones". It is like the metaphor below:

- forEach — I would travel the whole U.S even though I found you in my first stop, New York. Can you feel the dumbness now?

Is there a better approach we can use? Absolutely **YES**. We can leverage `find` .

```javascript
const guestNames = [
  { firstName: 'Mary', lastName: 'Skola'},
  { firstName: 'Peter', lastName: 'Machinki'},
  { firstName: 'Mary', lastName: 'Jones'},
  { firstName: 'Helen', lastName: 'Kovavic'},
];

const foundGuest = guestNames.find((name, index) => {
  console.log(`Running ${index + 1} iteration`);
  return (name.firstName === 'Mary' && name.lastName === 'Jones');
});
console.log('Found Guest', foundGuest);
```

**Output**

```
"Running 1 iteration"
"Running 2 iteration"
"Running 3 iteration"
"Found Guest"
[object Object] {
  firstName: "Mary",
  lastName: "Jones"
}
```

## Conclusion

Here are the key points of this article.

- Use `return` to skip the loop and go to the next iteration in `foreach`
- Use `forEach` when you decided to go through all elements in the array no matter what happened.
- Use `find` when you decided to get the matching element from the array and ignore the rest.

Thank you for reading. See you in the next article.

