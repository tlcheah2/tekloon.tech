---
title: 'How to npm Install Private Github Package'
date: '2022-06-29'
tags:
  - github
---

![Screenshot 2020-07-29 at 10.12.14 PM](../../images/private-package-screenshot.png)

Trying to install the scoped/private GitHub package that you deployed?

Here we will talk about the setup required to install the private GitHub package.

## Prerequisites

There are some prerequisites that you have to set up prior to installing the package.

- Create a Github Personal Access Token (PAT). Github has a beginner-friendly [guide](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) on how to create the PAT.

Remember to copy the `PAT` to somewhere and save it. Because you wouldn't be able to retrieve them afterward.

## Step-by-step

Below is the step-by-step guide.

### Create `.npmrc`

Firstly, create the `.npmrc` in your Node project if you haven't. Paste the following template into your `.npmrc`.

```bash
@OWNER:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=@TOKEN
```

### Replace @OWNER and @TOKEN

Replace the `@OWNER` with the scoped name. This is the Github username. In my case, it would be `@tlcheah2`.

Then, replace the `@TOKEN` with the Github Personal Access Token that you have created in the Prerequisites section.

### Install the package

Now, you have configured the `.npmrc` correctly. Let's verify by installing the package.

```
npm install @tlcheah2/sample-publish-github-package
```

The package now should be installed successfully.

I hope this post does provide value to you and see you in the next one.

Thank you.
