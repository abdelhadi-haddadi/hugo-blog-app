+++
title = "Linux sort Command"
date = 2025-08-29T20:03:31.826+01:00
draft = false
description = "Linux tutorial on the sort command, covering basic and advanced text sorting with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux sort Command

last modified March 3, 2025

The sort command in Linux is used to sort lines of text files. 
It can sort alphabetically, numerically, and by other criteria. This tutorial 
covers basic and advanced usage of sort with practical examples.

sort is commonly used for organizing data, removing duplicates, 
and preparing data for further processing.

## Basic Sorting

This example demonstrates how to sort the contents of a file alphabetically.

sort filename.txt

The sort command sorts the lines in filename.txt 
and outputs the result to the terminal.

## Sort Numerically

This example shows how to sort a file numerically.

sort -n numbers.txt

The -n option sorts the lines in numbers.txt 
as numbers instead of text.

## Reverse Sorting

This example demonstrates how to sort a file in reverse order.

sort -r filename.txt

The -r option sorts the lines in filename.txt 
in descending order.

## Sort by Specific Column

This example shows how to sort a file by a specific column.

sort -k 2 data.txt

The -k 2 option sorts data.txt by the second column.

## Remove Duplicates

This example demonstrates how to remove duplicate lines while sorting.

sort -u filename.txt

The -u option removes duplicate lines from the sorted output.

## Sort by Month Names

This example shows how to sort a file containing month names.

sort -M months.txt

The -M option sorts months.txt by month names.

## Sort Human-Readable Numbers

This example demonstrates how to sort human-readable numbers like 1K, 2M, etc.

sort -h sizes.txt

The -h option sorts sizes.txt by human-readable numbers.

## Sort and Save to a File

This example shows how to sort a file and save the output to another file.

sort filename.txt &gt; sorted.txt

The &gt; operator redirects the sorted output to sorted.txt.

## Sort with Case Insensitivity

This example demonstrates how to sort a file while ignoring case.

sort -f filename.txt

The -f option sorts filename.txt case-insensitively.

## Sort by Version Numbers

This example shows how to sort a file containing version numbers.

sort -V versions.txt

The -V option sorts versions.txt by version numbers.

## Best Practices for sort

- **Use for Large Files:** Use sort for large files to organize data efficiently.

- **Combine with Other Commands:** Use sort with commands like uniq or cut for advanced processing.

- **Check for Duplicates:** Use -u to remove duplicates during sorting.

- **Use Appropriate Options:** Choose options like -n, -r, or -k based on your sorting needs.

## Source

[GNU sort Manual](https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html)

In this article, we have explored various examples of using the sort
command for sorting text files, including advanced features like numeric sorting,
reverse sorting, and removing duplicates.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).