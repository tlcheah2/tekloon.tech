---
title: "Why You Should Use ngIf else"
date: "2020-05-09"
tags:
  - angular
---

Until a while ago, I still couldn't convince myself when I should use Angular If Else Directives. 

This is due to most of the time, writing 2 `*ngIf` (refer the below code) was enough to support my use case.

### My 2 *ngIf validation

```html
<!-- Render when there is products -->
<div *ngIf="products">There are products</div>

<!-- Render when there isn't a single product -->
<div *ngIf="!products || products.length === 0">Loading...</div>
```

### The ngIf else way 

```html
<!-- Render when there is products -->
<div *ngIf="products; else loadingView">
  There are {{products.length}} products available.
</div>

<!-- Render when loadingView being called -->
<ng-template #loadingView><p>Loading...</p></ng-template>
```
## Why ngIf else?

After several round of thinking, I finally able to discover the reasons that are enough to persuade myself to use `ngIf else`.

- Firstly, using `ngIf else` allows you to reduce one if validation. You don't have to write two `*ngIf` validation.

- Secondly, you can reuse the `loadingView` declared above code. For e.g, you can reuse the `loadingView` when you're retrieving data from server or submitting data to server.




