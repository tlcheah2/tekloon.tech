---
title: 'Easiest Way to Create Google OAuth2Client in Node.js Backend'
date: '2023-05-01'
tags:
  - javascript
  - google-oauth
  - nodejs
---

OAuth 2.0 is an open standard for authentication and authorization, which allows third-party applications to access user data from various service providers without the need for the user to share their username and password. Google provides a comprehensive set of APIs and tools to implement OAuth 2.0 authentication for its services.

In this post, I will be sharing how you can easily create an `OAuth2Client` in the backend using [google-auth-library](https://www.npmjs.com/package/google-auth-library) package.

## Step 1: Install the `google-auth-library` package

The first step is to install the google-auth-library package using the following command:

```
npm install google-auth-library
```

## Step 2: Import the OAuth2Client class

Next, we need to import the `OAuth2Client` class from the `google-auth-library` package. We can do this using the following code:

```typescript
import { OAuth2Client } from 'google-auth-library';
```

## Step 3: Create a new OAuth2Client instance

To create a new OAuth2Client instance, we need to provide the client ID and client secret obtained from the Google Cloud Console. We can create a new instance of the OAuth2Client class using the following code:

```typescript
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';

const oauth2Client = new OAuth2Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});
```

## Step 4: Assign the Credential to OAuth2Client instance

To use the Google Service APIs, we need to assign the credential to the OAuth2Client instance.

```typescript
const refresh_token = 'refresh-token'; // Required.
const access_token = 'access_token'; // Optional
const expiry_date = 1682921737269; // Optional

oauth2Client.setCredentials({
  refresh_token,
  access_token,
  expiry_date,
});
```

## Conclusion

There you go. Now you have the `OAuth2Client` instance. Next, we will be using the `OAuth2Client` here to interact with the Google Services API such as Google Sheets API, Google Drive API and etc.
