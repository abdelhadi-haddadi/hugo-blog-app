+++
title = "Linux od Command"
date = 2025-08-29T20:03:29.532+01:00
draft = false
description = "Linux tutorial on the od command, covering basic and advanced file inspection with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux od Command

last modified March 3, 2025

The od command in Linux is used to display the contents of a file
in various formats, such as octal, hexadecimal, or ASCII. It is a powerful tool
for inspecting binary files or understanding the raw data of a file. This
tutorial covers basic and advanced usage of od with practical
examples.

od is commonly used for debugging, analyzing binary files, and
understanding file structures.

## Display File in Octal Format

This example demonstrates how to display the contents of a file in octal format.

od filename.txt

The od command outputs the contents of filename.txt
in octal format by default.

## Display File in Hexadecimal Format

This example shows how to display the contents of a file in hexadecimal format.

od -x filename.txt

The -x option outputs the file contents in hexadecimal format.

## Display File in ASCII Format

This example demonstrates how to display the contents of a file in ASCII format.

od -c filename.txt

The -c option outputs the file contents in ASCII format, showing
printable characters and escape sequences.

## Display File with Offset

This example shows how to display file contents with an offset.

od -A x -t x1 filename.txt

The -A x option displays the offset in hexadecimal, and
-t x1 shows each byte in hexadecimal format.

## Display File in Decimal Format

This example demonstrates how to display the contents of a file in decimal
format.

od -t d1 filename.txt

The -t d1 option outputs the file contents in decimal format.

## Display File with Custom Format

This example shows how to display file contents in a custom format.

od -t o2 filename.txt

The -t o2 option outputs the file contents in octal format, with
2 bytes per line.

## Display File with No Offset

This example demonstrates how to display file contents without an offset.

od -A n filename.txt

The -A n option hides the offset in the output.

## Display File with Limited Bytes

This example shows how to display only the first few bytes of a file.

od -N 16 filename.txt

The -N 16 option limits the output to the first 16 bytes of the
file.

## Display File with Custom Byte Grouping

This example demonstrates how to display file contents with custom byte grouping.

od -t x4 filename.txt

The -t x4 option groups the output into 4-byte hexadecimal
values.

## Display File with Multiple Formats

This example shows how to display file contents in multiple formats
simultaneously.

od -t x1 -t c filename.txt

The -t x1 and -t c options display the file in
hexadecimal and ASCII formats side by side.

## Best Practices for od

- **Use for Binary Files:** Use od to inspect binary files and understand their structure.

- **Combine with Other Commands:** Use od with commands like grep or less for advanced processing.

- **Customize Output:** Use options like -t and -A to customize the output format.

- **Limit Output:** Use -N to limit the output for large files.

## Source

[GNU od Manual](https://www.gnu.org/software/coreutils/manual/html_node/od-invocation.html)

In this article, we have explored various examples of using the od
command for inspecting file contents in different formats, including octal,
hexadecimal, and ASCII.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).