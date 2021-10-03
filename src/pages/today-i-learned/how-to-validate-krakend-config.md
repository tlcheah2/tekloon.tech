---
title: "How to Validate Krakend Configuration"
date: "2021-10-03"
tags:
  - API Gateway
  - Krakend
---

Today I will share about How to Validate Krakend API Gateway configuration.

## Why? (The Motivation Behind)

There is a good features/functionality in Krakend - which is syntax checking for the configuration file.

This simple function allows us to validate our Krakend Config before running/deployment. Besides, it is also incredibly helpful & saving us time for debugging.

## How?

Run the command below to check the syantax of the Krakend configuration file.

```bash
krakend check -c krakend.json
```

### Valid Syntax Case

You would see below output if the syntax is correct.

```bash
Parsing configuration file: krakend.json
Syntax OK!
```

### Invalid Syntax Case

Below is the sample of `krakend.json` with invalid syntax.

```json
{
  "version": 2,
  "endpoints": [
    {
      "endpoint": "/v1/stoic-quote",
      "backend": [
        {
          "url_pattern": "/stoic-quote",
          "host": [
            "hhttps://fuzzy-parrot-71.loca.lt" // Extra 'h' in https
          ]
        }
      ]
    }
  ]
}
```

Validating the above `krakend.json` would give us such error output.

```bash
Parsing configuration file: krakend.json
panic: invalid host
```

I hope it is helpful and see you next time.
