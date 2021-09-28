---
title: "How to Configure Custom Download Folder in Puppeteer"
date: "2021-09-28"
tags:
  - puppeteer
  - scraping
---

Today I learned How to Set Download Path in Puppeteer.

## Why? (The Motivation Behind)

It's normal that we would like to download some files, parse and process it in our scraping process. But we would like to control where the downloaded file goes so we could process them later.

## How?

The below code will set the download path to the `download` folder under the root project directory.

```js
// Launch a new browser
const browser = await puppeteer.launch()
// Open New Tab
const page = await browser.newPage()
// Allow Downloads and set download path to your browser
await page._client.send("Page.setDownloadBehavior", {
  behavior: "allow",
  downloadPath: "./download", // Change this to your desired download path.
})
```
