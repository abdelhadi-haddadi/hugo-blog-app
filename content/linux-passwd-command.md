+++
title = "Linux passwd Command"
date = 2025-08-29T20:03:30.724+01:00
draft = false
description = "Linux tutorial on the passwd command, covering basic and advanced password management with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux passwd Command

last modified March 3, 2025

The passwd command in Linux is used to manage user passwords. It allows users to change their own passwords and administrators to manage passwords for other users. This tutorial covers basic and advanced usage of passwd with practical examples.

passwd is essential for maintaining system security by ensuring strong password policies and managing user access.

## Change Your Password

This example demonstrates how to change your own password.

passwd

The passwd command prompts you to enter your current password and then set a new one.

## Change Another User's Password

This example shows how an administrator can change another user's password.

sudo passwd username

Replace username with the target user's name. The administrator is prompted to enter a new password.

## Lock a User Account

This example demonstrates how to lock a user account.

sudo passwd -l username

The -l option locks the account, preventing the user from logging in.

## Unlock a User Account

This example shows how to unlock a previously locked user account.

sudo passwd -u username

The -u option unlocks the account, allowing the user to log in again.

## Set Password Expiry

This example demonstrates how to set a password expiry date for a user.

sudo passwd -e username

The -e option forces the user to change their password at the next login.

## Display Password Status

This example shows how to display the password status for a user.

sudo passwd -S username

The -S option provides information about the password's status, including whether it is locked or active.

## Delete a User's Password

This example demonstrates how to delete a user's password.

sudo passwd -d username

The -d option removes the password, allowing the user to log in without one.

## Force Password Change at Next Login

This example shows how to force a user to change their password at the next login.

sudo passwd -e username

The -e option ensures the user must update their password immediately.

## Set Minimum Password Age

This example demonstrates how to set a minimum password age.

sudo passwd -n 7 username

The -n option sets the minimum number of days before the password can be changed again.

## Set Maximum Password Age

This example shows how to set a maximum password age.

sudo passwd -x 90 username

The -x option sets the maximum number of days the password is valid.

## Best Practices for passwd

- **Use Strong Passwords:** Always enforce strong password policies to enhance security.

- **Regularly Update Passwords:** Encourage users to update passwords periodically.

- **Lock Inactive Accounts:** Lock accounts of users who no longer need access.

- **Monitor Password Status:** Regularly check password statuses for compliance.

## Source

[Linux passwd Manual](https://man7.org/linux/man-pages/man1/passwd.1.html)

In this article, we have explored various examples of using the passwd
command for managing user passwords, including locking, unlocking, and setting password policies.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).