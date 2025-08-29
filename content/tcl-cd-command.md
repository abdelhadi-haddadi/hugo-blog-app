+++
title = "Tcl cd Command"
date = 2025-08-29T20:12:53.475+01:00
draft = false
description = "Tcl cd command tutorial shows how to change directories in Tcl. Learn cd with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl cd Command

last modified April 3, 2025

The Tcl cd command is used to change the current working directory.
It's essential for file operations in Tcl scripts. The command affects all
subsequent file operations.

## Basic Definition

The cd command changes the current working directory to the specified
path. It's equivalent to the cd command in Unix shells or Windows command prompt.

Syntax: cd ?dirName?. With no arguments, it changes to the home
directory. With an argument, it changes to the specified directory.

## Changing to a Specific Directory

This shows the basic usage of cd to navigate to a specific directory.

basic_cd.tcl
  

cd /home/user/documents
puts [pwd]

This changes the current directory to /home/user/documents. The pwd
command prints the current working directory to verify the change.

## Changing to Home Directory

The cd command without arguments changes to the user's home directory.

cd_home.tcl
  

cd
puts "Current directory: [pwd]"

This demonstrates how to return to the home directory. The pwd command
shows the path of the home directory after the change.

## Relative Path Navigation

The cd command can use relative paths to navigate the directory tree.

cd_relative.tcl
  

cd ..
puts "Moved up to parent directory: [pwd]"
cd subfolder
puts "Moved down to subfolder: [pwd]"

This first moves up one directory level using .., then moves into
a subfolder. Each change is verified with pwd.

## Error Handling

The cd command can fail if the directory doesn't exist or isn't accessible.

cd_error.tcl
  

if {[catch {cd /nonexistent/path} err]} {
    puts "Error changing directory: $err"
}

This shows how to handle errors when changing directories. The catch
command prevents the script from terminating on error and captures the error message.

## Combining with file Commands

The cd command is often used with other file operations.

cd_with_file.tcl
  

cd /tmp
set files [glob *]
puts "Files in /tmp: $files"

This changes to the /tmp directory and lists all files there using glob.
The directory change affects where glob looks for files.

## Temporary Directory Change

The cd command can be used temporarily within a specific scope.

cd_temporary.tcl
  

set original_dir [pwd]
cd /var/log
puts "Temporarily in: [pwd]"
cd $original_dir
puts "Back to original: [pwd]"

This stores the original directory, changes to /var/log temporarily, then returns.
This pattern is useful for operations that need to run in a specific directory.

## Best Practices

- **Absolute paths:** Use absolute paths for reliability.

- **Error checking:** Always check for errors when changing dirs.

- **Restore state:** Return to original directory when done.

- **Platform independence:** Use file join for cross-platform paths.

- **Documentation:** Document directory dependencies in scripts.

 

This tutorial covered the Tcl cd command with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).