---
title: "How to Use Bash Function to Shorten Your CLI Command"
date: "2020-12-22"
tags:
  - bash
  - "aws-cli"
  - productivity
---

Hey folks. It's been a while since my last post. 

In this post, I am going to share how I use the bash function to improve my daily programming workflow.

## Problem

We have a backend Nodejs application and whenever there is an error occurred, the application will capture screenshots and store them into the S3 Bucket. 
Sometimes we would need to download the screenshots from S3 for further debugging.

Since we are storing it in S3, basically there are 2 ways you could access it:
- AWS Console
- AWS CLI

AWS Console is a **BAD** option because it requires you to log in and enter MFA code every single time when you log in. It could hurt your productivity in long run.

So, AWS CLI could be the solution here. Let's see an example CLI command on how we could download a file from S3.

```
# $1 is the unique tracing ID here
aws --profile work s3 cp s3://bucket-name/$1/ ~/Downloads/$1 --recursive
```

The disadvantages of the above CLI command are:
- Long
- Easy to forget (Trust me! When you need it, probably you will check the documentation again)

## How to Resolve the Problem?

Tadaa🎉🎉!! **BASH function.** 

Bash function appeared in front of my eye during my research and I think it was a pretty good idea after experiencing it for several days.

### Step 1 Wrap the CLI command in a function

You could open your `.zshrc` or `.bashrc` depending on how you set up your workstation. I am using `.zsh` on my Mac. 

```
# .zshrc
# Wrap the CLI command in a function
function s3GetDebug () {
  aws --profile work s3 cp s3://bucket-name/$1/ ~/Downloads/$1 --recursive
}
```

### Step 2 Source the .zshrc

Source the `.zshrc` so the changes you made is effective.

`source ~/.zshrc`

### Step 3 Done !!

Now, you have a shorter command to do the job. The command now looks like this:

```
s3GetDebug trace-id-123
```
`trace-id-123` will be the argument that will reflect as `$1`. So now you could expect the all the files in the S3 bucket will be downloaded into the folder under path `~/Downloads/trace-id-123`

That's it and I hope this post does provide value to you.

