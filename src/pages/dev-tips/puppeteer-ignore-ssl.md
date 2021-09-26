---
title: "How to Ignore Certificate Errors in Puppeteer"
date: "2021-09-26"
tags:
  - nodejs
  - puppeteer
  - scraping
---

If you're running your puppeteer in non-headless mode. You might encounter the error when the website experiencing certificate invalid errors.

This is typically happened when the website certificate was expired.

However, you could configure puppeteer by passing `--ingore-certificate-errors` in the `args` during launch ignore this kind of error. For example:

```
const browser = await puppeteer.launch({ args: [ '--ignore-certificate-errors' ]})
```

That's it.
