---
title: "How I Setup Git Alias to Improve Productivity"
date: "2020-10-02"
tags:
  - git
  - productivity
---

This post discussed why I choose to use `git alias` and how it improves the overall work productivity and save some time for me.

If you’re the one who prefers to use IDE such as Github Desktop, Fork, and others, then this article might not suitable for you. However, you can continue to read to see whether I can persuade you to use the git command instead.

## If you don’t know about Git Alias

Git alias allows you to create shortcuts for your frequently used Git commands. Here are some of my favorites and commands I used the most.

```bash
git checkout => git co // My shortcut
git branch => git br // My shortcut
git commit => git ci // My shortcut
git status => git st // My shortcut
git stash
```

By setting up aliases, we can reduce the number of characters to type when typing the command. This makes things convenient and effective.

This is how Git commands look like in a shorter format.

```bash
git co lesson-1
git ci -m "chore: update changelog"
```

Isn't this shortcut amazing? I have been setting up aliases for a few days now and I **highly highly recommend** it to all people who're using Git command line.

## How to Setup Aliases

There are 2 ways to setup Git aliases, One is via `git config` command which I don't use. 

I prefer to directly edit the `~/.gitconfig` in the User home directory I think that is easier and straightforward. Open your `.gitconfig` and you will see some information such as

```bash
[user]
	name = Tek Loon
	
... etc
```

Add the alias section (if you never created Git alias before) and the respective shortcut. 

```bash
[alias]
	co = checkout
	br = branch
	ci = commit
	st = status
```

Save the edited `.gitconfig`. Quit and restart your terminal and now you're ready to use created alias.

Enjoy using the Git aliases that you have created and I hope it improves your coding experience.

## References

- Official Git Alias [tutorial](https://www.atlassian.com/git/tutorials/git-alias) by Atlassian