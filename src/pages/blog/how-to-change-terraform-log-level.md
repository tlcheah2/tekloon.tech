---
title: 'How to Change Terraform Log Level'
date: '2022-07-04'
tags:
  - terraform
---

Looking for a solution to change the terraform log level so you could get more information for debugging purposes? This is the right post for you.

## Set TF_LOG to trace

By default, there is no value set for `TF_LOG`. You could set `TF_LOG` environment variable to **trace** with the below command which will provide you the most detailed information for debugging purposes.

```
export TF_LOG=trace
```

After running the above command, running `terraform init` would give you a bunch of logs in your terminal.

Lastly, `trace` is also the most verbose level in Terraform. Simpy means it is the log level that could give you the all information.

## Reset the Log Level

You could simply unset the environment variable `TF_LOG` by running the command:

```
unset TF_LOG
```

That's it.

I hope this post does provide value to you and see you in the next one.

Thank you.
