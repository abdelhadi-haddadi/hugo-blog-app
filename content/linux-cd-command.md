+++
title = "Linux cd Command"
date = 2025-08-29T20:03:23.926+01:00
draft = false
description = "Linux tutorial on the cd command, covering basic and advanced usage with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux cd Command

last modified February 25, 2025

The cd command in Linux is used to change the current working
directory in the terminal. It is one of the most frequently used commands for
navigating the file system. This tutorial covers basic and advanced usage of
cd with practical examples.

cd is essential for moving between directories, accessing files,
and organizing workflows in the command line.

## Basic Usage

This example navigates to a project folder.

basic_usage.sh
  

cd /home/user/projects

The cd command changes the current directory to
/home/user/projects. This is an absolute path starting from the
root (/). If the path exists and you have permission, the shell
updates your current working directory. Use pwd after to verify
the change (e.g., outputs /home/user/projects).

## Change to Home Directory

This moves to your personal home directory.

home_directory.sh
  

cd ~

The ~ symbol is a shorthand for the current user's home directory,
typically /home/username. It's useful for quickly returning to
your personal space from anywhere in the file system. For root, it's usually
/root. Running echo $HOME shows the same path.

## Change to Parent Directory

This moves up to the directory containing the current one.

parent_directory.sh
  

cd ..

The .. symbol refers to the parent directory of your current
location. For example, if you're in /home/user/docs, this takes
you to /home/user. You can chain it (e.g., cd ../..)
to go up multiple levels. It's handy for stepping back in the hierarchy.

## Change to Previous Directory

This toggles back to the last directory visited.

previous_directory.sh
  

cd -

The - symbol recalls the previous working directory stored in the
$OLDPWD variable. If you were in /var/log, then ran
cd /etc, cd - returns you to /var/log.
It also prints the destination path. Great for switching between two locations.

## Change to Root Directory

This jumps to the top of the file system.

root_directory.sh
  

cd /

The / symbol denotes the root directory, the base of the entire
Linux file system. Running this places you at /, where core
directories like bin, etc, and var reside.
It's useful for starting navigation from the top or accessing system files.

## Change to a Subdirectory

This enters a folder within the current directory.

subdirectory.sh
  

cd downloads

The cd command here uses a relative path, moving to the
downloads subdirectory of your current location. If you're in
/home/user, it takes you to /home/user/downloads,
assuming it exists. No leading slash means it's relative to your current path.

## Advanced: Using Environment Variables

This uses a variable to reach the documents folder.

environment_variables.sh
  

cd $HOME/Documents

The $HOME variable holds your home directory path (e.g.,
/home/user). Appending /Documents navigates to
/home/user/Documents. Environment variables make scripts portable
and flexible. You can define custom ones (e.g., export WORK=/work)
and use them similarly.

## Example: Multiple Directory Jumps

This chains commands to navigate deeply nested paths.

multi_jump.sh
  

cd ../../usr/local/bin

This moves up two levels then down through usr/local/bin. If you
start in /home/user/docs/text, .. takes you to
/home/user/docs, then .. to /home/user,
and usr/local/bin lands you at /usr/local/bin. It's
a relative path combining parent and subdirectory navigation.

## Example: Using Spaces in Paths

This handles directories with spaces in their names.

spaces_in_path.sh
  

cd "~/My Documents"

Directories with spaces need quotes or escaping. Here, "~/My Documents"
expands to /home/user/My Documents. Without quotes, cd
would interpret My and Documents as separate arguments
and fail. Alternatively, cd ~/My\ Documents with a backslash works
too. Essential for real-world file names.

## Example: Combining with Commands

This navigates and lists contents in one line.

combine_commands.sh
  

cd /etc &amp;&amp; ls

The &amp;&amp; operator runs cd /etc and, if successful,
executes ls to list files in /etc. This chaining
saves time and confirms the directory change. If cd fails (e.g.,
no permissions), ls won't run. You could also use
cd /etc; ls with a semicolon to run regardless of success.

## Best Practices for cd

- **Use Absolute Paths:** Use absolute paths for reliable navigation.

- **Leverage Shortcuts:** Use ~, .., and - for quick navigation.

- **Check Current Directory:** Use pwd to confirm the current directory.

- **Combine with Other Commands:** Use cd with commands like ls to explore directories.

## Source

[GNU Bash Manual](https://www.gnu.org/software/bash/manual/bash.html)

In this article, we have explored various examples of using the cd
command for navigating the file system, including changing to home, parent,
previous, and root directories.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).