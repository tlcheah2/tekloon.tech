---
title: "How to Allow Query Parameters in Krakend API Gateway"
date: "2021-10-06"
tags:
  - API Gateway
  - Krakend
---

## Why? (The Motivation Behind)

By default, no query parameters in the URL will be forwarded.

So in order to send the query parameters to the backends (microservices), you would need to explicitly allow it with `querystring_params` config.

Let's see some real example

## How?

Let's look at the below configuration for the endpoint.

```json
{
  "version": 2,
  "endpoints": [
    {
      "endpoint": "/v1/git-users/search",
      "querystring_params": ["q"],
      "backend": [
        {
          "url_pattern": "/search/users",
          "host": ["https://api.github.com"]
        }
      ]
    }
  ]
}
```

In the above example, we're allow query parameters key `q` to be forwarded to the backend.

If you would like to allow all query parameters to be forwarded to backend, you could configure it using `*`.

```json
 "querystring_params": ["*"],
```

With this, you do not need to explicitly specify each specific query parameter key.

I hope it helps and see you in the next post. 🎉🎉
