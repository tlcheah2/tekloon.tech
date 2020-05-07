---
title: "Using ng-container to Reduce Unnecessary DOM Element"
date: "2020-05-07"
tags:
  - angular
---

Since Angular only support one structural directive per host element, I believed most of the developers will familiar with code below.

```js
const products = [
    {
        name: 'Phone XL',
        price: 799,
        description: 'A large phone with one of the best screens'
    },
    {
        name: 'Phone Mini',
        price: 699,
        description: 'A great phone with one of the best cameras'
    },
    {
        name: 'Phone Standard',
        price: 299,
        description: ''
    },
    null,
];
```

```html
<div *ngFor="let product of products">
  <div *ngIf="product">
    <div>
      <p>{{product.name}}</p>
      <p>{{product.price}}</p>
    </div>
  </div>
</div>
```

If you look the above code, it created 3 `<div>` element. But in fact, there are 2 `div` is not required. We only create 2 more nested div for the `*ngFor` and `*ngIf` directive sake.

## Using ng-container to optimize

Great news that we can leverage `ng-container` for optimize the layout & remove the purposeless `div` element.

```html
<ng-container *ngFor="let product of products">
  <ng-container *ngIf="product">
    <div>
      <p>{{product.name}}</p>
      <p>{{product.price}}</p>
    </div>
  </ng-container>
</ng-container>
```

This is because `ng-container` doesn't interfere with styles or layout. It means, it won't create DOM element for you.

> You can use your inspect tools in Chrome to see the difference in DOM using the 2 different codes.

Thanks for reading.






