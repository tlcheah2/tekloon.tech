---
title: "How to Run a Krakend API Gateway"
date: "2021-10-01"
tags:
  - API Gateway
  - Krakend
---

Krakend is known as the high-performant and fastest API Gateway in the market. Today I will share about How to Run a Krakend API Gateway with Minimal Config.

## Why? (The Motivation Behind)

When I first introduce with new technology/products, it feels intimidating at first and Krakend was one of them as well.

However, after you spent some time on reading the docs and try it out. Actually running a Krakend API Gateway is really easy and convenient.

Below is the step-by-step guide on how to run a Krakend API Gateway.

## How?

#### Step 1 - Create directory and krakend config file `krakend.json`

```bash
mkdir krakend-sample
cd krakend-sample
touch krakend.json
```

#### Step 2 - Set minimal configuration.

**krakend.json** - Minimal configuration for Kraken Config

```json
{
  "version": 2
}
```

#### Step 3 - Pull Krakend Docker Image & Run with config file created in step 2.

```bash
docker run -p 8080:8080 -v "${PWD}:/etc/krakend/" devopsfaith/krakend run -d -c /etc/krakend/krakend.json
```

#### Step 4 - Verify the Gateway Working!!

curl the `__health` endpoint should return you `{"status":"ok"}`

```bash
curl HTTP://localhost:8080/__health
{"status":"ok"}
```
