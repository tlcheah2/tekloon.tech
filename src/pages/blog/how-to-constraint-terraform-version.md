---
title: 'How to Configure Terraform Version Constraint'
date: '2022-07-02'
tags:
  - terraform
---

Why you would want to configure a terraform version constraint?

The first one that comes to my mind is Consistent Deployment Experience. So if Terraform introduces a breaking change, at least it won't automatically break the existing deployment.

Let's see how you can configure a terraform version constraint.

## Solution

In short, we just have to configure `required_version` within terraform block.

The following operator's syntax we could use when configuring version constraints:

- `=`. Matching the exact terraform version. Example, `"= 1.12.0"`
- `!=`. Any version that is not equal to the mentioned version. Example `"!= 1.12.0"`
- `>, >=, <, <=`. Greater, greater equal, lesser, and lesser equal. Example, `"> 1.12.0"`
- `~>`. Allow only patch version updates. Example, `"~> 1.12.0"`. The above configuration will allow `1.12.1`, `1.12.2`, but not `1.13.0`.

## Sample Code & My Preferred Choice

Below is the sample code where I configure the terraform version must be `1.12.0` and a patch version update is allowed.

I preferred the `~>` operator. The reason being is I think a patch release will not introduce breaking changes and at the same time, I have the benefit to get the latest release of the patch version and the patch release might help to fix bugs or improve performance.

It seems like the ideal choice to me at this moment.

I hope this post does provide value to you and see you in the next one.

Thank you.

## Resources

- Official Terraform Version Constraint [Doc](https://www.terraform.io/language/expressions/version-constraints#-3)
