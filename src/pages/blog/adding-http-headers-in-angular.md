---
title: "How to Add Http Header to Angular HttpClient"
date: "2020-06-18"
tags:
  - angular
---

In the previous [post](https://tekloon.dev/making-api-call-angular), we already discussed how to make APIs call in Angular. 

Today's post was inspired by one of my co-workers when he approached and ask about how to add headers to a `POST` request in Angular. Thus, I think this is a good opportunity for me to document this down.

## Adding or Change Http Headers in Angular

We could leverage `HttpHeaders` in Angular to do this.

In the below example, 

1. We are creating a new HttpHeaders with `Authorization` key. 

2. Then, we are assigning the created `httpHeaders` into the headers key of the 3rd parameter of `post` function.

```js
// Step 1
const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer JWT-token',
    });

// Step 2
this.http.post(url, body, { headers: httpHeaders });
```

Thanks



