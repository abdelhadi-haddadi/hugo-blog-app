+++
title = "Linux rm Command"
date = 2025-08-29T20:03:30.715+01:00
draft = false
description = "Linux tutorial on the rm command, covering basic and advanced file and directory deletion with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux rm Command

last modified February 25, 2025

The rm command in Linux is used to remove files and directories.
It is a powerful tool for cleaning up the file system, but it should be used
with caution as deleted files cannot be easily recovered. This tutorial covers
basic and advanced usage of rm with practical examples.

rm is commonly used for deleting individual files, multiple files,
and even entire directories. It supports various options for controlling its
behavior.

## Delete a Single File

This removes a temporary log file.

delete_file.sh
  

rm temp.log

The rm command deletes temp.log from the current
directory. It's a straightforward operation that requires no options if the
file exists and you have write permissions. No output is shown unless an error
occurs (e.g., "file not found"). Unlike some systems, there's no recycle bin,
so the file is gone permanently.

## Delete Multiple Files

This clears out old backup files.

delete_multiple_files.sh
  

rm backup1.tar backup2.tar backup3.tar

The rm command removes backup1.tar,
backup2.tar, and backup3.tar in one go. List files
space-separated; they can be in the current directory or full paths (e.g.,
/tmp/backup1.tar). If one file doesn't exist, rm
reports an error but continues with the rest. Use ls first to
confirm targets.

## Delete a Directory

This removes an empty project folder.

delete_directory.sh
  

rmdir old_project

The rmdir command deletes old_project only if it's
empty. It's safer than rm -r because it fails if contents exist,
preventing accidental data loss. If you get "Directory not empty," use
ls -a old_project to check for hidden files, or switch to
rm -r for non-empty directories. Requires write permission on the
parent directory.

## Delete a Directory Recursively

This wipes out a folder and all its contents.

delete_recursive.sh
  

rm -r temp_files

The -r (recursive) option makes rm delete
temp_files and everything inside it—subdirectories, files, and
hidden items. It's powerful but risky; there's no undo. Use ls -R
temp_files first to review contents. If protected files (e.g., read-only)
are present, rm may prompt unless combined with -f.

## Force Deletion

This deletes a read-only file without prompts.

force_delete.sh
  

rm -f config.bak

The -f (force) option tells rm to remove
config.bak silently, bypassing prompts even for write-protected
files. Useful in scripts or when you're certain of the action. Without
-f, rm might ask "remove write-protected file?" Be
cautious—combining with -r (e.g., rm -rf) can erase
large structures instantly. Check with ls beforehand.

## Interactive Deletion

This safely removes logs with confirmation.

interactive_delete.sh
  

rm -i error.log debug.log

The -i (interactive) option prompts for each file, e.g., "remove
error.log? (y/n)". Type y to delete, n to skip. It's
a safeguard against accidental deletions, especially with wildcards or
multiple files. For many files, this can get tedious—use -I instead
for a single prompt per command. Ideal for careful cleanup tasks.

## Advanced: Delete Files Matching a Pattern

This clears all temporary files in a directory.

delete_pattern.sh
  

rm *.tmp

The *.tmp wildcard matches all files ending in .tmp
(e.g., file1.tmp, temp.tmp) in the current directory.
The shell expands the pattern before rm runs, so echo
*.tmp previews the list. If no matches exist, rm errors
unless -f is used. Use quotes (e.g., "*.tmp") if
filenames have spaces.

## Example: Delete Old Logs by Date

This removes logs older than a certain date.

delete_old_logs.sh
  

find . -name "*.log" -mtime +30 -exec rm {} \;

This combines find and rm to delete .log
files older than 30 days. -mtime +30 filters by modification time,
-exec rm {} \; runs rm on each match. Run
find . -name "*.log" -mtime +30 first to preview. Use -f
with rm (e.g., rm -f) to skip prompts. Great for log
rotation cleanup.

## Example: Remove Hidden Files

This deletes hidden dot files in a directory.

delete_hidden.sh
  

rm .*.swp

The .*.swp pattern targets hidden swap files (e.g.,
.file.swp) created by editors like Vim. Hidden files start with a
dot; ls -a reveals them. Be cautious—.* alone matches
. and .., risking parent directory issues. Preview
with ls -a .*.swp. Useful for clearing editor artifacts.

## Example: Verbose Deletion

This removes files and shows what's deleted.

verbose_delete.sh
  

rm -v *.bak

The -v (verbose) option makes rm print each deleted
file, e.g., "removed 'backup.bak'". Applied to *.bak, it lists all
.bak files as they're removed. Helpful for auditing or debugging
scripts. Combine with -r or -f as needed (e.g.,
rm -rv dir). Use ls *.bak first to confirm targets.

## Best Practices for rm

- **Use Caution:** Double-check files and directories before deleting, as recovery is difficult.

- **Use -i for Safety:** Use the -i option for interactive deletion to avoid mistakes.

- **Backup Important Data:** Always backup important files before performing bulk deletions.

- **Combine with find:** Use find with rm for advanced file deletion tasks.

## Source

[GNU rm Manual](https://www.gnu.org/software/coreutils/manual/html_node/rm-invocation.html)

In this article, we have explored various examples of using the rm
command for deleting files and directories, including recursive deletion, force
deletion, and interactive deletion.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).