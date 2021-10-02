---
title: "How to Add Endpoints to Krakend API Gateway"
date: "2021-10-02"
tags:
  - API Gateway
  - Krakend
---

Today I will share about How to Add Endpoints in the Krakend API Gateway.

## Why? (The Motivation Behind)

Endpoints are the essential part of API Gateway. Because it's API Gateway's responsibility to decide which endpoint to expose based on the configuration in krakend.json.

There could be thousands of endpoints from my microservices. But it still depends on the API Gateway whether to expose all of them or part of them or none of them.

If no endpoints were configured in your API Gateway, it means there is no incoming traffic to be forwarded to the microservices.

Let's see how to add endpoints to your Krakend API Gateway in the next section.

## How?

We will need to add endpoints array into the configuration. The endpoints array should contain objects which has

- `endpoint` - Endpoint URL for consumer
- `backend` - Backend (Microservice) host and URL

Let's see the real example below.

### Example

I have an existing microservice which I have [localtunnel](https://github.com/localtunnel/localtunnel) to the public. The microservice have 2 endpoints:

- GET /stoic-quote
- GET /healthcheck

So now I will configure my Krakend API Gateway to `GET /stoic-quote` endpoint.

What the configuration actually doing?

- Adding `v1/stoic-quote` endpoint in the Gateway
- Configure `v1/stoic-quote` endpoint talk to the microservice with host `https://fuzzy-parrot-71.loca.lt` and matching URL `/stoic-quote`

```json
{
  "version": 2,
  "endpoints": [
    {
      "endpoint": "/v1/stoic-quote",
      "backend": [
        {
          "url_pattern": "/stoic-quote",
          "host": ["https://fuzzy-parrot-71.loca.lt"] // This is the public url when I use localtunnel to expose my localhost
        }
      ]
    }
  ]
}
```

Let's verify the result and make sure the added endpoint is working.

```bash
# Curl GET v1/stoic-quote return result
curl HTTP://localhost:8080/v1/stoic-quote
{"data":{"author":"Seneca","quote":"Begin at once to live, and count each separate day as a separate life."}}

# Curl other endpoint return 404 page not found
curl HTTP://localhost:8080/v1/healthcheck
404 page not found
```

And it's working as expected!! 🎉🎉
