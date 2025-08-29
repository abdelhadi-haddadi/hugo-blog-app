+++
title = "Python sys Module"
date = 2025-08-29T20:10:53.491+01:00
draft = false
description = "Python sys module tutorial shows how to use the sys module for system-specific tasks in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sys Module

last modified July 15, 2024

In this article we show how to use the sys module in Python. The
sys module provides access to system-specific parameters and
functions, such as command-line arguments, interpreter settings, and runtime
environment details.

The sys module is part of the Python standard library and is
commonly used for tasks like:

  - Accessing command-line arguments.

  - Exiting the program.

  - Interacting with the Python interpreter.

  - Manipulating the Python path.

## Accessing Command-Line Arguments

The following example demonstrates how to use the sys.argv list to
access command-line arguments passed to a Python script.

main.py
  

import sys

def main():
    print("Script name:", sys.argv[0])  # The script name is always the first argument
    print("Arguments passed:", sys.argv[1:])  # Remaining arguments

if __name__ == "__main__":
    main()

In this program, the sys.argv list is used to access the script
name and any additional arguments passed to the script.

print("Script name:", sys.argv[0])

The first element of sys.argv is always the name of the script.

print("Arguments passed:", sys.argv[1:])

The remaining elements of sys.argv are the arguments passed to the script.

$ python main.py arg1 arg2 arg3
Script name: main.py
Arguments passed: ['arg1', 'arg2', 'arg3']

## Exiting the Program

The following example demonstrates how to use the sys.exit function
to exit a Python program with a specific exit code.

main.py
  

import sys

def main():
    print("Starting the program")
    sys.exit(1)  # Exit with code 1
    print("This will not be printed")

if __name__ == "__main__":
    main()

In this program, the sys.exit function is used to terminate the
program with an exit code of 1.

sys.exit(1)

The sys.exit function terminates the program and returns the
specified exit code to the operating system.

$ python main.py
Starting the program

## Interacting with the Python Interpreter

The following example demonstrates how to use the sys module to
interact with the Python interpreter, such as retrieving the Python version and
executable path.

main.py
  

import sys

def main():
    print("Python version:", sys.version)
    print("Python executable path:", sys.executable)

if __name__ == "__main__":
    main()

In this program, the sys.version and sys.executable
attributes are used to retrieve the Python version and the path to the Python
interpreter, respectively.

print("Python version:", sys.version)

The sys.version attribute provides information about the Python version.

print("Python executable path:", sys.executable)

The sys.executable attribute provides the path to the Python
interpreter executable.

$ python main.py
Python version: 3.12.7 (tags/v3.12.7:0b05ead, Oct  1 2024, 03:06:41) [MSC v.1941 64 bit (AMD64)]
Python executable path: C:\Users\Jano\AppData\Local\Programs\Python\Python312\python.exe

## Manipulating the Python Path

The following example demonstrates how to use the sys.path list to
manipulate the Python path, which is used to locate modules.

main.py
  

import sys

def main():
    print("Original Python path:", sys.path)
    sys.path.append("/custom/module/path")  # Add a custom path
    print("Updated Python path:", sys.path)

if __name__ == "__main__":
    main()

In this program, the sys.path list is modified to include a custom
module path.

sys.path.append("/custom/module/path")

The sys.path list is modified to include a custom path where Python
will search for modules.

## Redirecting Standard Output

The following example demonstrates how to redirect standard output and error streams using the sys.stdout and sys.stderr objects.

main.py
  

import sys

def main():
    # Redirect standard output to a file
    with open("output.txt", "w") as f:
        sys.stdout = f  # Redirect stdout to the file
        print("This will be written to output.txt")
        sys.stdout = sys.__stdout__  # Restore stdout

    # Redirect standard error to a file
    with open("error.txt", "w") as f:
        sys.stderr = f  # Redirect stderr to the file
        print("This will be written to error.txt", file=sys.stderr)
        sys.stderr = sys.__stderr__  # Restore stderr

    print("Output and error streams have been restored")

if __name__ == "__main__":
    main()

In this program, the sys.stdout and sys.stderr objects are temporarily redirected to files. After the redirection, the original streams are restored.

sys.stdout = f  # Redirect stdout to the file

The sys.stdout object is temporarily replaced with a file object to
redirect output.

sys.stdout = sys.__stdout__  # Restore stdout

The original sys.stdout is restored after the redirection.

$ python main.py
Output and error streams have been restored
$ cat output.txt
This will be written to output.txt
$ cat error.txt
This will be written to error.txt

## Getting System-Specific Information

The following example demonstrates how to use the sys module to
retrieve system-specific information, such as the platform and maximum integer
size.

main.py
  

import sys

def main():
    print("Platform:", sys.platform)  # Operating system platform
    print("Maximum integer size:", sys.maxsize)  # Maximum size of integers
    print("Byte order:", sys.byteorder)  # Byte order (little-endian or big-endian)

if __name__ == "__main__":
    main()

In this program, the sys.platform, sys.maxsize, and
sys.byteorder attributes are used to retrieve system-specific
information.

print("Platform:", sys.platform)

The sys.platform attribute provides information about the operating
system platform.

print("Maximum integer size:", sys.maxsize)

The sys.maxsize attribute provides the maximum size of integers
supported by the platform.

print("Byte order:", sys.byteorder)

The sys.byteorder attribute indicates the native byte order
(little-endian or big-endian).

$ python main.py
Platform: linux
Maximum integer size: 9223372036854775807
Byte order: little

## Handling Recursion Limit

The following example demonstrates how to use the sys module to get
and set the recursion limit in Python.

main.py
  

import sys

def recursive_function(n):
    if n == 0:
        return
    recursive_function(n - 1)

def main():
    print("Current recursion limit:", sys.getrecursionlimit())  # Get current recursion limit
    sys.setrecursionlimit(2000)  # Set a new recursion limit
    print("New recursion limit:", sys.getrecursionlimit())

    try:
        recursive_function(1500)  # Test recursion
        print("Recursion completed successfully")
    except RecursionError:
        print("Recursion limit exceeded")

if __name__ == "__main__":
    main()

In this program, the sys.getrecursionlimit and
sys.setrecursionlimit functions are used to get and set the
recursion limit in Python.

print("Current recursion limit:", sys.getrecursionlimit())

The sys.getrecursionlimit function retrieves the current recursion limit.

sys.setrecursionlimit(2000)  # Set a new recursion limit

The sys.setrecursionlimit function sets a new recursion limit.

recursive_function(1500)  # Test recursion

A recursive function is called to test the recursion limit.

$ python main.py
Current recursion limit: 1000
New recursion limit: 2000
Recursion completed successfully

## Source

[Python sys Module - documentation](https://docs.python.org/3/library/sys.html)

In this article we have shown how to use the sys module for system-specific tasks in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).