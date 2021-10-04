---
title: "How to Configure Dynamic Path in Krakend API Gateway"
date: "2021-10-04"
tags:
  - API Gateway
  - Krakend
---

## Why? (The Motivation Behind)

It's very common that our API endpoints have dynamic path such as `users/1` and `users/2`. The value `1` and `2` often represent the unique ID of the user so backend services will query the requested user information and return to the caller.

But, the unique ID here is different for each user which means it is dynamic. So we need to configure in our Krakend endpoints to specify this is the dynamic value in our url pattern.

Let's see the example below.

## How?

The below API Gateway have a dynamic endpoint `/v1/git-user/{username}`. This dynamic endpoint allow us to query the Github user based on the username we insert in the URL path.

The dynamic variable is defined using curly braces, `{username}`. We will reuse the same defined variable in the `url_pattern`.

```json
{
  "version": 2,
  "endpoints": [
    {
      "endpoint": "/v1/git-user/{username}",
      "backend": [
        {
          "url_pattern": "/users/{username}",
          "host": ["https://api.github.com"]
        }
      ]
    }
  ]
}
```

Let's see some response to see if it working.

```bash
 curl http://localhost:8080/v1/git-user/tlcheah2
{"avatar_url":"https://avatars.githubusercontent.com/u/7456033?v=4","bio":"Javascript Developer. I explain via code and words. \r\nPersonal Mantra: Life is about trying stuff, validating stuff and retry some stuff if it is not working","blog":"https://tekloon.dev","company":"Freelancer","created_at":"2014-05-01T05:44:09Z","email":null,"events_url":"https://api.github.com/users/tlcheah2/events{/privacy}","followers":9,"followers_url":"https://api.github.com/users/tlcheah2/followers","following":0,"following_url":"https://api.github.com/users/tlcheah2/following{/other_user}","gists_url":"https://api.github.com/users/tlcheah2/gists{/gist_id}","gravatar_id":"","hireable":null,"html_url":"https://github.com/tlcheah2","id":7456033,"location":"Kuala Lumpur, Malaysia","login":"tlcheah2","name":"Tek Loon","node_id":"MDQ6VXNlcjc0NTYwMzM=","organizations_url":"https://api.github.com/users/tlcheah2/orgs","public_gists":75,"public_repos":63,"received_events_url":"https://api.github.com/users/tlcheah2/received_events","repos_url":"https://api.github.com/users/tlcheah2/repos","site_admin":false,"starred_url":"https://api.github.com/users/tlcheah2/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/tlcheah2/subscriptions","twitter_username":"TekLoonCheah","type":"User","updated_at":"2021-06-29T02:14:03Z","url":"https://api.github.com/users/tlcheah2"}
```

I query my own Github profile and it is working as expected!! 🎉🎉
