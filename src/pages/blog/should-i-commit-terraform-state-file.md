---
title: 'Should I commit Terraform State File?'
date: '2022-07-03'
tags:
  - terraform
---

Since the terraform deployment is tracked using the state file, such as `terraform.tfstate`. Can I just commit the state file to source control just like Github and it achieves the collaboration purpose too?

The question ponder my mind quite a bit and I decided to write a post about this.

The answer to the question is **No, don't commit the state file**.

## Why not?

The state file is a plain text **JSON** file. It will contain sensitive information such as **username**, **password** in plain text format. So it is a terrible idea and weak security practice.

## What is the solution?

**Remote state Backend**. You can use the remote state backend such as `S3` to store your terraform state file. If you're wondering how to setup up the remote backend with S3, please check the post [here](https://tekloon.dev/terraform-store-state-aws-s3).

However, the next concern would be since the Terraform state file was saved in a remote backend now. Is it safe from Man in the middle(MITM) attack since the state file contains sensitive information?

It will depend on the remote backend itself. Terraform Cloud does provide both encryptions at rest and in transit.

While for AWS S3, you will have to configure the `encrypt` option to the S3 bucket itself. Besides, the query to the S3 bucket will go through **HTTPS** protocol, which means there would be SSL encryption in transit too.

## conclusion

In conclusion, do not commit the terraform state file to Github and any other source control. It is recommended to use a remote backend such as `Terraform Cloud and AWS S3.

I hope this post does provide value to you and see you in the next one.

Thank you.
