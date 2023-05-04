---
title: 'How to Create a GET Request API Call with Query String using Axios'
date: '2023-05-04'
tags:
  - javascript
  - nodejs
---

Hey folks, welcome back to another `axios` article. This article will show you a simple way how to write your `GET` API request with query string using npm package [axios](https://www.npmjs.com/package/axios).

## Use Axios params

We can use the `params` object within the `AxiosRequestConfig`. Here is the example code on how it looks:

```typescript
import axios from 'axios';

axios.get('https://webhook.site/c0bdeea5-6685-45e0-841a-e6741670dfb3', {
  params: { a: 1, b: 2 },
});
```

The above code will convert your GET API call URL to:
`https://webhook.site/c0bdeea5-6685-45e0-841a-e6741670dfb3?a=1&b=2`

There you go and I hope you find this piece useful.
