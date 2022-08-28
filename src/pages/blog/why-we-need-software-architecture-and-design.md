---
title: 'Summary of Clean Architecture - Part 1'
date: '2022-08-28'
tags:
  - clean architecture
---

I start reading - `Clean Architecture` by "Uncle Bob" a week ago. In this post, I will document the highlight for Part 1 of the book.

## What is software design/architecture?

One of the most common descriptions of software architecture and software design is:

- Software Architecture often refers to the **high-level structure** without exposing the implementation details.
- While Software Design often delves into the **implementation details**.

The book Clean Architecture suggests that there is no difference between software design and software architecture if you are a beginner. It is just a set of different decisions from high-level (software architecture) to low-level (software design). They're normally part of each other and it is really difficult to find a clear line to divide them.

## Why do we need software design?

The short and simple answer is to **save cost**.

> The goal of software architecture is to minimize the human resources required to build and maintain the required system. - Clean Architecture, "Uncle Bob"

So, software architecture and design if done well, can help the company save cost and deliver optimum results.

## Number of developers != Products

In software development, one of the most common misconceptions is if we hire more software engineers, we can deliver the product faster.

**Yes**. It might be true in the short term but it will not **sustain** in the long term if the software architecture/design is bad.

Try to imagine that the company expects to have 4x output and they decided to hire 4 more engineers.

Due to the mess in software design, the engineer now is busy managing the mess in the code to make room for:

- New Features to be developed
- At the same time, making sure old features works like usual

And It's not really that the engineer is lazy. Developers are devastated too when they realized their productivity drop.

Worst, now your profit is decreased because the monthly payroll increased since you hire more engineers.

## Conclusion

In this part 1, I realize the importance of software architecture/design. And as "Uncle Bob" said

> The only way to go fast is to go well

## Questions remain to be addressed

After reading Part 1 of the book, here is the question I still have in my mind.

1. Is it possible to easily differentiate software design and software architecture after reading this book?
