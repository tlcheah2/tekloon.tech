---
title: "How I Use React Fragment"
date: "2020-05-15"
tags:
  - react
---

This post summarizes why and when I use **React Fragment**.

## Why I use React Fragment?

React Fragment allows me to create lesser `div` which means **lesser nested hierarchy** in my DOM.

By using React Fragment properly, you definitely optimized your DOM. Personally, I discovered React Fragment's purpose is similar to `ng-container` in Angular. You can read more about `ng-container` at [here](https://tekloon.dev/using-ng-container-to-reduce-unnecessary-dom-element/).

## When I use it?

Normally I always started with a `div` in a component 1st. When I completely organized my UI layout in my component, I will evaluate whether the `div` is required or I can replace it with `Fragment`.  

The below code snippet comes from my blog.

```
import React from "react";
import NavBar from '../components/NavBar';
import PostListItem from '../components/PostListItem';
import { graphql } from 'gatsby';
import Seo from '../components/Seo';

export default ({ data }) => (
    <React.Fragment>
        <NavBar />
        <Seo />
    </React.Fragment>
);

// React Fragment Shorthand 

export default ({ data }) => (
    <>
        <NavBar />
        <Seo />
    </>
);
```

There are 2 ways on how you can implement `React Fragment` in your JSX. You can either use `<React.Fragment>`, the conventional way or `<>`, which is the shorthand way. 

Most of the code I saw thus far, they're using the shorthand way.

From the code above, I evaluated that I don't need to have another `div` to wrap my Navbar and etc since I don't need to do any styling or layout organization.
