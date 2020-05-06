---
title: "How I manage Node Version using NVM"
date: "2020-05-06"
tags:
  - cli
  - nodejs
---

I have been using NVM (Node Version Manager) for quite some time. However, only recently I leverage `nvm alias` to manage my node version.

## Using _nvm alias_ to give meaningful name

Below is the command structure for node alias.

`node alias customName nodeVesion`

```bash
// Given Node v10.16.3 alias name of node-prod
nvm alias node-prod v10.16.3 // Node version use in production

nvm alias node-uat v12.16.3 // The upcoming version & currently testing in UAT environment.

nvm alias node-dev v14.1.0 // The latest version to play & experiment in Dev Environment
```

Besides, by giving a meaningful name enable you easily to switch between each node version instead of remembering the version.

## Using _nvm use_ switch to different Node version

```bash
// Change the current running nodejs version to v14.1.0
nvm use node-dev
```

After alias, you can easily switch between each node version using `nvm use`

## Using _nvm alias default_ to set Default Nodejs Version

Default behavior of NVM is always use the latest version of Node you have installed.

So this comes in handy when you want to set your default version to lower Node.js version.

`nvm alias default node-prod`

## Conclusion

With this approach, I can 

- Avoid NVM always using the latest node version in my local machine.

- Give a meaningful name to each node version that I care about.

- Easily to switch between each node version using meaningful alias.

