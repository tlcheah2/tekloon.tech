---
title: "How to Run Your Node Application using Reserved Port"
date: "2020-05-13"
tags:
  - nodejs
  - cli
  - linux
---

![Water Ripple caused by Finger](https://images.unsplash.com/photo-1483691278019-cb7253bee49f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)

Firstly, what is reserved port? Reserved port is a set of port numbers ranging from 0 to 1023 which is reserved for privileges services, such as port 80 for HTTP, 443 for HTTPS, 22 for SSH and etc. 

## Problem Statement

When you're trying to start your Node project using a reserved port in Linux, you will most likely to see this error.

> ERR 0.0.0.0:443 Permission denied 

This is because ONLY root can run an application using a reserved port in Linux.

Unfortunately, I don't have root user access and this is a pretty normal situation where developers would not be given root access to the server. 

## Desired Output

What I actually want to achieve here? 

- Able to run my Nodejs project using port 443

Luckily, I found a pretty good solution for my use case which is using `setcap`

## Solution

`setcap` basically allows me to add the capability of `non-root port binding` to the binary. It simply means even though I am not root user, I can run my project using a reserved port.

However, as this capability is added to binary. Which in my use case, I am running Nodejs project, so I should add this capability to my `node` binary.

You can simply do it with the command below.

If you knew where your nodejs located, you could use the below command and substitute with your nodejs path.

```
sudo setcap 'cap_net_bind_service=+ep' /usr/bin/local/node
```

`/usr/bin/local/node`, this should be replaced with your nodejs path.

OR you can simply use `which node`

`which node` allows you to find where your node binary located. 

```
sudo setcap 'cap_net_bind_service=+ep' `which node`
```

Lastly, you can now start your project using reserved port.

Thanks for reading and I hope you find something useful.

## Credits

Photo by [Yoann Boyer](https://unsplash.com/@yoannboyer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on Unsplash

## References

- https://gist.github.com/firstdoit/6389682

- https://cwiki.apache.org/confluence/display/HTTPD/NonRootPortBinding