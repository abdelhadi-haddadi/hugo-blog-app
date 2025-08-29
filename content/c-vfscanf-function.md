+++
title = "C vfscanf function"
date = 2025-08-29T19:50:19.622+01:00
draft = false
description = "Learn formatted file input in C with this comprehensive vfscanf tutorial. Explore usage, practical examples, and best practices for safe file operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C vfscanf function

last modified April 6, 2025

Formatted input from files is a crucial skill in C programming, enabling precise
data extraction. The vfscanf function provides powerful capabilities
for reading formatted data from files using variable arguments. This tutorial
explains vfscanf in depth, covering its syntax, usage patterns,
and safety considerations. Practical examples demonstrate how to leverage this
function effectively while avoiding common pitfalls in file operations.

## What Is vfscanf?

The vfscanf function reads formatted input from a file stream using
a variable argument list. It's the file equivalent of vscanf and
works similarly to fscanf but with a va_list argument.
This function is declared in stdarg.h and stdio.h. It
returns the number of successfully matched and assigned input items, or EOF on
failure. Always validate the return value to ensure proper input processing.

## Basic vfscanf Example

This example demonstrates reading three different data types from a file using
vfscanf with a helper function.

basic_vfscanf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

void read_formatted(FILE *fp, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    vfscanf(fp, fmt, args);
    va_end(args);
}

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }

    int num;
    float value;
    char text[50];

    read_formatted(fp, "%d %f %49s", &amp;num, &amp;value, text);
    printf("Read: %d, %.2f, %s\n", num, value, text);

    fclose(fp);
    return 0;
}

The example shows a wrapper function read_formatted that uses
vfscanf internally. The function takes a format string and variable
arguments, passing them to vfscanf. In main, we open
a file and read an integer, float, and string. Note the buffer size limitation
(49 characters) for safety. Always check file opening success and close files.

## Reading Multiple Records

This example processes multiple structured records from a file using
vfscanf in a loop.

multi_record.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

int read_record(FILE *fp, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    int result = vfscanf(fp, fmt, args);
    va_end(args);
    return result;
}

int main() {
    FILE *fp = fopen("records.txt", "r");
    if (!fp) {
        perror("File open failed");
        return 1;
    }

    int id;
    char name[50];
    double salary;

    while (read_record(fp, "%d %49s %lf", &amp;id, name, &amp;salary) == 3) {
        printf("ID: %d, Name: %s, Salary: %.2f\n", id, name, salary);
    }

    fclose(fp);
    return 0;
}

Here we create a read_record helper function that returns the number
of successfully read items. The main loop continues as long as all three expected
fields (ID, name, salary) are read correctly. The format string specifies field
width for strings to prevent buffer overflow. The loop automatically stops at EOF
or invalid input format.

## Error Handling with vfscanf

This example demonstrates robust error handling when using vfscanf.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;errno.h&gt;

int safe_vfscanf(FILE *fp, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    int count = vfscanf(fp, fmt, args);
    va_end(args);

    if (count == EOF) {
        if (feof(fp)) {
            fprintf(stderr, "End of file reached\n");
        } else if (ferror(fp)) {
            perror("File read error");
        }
    } else if (count == 0) {
        fprintf(stderr, "No fields matched\n");
    }

    return count;
}

int main() {
    FILE *fp = fopen("values.txt", "r");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }

    int a, b;
    if (safe_vfscanf(fp, "%d %d", &amp;a, &amp;b) != 2) {
        fprintf(stderr, "Failed to read two integers\n");
        fclose(fp);
        return 1;
    }

    printf("Sum: %d\n", a + b);
    fclose(fp);
    return 0;
}

The safe_vfscanf function enhances error reporting by checking for
EOF conditions and file errors. It differentiates between end-of-file and actual
read errors. The main function expects exactly two integers and handles the case
where fewer values are read. This approach provides better diagnostics than basic
vfscanf usage.

## Reading Different Data Types

This example shows how to read various data types from a file using
vfscanf.

mixed_types.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

void read_data(FILE *fp, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    if (vfscanf(fp, fmt, args) == EOF) {
        fprintf(stderr, "Read error occurred\n");
    }
    va_end(args);
}

int main() {
    FILE *fp = fopen("mixed.txt", "r");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }

    int day, month, year;
    char event[100];
    double amount;

    read_data(fp, "%d/%d/%d %99s %lf", &amp;day, &amp;month, &amp;year, event, &amp;amount);
    printf("Date: %02d/%02d/%04d\n", day, month, year);
    printf("Event: %s\n", event);
    printf("Amount: %.2f\n", amount);

    fclose(fp);
    return 0;
}

The example reads a date in DD/MM/YYYY format, an event description, and a
monetary amount. Note the careful buffer size specification (99 characters) for
the string input. The read_data function handles the variable
argument passing to vfscanf. The output uses formatting to ensure
consistent date display with leading zeros where needed.

## Advanced Formatting with vfscanf

This example demonstrates advanced format specifiers with vfscanf.

advanced_formatting.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;stdlib.h&gt;

void parse_config(FILE *fp, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    int result = vfscanf(fp, fmt, args);
    va_end(args);

    if (result == EOF) {
        fprintf(stderr, "Error reading configuration\n");
        exit(EXIT_FAILURE);
    }
}

int main() {
    FILE *fp = fopen("config.txt", "r");
    if (!fp) {
        perror("Cannot open config file");
        return 1;
    }

    char user[50];
    int port;
    char ip[16];
    double timeout;

    parse_config(fp, "user = %49[^\n]\n", user);
    parse_config(fp, "port = %d\n", &amp;port);
    parse_config(fp, "ip = %15[^\n]\n", ip);
    parse_config(fp, "timeout = %lf\n", &amp;timeout);

    printf("Configuration loaded:\n");
    printf("User: %s\n", user);
    printf("Port: %d\n", port);
    printf("IP: %s\n", ip);
    printf("Timeout: %.1f seconds\n", timeout);

    fclose(fp);
    return 0;
}

This example parses a configuration file with specific format requirements. The
%[^\n] format reads strings until a newline, allowing spaces in
values. Each configuration line has a strict format that must be matched. The
parse_config function exits the program on failure, which might be
appropriate for critical configuration files. Buffer sizes are carefully
specified to prevent overflow.

## Best Practices for Using vfscanf

- **Validate Input:** Always check the return value to verify successful reads.

- **Use Safe Functions:** Prefer vfscanf over vscanf for better control.

- **Limit Buffer Sizes:** Specify maximum widths for string inputs to prevent overflow.

- **Handle Errors:** Implement robust error handling for file operations.

- **Clean Up Resources:** Always close files and clean up resources properly.

## Source

[C vfscanf Documentation](https://en.cppreference.com/w/c/io/vfscanf)

This tutorial has explored the vfscanf function in depth, providing
practical examples from basic to advanced usage. Mastering formatted file input
is essential for building robust data processing applications in C. Remember to
always prioritize safety when handling file input and variable arguments.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).