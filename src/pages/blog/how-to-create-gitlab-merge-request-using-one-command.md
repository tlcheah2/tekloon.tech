---
title: "How to Create Gitlab Merge Request using One Command"
date: "2021-04-03"
tags: 
  - git
  - productivity
---

![https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb](https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb)

## Introduction

The story begins with a developer starting to feel bored and tiring about the development workflow and trying his best to at least make a SINGLE part of the workflow better & feeling more productive. 

If you're tired of creating merge-request using the Gitlab website and you want to do it in a faster & simple way. Then this post could be what you're looking for. Without further ado, let's start.

## Step-by-Step Guide

Before we dive deep into the step-by-step guide, let's define the outcome we would like to achieve 1st.

### Outcome

This would be the ultimate product we would like to have.

> Create a Merge Request using one line of command

### Break the Task into Smaller Pieces

- Push the current local branch to remote
- Create a merge request for this local branch
- Set the merge request target to master branch
- The source branch have to be delete after merged. (Remove source branch)

In fact, Gitlab provides push options to do this using a single command. You can refer to the full documentation [here](https://docs.gitlab.com/ee/user/project/push_options.html).

- Push options - `merge_request.create` allows us to create a merge request
- Push options - `merge_request.target=master` allows us to set the target branch for the merge request to master
- Push options - `merge_request.remove_source_branch` allows us to set remove the source branch when the merge request is merged.

After we understood what each options do,  here is the full command:

```bash
# Here will be the format of the command line
git push -o merge_request.create -o merge_request.target=master -o merge_request.remove_source_branch $upstream_remote_name $local_branch_name

# Sample run command
git push -o merge_request.create -o merge_request.target=master -o merge_request.remove_source_branch origin feature/payment-integration
```

## Optimize the command

We have achieved the outcome that we want. But yet, writing this long command in the above is even worst compared to creating the merge requests in the Gitlab website (My personal feeling  😅 ).

Luckily, we can make this better and shorter using Git alias. Here is how I defined my Git alias in my `.gitconfig` file. 

```bash
[alias]
        bn = "!git rev-parse --abbrev-ref HEAD"
        mrtd = "!git push -o merge_request.create -o merge_request.target=development -o merge_request.remove_source_branch origin $(git bn)"
        mrts = "!git push -o merge_request.create -o merge_request.target=staging -o merge_request.remove_source_branch origin $(git bn)"
        mrtp = "!git push -o merge_request.create -o merge_request.target=master -o merge_request.remove_source_branch origin $(git bn)"
```

I have 4 Git alias:

- **bn**: Print out the current branch name
- **mtrd** (Merge Request to Development): This creates an alias for the long command we have to type which creates a merge request from the current branch to the development branch.

In short, this long command have been simplified from:

`git push -o merge_request.create -o merge_request.target=master -o merge_request.remove_source_branch origin feature/payment-integration`

to:

- `git mrtd` : Create Merge Request to Development Branch
- `git mrts`: Create Merge Request to Staging Branch
- `git mrtp`: Create Merge Request to Production Branch

## Conclusion

I personally really enjoy the outcome of it because it really saves a lot of my time in creating merge requests. With those tiny little time you save every day, it would be really a substantial amount of time you save along your career life.

I hope you enjoy this post and I will see you in next article. 

## References

This section summarized resources I discovered during the research for this topic.

- Gitlab Push Options [Documentation](https://docs.gitlab.com/ee/user/project/push_options.html)
- Rob Miller's [gitconfig](https://gist.github.com/robmiller/6018582) - Some useful Git alias used everyday