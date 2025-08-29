+++
title = "Linux cat Command"
date = 2025-08-29T20:03:23.930+01:00
draft = false
description = "Linux tutorial on the cat command, covering basic and advanced file display with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux cat Command

last modified February 25, 2025

The cat command in Linux is used to concatenate and display the
contents of files. It is a versatile tool for viewing, creating, and combining
files directly from the command line. This tutorial covers basic and advanced
usage of cat with practical examples.

cat is commonly used for displaying file contents, creating new
files, and appending data to existing files.

## Display File Contents

This example demonstrates how to display the contents of a file.

display_file.sh
  

cat filename.txt

The cat command outputs the contents of filename.txt
to the terminal.

## Display Multiple Files

This example shows how to display the contents of multiple files sequentially.

display_multiple_files.sh
  

cat file1.txt file2.txt

The cat command concatenates and displays the contents of
file1.txt and file2.txt.

## Create a New File

This example demonstrates how to create a new file using cat.

create_file.sh
  

cat &gt; newfile.txt

The &gt; operator redirects input to newfile.txt. Type
the content and press Ctrl+D to save and exit.

## Append to a File

This example shows how to append text to an existing file.

append_to_file.sh
  

cat &gt;&gt; existingfile.txt

The &gt;&gt; operator appends input to existingfile.txt.
Type the content and press Ctrl+D to save and exit.

## Combine Files

This example demonstrates how to combine multiple files into a single file.

combine_files.sh
  

cat file1.txt file2.txt &gt; combined.txt

The &gt; operator redirects the concatenated output to
combined.txt.

## Display Line Numbers

This example shows how to display file contents with line numbers.

display_line_numbers.sh
  

cat -n filename.txt

The -n option adds line numbers to the output.

## Advanced: Display Non-Printable Characters

This example demonstrates how to display non-printable characters in a file.

non_printable_characters.sh
  

cat -v filename.txt

The -v option displays non-printable characters in a visible
format.

## Best Practices for cat

- **Use for Small Files:** Use cat for small files to avoid overwhelming the terminal.

- **Combine with Other Commands:** Use cat with commands like grep or less for advanced processing.

- **Redirect Output:** Use &gt; and &gt;&gt; to create or modify files.

- **Check File Contents:** Use cat to quickly verify file contents before processing.

## Source

[GNU cat Manual](https://www.gnu.org/software/coreutils/manual/html_node/cat-invocation.html)

In this article, we have explored various examples of using the cat
command for displaying, creating, and combining files, including advanced
features like line numbers and non-printable characters.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).