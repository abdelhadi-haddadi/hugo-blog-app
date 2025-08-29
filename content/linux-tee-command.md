+++
title = "Linux tee Command"
date = 2025-08-29T20:03:32.936+01:00
draft = false
description = "Linux tutorial on the tee command, covering basic and advanced output redirection with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux tee Command

last modified March 3, 2025

The tee command in Linux is used to read from standard input and
write to both standard output and one or more files simultaneously. It is a
powerful tool for redirecting output to multiple destinations. This tutorial
covers basic and advanced usage of tee with practical examples.

tee is commonly used for logging, debugging, and splitting output
streams.

## Basic Usage

This example demonstrates how to use tee to write output to a file
while displaying it on the terminal.

echo "Hello, World!" | tee output.txt

The tee command writes "Hello, World!" to output.txt
and displays it on the terminal.

## Append to a File

This example shows how to append output to a file using tee.

echo "New line" | tee -a output.txt

The -a option appends the output to output.txt instead
of overwriting it.

## Write to Multiple Files

This example demonstrates how to write output to multiple files simultaneously.

echo "Multiple files" | tee file1.txt file2.txt

The tee command writes the output to both file1.txt and
file2.txt.

## Combine with Other Commands

This example shows how to use tee with other commands like
grep.

ls -l | tee files.txt | grep ".txt"

The ls -l output is saved to files.txt and filtered
for lines containing ".txt".

## Ignore Interrupts

This example demonstrates how to ignore interrupt signals using tee.

ping example.com | tee -i ping.log

The -i option ensures tee continues writing even if
interrupted.

## Suppress Output

This example shows how to suppress terminal output while writing to a file.

echo "No terminal output" | tee output.txt &gt; /dev/null

The output is written to output.txt but not displayed on the
terminal.

## Write to a File and Pipe

This example demonstrates how to write to a file and pipe output to another
command.

echo "Pipe and file" | tee output.txt | wc -l

The output is written to output.txt and piped to wc -l
to count lines.

## Use with sudo

This example shows how to use tee with sudo to write
to protected files.

echo "New line" | sudo tee -a /etc/hosts

The sudo command allows writing to /etc/hosts.

## Best Practices for tee

- **Use for Logging:** Use tee to log output while viewing it.

- **Combine with Pipes:** Use tee to split output streams for further processing.

- **Append Safely:** Use -a to append data without overwriting files.

- **Ignore Interrupts:** Use -i for uninterrupted logging.

## Source

[GNU tee Manual](https://www.gnu.org/software/coreutils/manual/html_node/tee-invocation.html)

In this article, we have explored various examples of using the tee
command for redirecting output to files and terminals, including advanced
features like appending and ignoring interrupts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).