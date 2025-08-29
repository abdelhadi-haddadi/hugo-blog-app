+++
title = "C fputs function"
date = 2025-08-27T23:22:13.411+01:00
draft = false
description = "Learn file output in C with this comprehensive fputs tutorial. Explore practical examples and best practices for efficient file writing operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C fputs function

last modified April 6, 2025

File output operations are essential in C programming for writing data to files.
The fputs function provides a simple way to write strings to files.
This tutorial explores fputs in depth, covering its syntax, usage,
and practical examples. You'll learn how to write strings to files efficiently
and handle common scenarios in file output operations.

## What Is fputs?

The fputs function writes a string to a specified output stream. It
takes two parameters: the string to write and the file pointer. Unlike
puts, fputs doesn't add a newline character
automatically. It returns a non-negative value on success or EOF
on error. Always check the return value to ensure successful write operations.

## Basic fputs Example

This example demonstrates the simplest use of fputs to write a
string to a file.

basic_fputs.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("output.txt", "w");
    
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    if (fputs("Hello, World!", fp) == EOF) {
        perror("Error writing to file");
    }
    
    fclose(fp);
    return 0;
}

This code opens "output.txt" in write mode, writes "Hello, World!" using
fputs, and closes the file. Note that fputs doesn't
add a newline. The return value is checked against EOF to detect
write errors. Always close files with fclose to ensure data is
flushed.

## Writing Multiple Lines with fputs

Learn how to write multiple lines to a file using fputs with
explicit newline characters.

multiline_fputs.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("lines.txt", "w");
    
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    fputs("First line\n", fp);
    fputs("Second line\n", fp);
    fputs("Third line\n", fp);
    
    fclose(fp);
    return 0;
}

This example writes three lines to "lines.txt". Each fputs call
includes an explicit newline character (\n). Without these, all
text would appear on one line. The file is opened in write mode ("w"), which
creates a new file or truncates an existing one.

## Appending to a File with fputs

Use fputs in append mode to add content to an existing file without
overwriting it.

append_fputs.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("log.txt", "a");
    
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    fputs("New log entry\n", fp);
    
    fclose(fp);
    return 0;
}

Append mode ("a") positions the file pointer at the end of the file before each
write. This example adds a new line to "log.txt" without affecting existing
content. If the file doesn't exist, it will be created. This is ideal for log
files or data collection.

## Writing to Standard Output with fputs

fputs can write to different streams, including standard output
(stdout).

stdout_fputs.c
  

#include &lt;stdio.h&gt;

int main() {
    if (fputs("This goes to the console\n", stdout) == EOF) {
        perror("Error writing to stdout");
        return 1;
    }
    
    return 0;
}

This example uses fputs with stdout to display text on
the console. Unlike puts, you must include the newline character
explicitly. The return value is checked for errors, though console output errors
are rare. This technique is useful for consistent output handling.

## Error Handling with fputs

Proper error handling ensures robust file operations. This example demonstrates
comprehensive error checking.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;errno.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "w");
    
    if (fp == NULL) {
        perror("fopen failed");
        return 1;
    }
    
    if (fputs("Important data", fp) == EOF) {
        perror("fputs failed");
        fclose(fp);
        return 1;
    }
    
    if (fclose(fp) == EOF) {
        perror("fclose failed");
        return 1;
    }
    
    return 0;
}

This code checks for errors at each step: file opening, writing, and closing.
The perror function provides descriptive error messages based on
errno. Even fclose can fail (when flushing buffers),
so its return value should be checked. This approach prevents silent failures.

## Writing Formatted Strings with fputs

Combine sprintf with fputs to write formatted data to
files.

formatted_fputs.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("report.txt", "w");
    char buffer[100];
    int value = 42;
    
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    sprintf(buffer, "The answer is: %d\n", value);
    fputs(buffer, fp);
    
    fclose(fp);
    return 0;
}

This example formats a string with sprintf before writing it using
fputs. The formatted string includes a variable value and a
newline. Ensure your buffer is large enough to hold the formatted string. This
technique offers more flexibility than fprintf in some scenarios.

## Binary File Writing with fputs

While fputs is designed for text, it can write binary data with
careful handling.

binary_fputs.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.bin", "wb");
    char data[] = {0x48, 0x65, 0x6C, 0x6C, 0x6F}; // "Hello" in ASCII
    
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    // Write as null-terminated string
    if (fputs(data, fp) == EOF) {
        perror("Error writing data");
    }
    
    fclose(fp);
    return 0;
}

This example writes binary data using fputs. The binary mode ("wb")
ensures proper handling of non-text data. Note that fputs stops at
the first null character, so it's not ideal for arbitrary binary data. For
general binary writing, fwrite is usually better.

## Best Practices for Using fputs

- **Always Check Return Values:** Verify fputs doesn't return EOF to catch write errors.

- **Include Newlines Explicitly:** Remember fputs doesn't add newlines automatically.

- **Choose the Right Mode:** Use "w" for new files, "a" for appending, and "wb" for binary data.

- **Combine with String Formatting:** Use sprintf for complex output before fputs.

- **Close Files Properly:** Always call fclose to ensure data is flushed and resources freed.

## Source

[C fputs Documentation](https://en.cppreference.com/w/c/io/fputs)

This tutorial has explored the fputs function in C, demonstrating
its use in various file output scenarios. From basic string writing to error
handling and binary data, fputs is a versatile tool for file
operations. Mastering these techniques will enhance your file handling
capabilities in C programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).