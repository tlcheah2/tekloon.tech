---
title: "How I do Basic Authentication with Axios in Nodejs"
date: "2020-05-14"
tags:
  - nodejs
  - javascript
---

![Macbook with Visual Code Open](https://images.unsplash.com/photo-1514428631868-a400b561ff44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)

This post serves as a reminder to myself as I have been forgetting how to do Basic Authentication with Axios.

Thus, this post serves as the memory boost.

Basic Authentication is an authentication scheme for HTTP protocol. We can always found them from the Request Header, `Authorization` field.

Those value start with `Basic ***randomstring***`. These value usually constructed using base64 encoding to username followed by colon, and password like the example below.

`username:password`

## Encode to Base64 Without External Library

```
const username = 'username';
const password = 'password';

const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');

const authorization = `Basic ${encodedBase64Token}`;
```

## Setting to Axios Headers 

After you have encoded the token and have the authorization string, let's assign it to your request header.

```
const response = await axios({
    url: 'https://api.github.com',
    method: 'post',
    headers: {
        Authorization: authorization,
    },
    data: {} // Request Body if you have     
});
```

That's how I do basic authentication in Nodejs using Axios.

## Credits 

Photo by [Maxwell Nelson](https://unsplash.com/@maxcodes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on Unsplash


## References

- Swagger Basic Auth [Doc](https://swagger.io/docs/specification/authentication/basic-authentication/)

- Practical [article](https://flaviocopes.com/axios-send-authorization-header/) by Flavio 



