+++
title = 'How to Configure Git Username and Email Address'
date = 2023-11-22T16:55:24+01:00
draft = false
description = "This guide explains how to configure your Git username and email address. It covers setting global values for all repositories and repository-specific values for individual projects. Properly configuring these settings ensures your commits are associated with the correct identity."
image = "/images/git.webp"
imageBig = "/images/git.webp"
categories = ["Git"]
authors = ["Close Roll"]
avatar = "/images/avatar.webp"
+++




## Contents
- [Setting Global Git Username and Email](#setting-global-git-username-and-email)
- [Setting Git Username and Email for a Single Repository](#setting-git-username-and-email-for-a-single-repository)
- [Conclusion](#conclusion)

---

Git is a distributed version control system that helps developers and engineers keep track of changes they make to their code.

Before you start using Git on your system, it's essential to configure your Git username and email address. Git associates your identity with every commit you make.

## Setting Global Git Username and Email

The global git username and email address are associated with commits on all repositories on your system that don't have repository-specific values.

To set your global commit name and email address, run the `git config` command with the `--global` option:

```bash
git config --global user.name "Your Name"
```

Once done, you can verify that the information is correctly set by executing the following command:

```bash
git config --list
```

This will output:

```bash
user.name=Your Name
user.email=youremail@yourdomain.com
```

The command saves the values in the global configuration file `~/.gitconfig`:

```ini
[user]
    name = Your Name
    email = youremail@yourdomain.com
```

You can also edit this file with your text editor, but it is recommended to use the `git config` command.

## Setting Git Username and Email for a Single Repository

Sometimes, you may need to use a different username or email address for a specific repository. In that case, you can set the identity per repository by running the `git config` command without the `--global` option from within the repository directory.

Let’s assume you want to set a repository-specific username and email address for a repository located in the `~/Code/myapp` directory. First, navigate to the repository directory:

```bash
cd ~/Code/myapp
```

Then, set the Git username and email address:

```bash
git config user.name "Your Name"
```

Verify that the changes were made correctly:

```bash
git config --list
```

This will output:

```bash
user.name=Your Name
user.email=youremail@yourdomain.com
```

The repository-specific settings are stored in the `.git/config` file located in the root directory of the repository.

## Conclusion

The Git username and email address can be set using the `git config` command. These values are associated with your commits.

If you are new to Git, you can read the [Pro Git book](https://git-scm.com/book/en/v2), which is an excellent resource for learning about Git.

Leave a comment below if you encounter any issues or have feedback.

---

Related Tutorials:

- [How to Install Gitea on CentOS 8](https://linuxize.com/post/how-to-install-gitea-on-centos-8/)
- [How to Install Git on CentOS 8](https://linuxize.com/post/how-to-install-git-on-centos-8/)
- [How to Install and Configure GitLab on CentOS 7](https://linuxize.com/post/how-to-install-and-configure-gitlab-on-centos-7/)
- [How to Install Git on CentOS 7](https://linuxize.com/post/how-to-install-git-on-centos-7/)
- [How to Undo Last Git Commit](https://linuxize.com/post/undo-last-git-commit/)
- [Install Odoo 14 on CentOS 8](https://linuxize.com/post/how-to-install-odoo-14-on-centos-8/)
- [How to Install Slack on CentOS 8](https://linuxize.com/post/how-to-install-slack-on-centos-8/)

