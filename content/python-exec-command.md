+++
title = "Python exec command"
date = 2025-08-29T20:08:28.437+01:00
draft = false
description = "Python exec tutorial shows how to execute shell commands and programs in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python exec command

last modified January 29, 2024

Python exec tutorial shows how to execute shell commands and programs in Python.

In Python, there are several ways to execute shell commands or programs. 
We can use the os module or the subprocess module.

The subprocess module has the most powerful tools for executing 
commands. 

## Python exec command with os.system

The os.system is a simple tool for executing a program.

simple.py
  

#!/usr/bin/python

import os

os.system('firefox')

The example launches firefox. 

## Python exec command with os.popen

The os.popen allows us to receive input from the executed command. 
It opens a pipe to or from a command. The return value is an open file object
connected to the pipe, which can be read or written depending on whether
mode is 'r' (default) or 'w'. 

read_output.py
  

#!/usr/bin/python

import os

output = os.popen('ls -la').read()
print(output)

In the example, we read the output of the ls command and print it
to the console.

$ ./read_output.py 
total 28
drwxr-xr-x   2 janbodnar janbodnar 4096 Oct 11 14:30 .
drwxr-xr-x 113 janbodnar janbodnar 4096 Oct 11 13:35 ..
-rwxr-xr-x   1 janbodnar janbodnar  202 Oct 11 14:02 listing.py
-rwxr-xr-x   1 janbodnar janbodnar  218 Oct 11 13:54 node_version.py
-rwxr-xr-x   1 janbodnar janbodnar  547 Oct 11 14:04 pinging.py
-rwxr-xr-x   1 janbodnar janbodnar   78 Oct 11 13:39 read_output.py
-rwxr-xr-x   1 janbodnar janbodnar   50 Oct 11 13:37 simple.py

## Python exec command with subprocess

The subprocess module allows us to spawn new processes, connect to their
input/output/error pipes, and obtain their return codes. This module intends to
replace several older modules and functions.

node_version.py
  

#!/usr/bin/python

import subprocess
 
output = subprocess.run(['node', '--version'], text=True, capture_output=True)
 
print(f'Node version:  {output.stdout.strip()}')

The example uses subprocess module to get the version of Node.

output = subprocess.run(['node', '--version'], text=True, capture_output=True)

The run executes the command, waits for command to complete, and 
returns a CompletedProcess instance. To capture output to 
standard output and standard error output, we set the capture_output
to true. By default, the output is returned in bytes string. 
By setting the text option to True, we get a normal 
string.

$ ./node_version.py 
Node version:  v12.18.4

## Python list contents with subprocess

In the following example, we list the contents of a user's home directory.

listing.py
  

#!/usr/bin/python

import subprocess
from pathlib import Path

output = subprocess.Popen(['ls', '-l', Path.home()], text=True,
    stdout=subprocess.PIPE)

stdout, _ = output.communicate()
print(stdout)

The underlying process creation and management in this module is handled by the
Popen class. It offers more flexibility than the convenience
functions.

stdout, _ = output.communicate()

We interact with the process with the communicate method. 
It sends data to stdin and reads data from stdout and stderr, until EOF is 
reached. 

## Source

[Python Subprocess management](https://docs.python.org/3/library/subprocess.html)

In this article we have executed shell commands and programs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).