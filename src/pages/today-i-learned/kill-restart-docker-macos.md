---
title: "How to Kill & Restart Docker in MacOS"
date: "2021-09-27"
tags:
  - docker
---

Today, I will be sharing how you could easily kill & restart the Docker Service (Docker app) in your Mac.

## Why? (The Motivation Behind)

Sometimes, our Docker process gets stuck which makes us really unable to continue our work and when neither stop/restart the docker container could work.

This is the moment to do it.

### Example Error

> ERROR: for postgres_1 UnixHTTPConnectionPool(host='localhost', port=None): Read timed out. (read timeout=60)
> ERROR: An HTTP request took too long to complete. Retry with --verbose to obtain debug information.

## How?

You could easily fix it by running the below command in your Terminal

```bash
killall Docker # Kill all the docker related process in your MacOS
open /Applications/Docker.app # Open the Docker app again
```
