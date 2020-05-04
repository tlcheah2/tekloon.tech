---
title: "Use CSS Variable to Avoid Redundant CSS Declaration"
date: "2020-05-04"
tags:
  - css
---

When I develop in Angular or React, I will normally separate my CSS files into different files/modules for better organization and separation as well.

However, this leads to the declaration of some similar CSS variables over and over again. Especially color. 

```css
// post.css
.title-container {
    background-color: tomato;
}
```

```css
// styles.css
.btn {
    background-color: tomato;
}
```

Does this look familiar to you? At least it does for me. 

## Disadvantages

Changing the color is troublesome as you have to find all the files and replace it with all the CSS files. This is pretty inconvenient and wasting time too.

## Changing your whole website color scheme in just few lines 

CSS Variable plays an important role in saving us time in changing the color. 

We can declare the css variable using `--` in the `body` selector and using the variable declared with `var(--variableName)`.

Look at the example below.

```css
// global.css 
body {
    --primaryColor: yellow;
    --secondaryColor: black;
}
```

```css
// post.css 
.title-container{
    background-color: var(--primaryColor);
}
```

With this approach, we can now basically changing our whole website color in just 2 lines of code.

Thanks for reading.
