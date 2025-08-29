+++
title = "C fscanf function"
date = 2025-08-27T23:22:14.517+01:00
draft = false
description = "Learn formatted file input in C with this comprehensive fscanf tutorial. Explore usage, practical examples, and best practices for safe file operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C fscanf function

last modified April 6, 2025

Formatted file input is essential for reading structured data in C programming.
The fscanf function provides powerful capabilities to parse files
according to specified patterns. This tutorial explains fscanf in
depth, covering its syntax, format specifiers, and practical applications.
You'll learn to read various data types from files while understanding important
safety considerations.

## What Is fscanf?

The fscanf function reads formatted input from a file stream,
similar to scanf but for files. It takes a file pointer, format
string, and variable addresses as arguments. The function returns the number of
successfully matched items or EOF on failure. Always check this
return value for error handling. Unlike scanf, it's safer as it
doesn't read from stdin directly.

## Basic fscanf Syntax

The function prototype is int fscanf(FILE *stream, const char *format, ...).
The first parameter is the file pointer obtained from fopen. The
format string contains conversion specifiers like %d for integers.
Additional arguments are pointers to variables that will store the read values.
The function stops reading at whitespace by default for most specifiers.

## Reading Integers from a File

This example demonstrates reading integer values from a file using fscanf.

read_integers.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("numbers.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    int num1, num2, num3;
    int items_read = fscanf(fp, "%d %d %d", &amp;num1, &amp;num2, &amp;num3);
    
    if (items_read != 3) {
        printf("Only read %d values\n", items_read);
    } else {
        printf("Numbers: %d, %d, %d\n", num1, num2, num3);
    }

    fclose(fp);
    return 0;
}

This code opens "numbers.txt" and attempts to read three integers. The format
string "%d %d %d" specifies three integer values separated by
whitespace. We store the return value to verify how many items were successfully
read. Always check this value to handle partial or failed reads appropriately.
The file is properly closed at the end.

## Reading Mixed Data Types

fscanf can handle different data types in a single read operation.

mixed_data.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("File open error");
        return 1;
    }

    char name[50];
    int age;
    float height;
    
    int result = fscanf(fp, "%49s %d %f", name, &amp;age, &amp;height);
    
    if (result == 3) {
        printf("Name: %s\nAge: %d\nHeight: %.2f\n", name, age, height);
    } else {
        printf("Error reading data (read %d items)\n", result);
    }

    fclose(fp);
    return 0;
}

Here we read a string, integer, and float from a file. Note the %49s
format specifier which limits string input to prevent buffer overflow. The
variables' addresses are passed using the &amp; operator (except for
arrays). The return value check ensures all three items were read successfully
before processing them. This demonstrates fscanf's versatility with
different data types.

## Reading File Line by Line

This example shows how to process a file line by line with fscanf.

read_lines.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("records.txt", "r");
    if (fp == NULL) {
        perror("Cannot open file");
        return 1;
    }

    char line[256];
    while (fscanf(fp, "%255[^\n]\n", line) != EOF) {
        printf("Line: %s\n", line);
    }

    fclose(fp);
    return 0;
}

The format string "%255[^\n]\n" reads up to 255 characters until a
newline is encountered, then consumes the newline. The while loop
continues until EOF is returned. Note the buffer size (256) is one
larger than the maximum read (255) to leave room for the null terminator. This
approach is useful for processing structured text files record by record.

## Reading with Field Widths

Using field widths prevents buffer overflows when reading strings.

field_width.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("users.txt", "r");
    if (fp == NULL) {
        perror("File open failed");
        return 1;
    }

    char username[21];  // 20 chars + null terminator
    int score;
    
    while (fscanf(fp, "%20s %d", username, &amp;score) == 2) {
        printf("User: %s, Score: %d\n", username, score);
    }

    fclose(fp);
    return 0;
}

The %20s format specifier ensures no more than 20 characters are
read into the username array (which has 21 elements). The loop
continues as long as both username and score are successfully read. This is a
critical safety measure when reading strings from untrusted files. Always match
your field widths to your buffer sizes minus one for the null terminator.

## Advanced Pattern Matching

fscanf can parse complex patterns using advanced format specifiers.

pattern_match.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("log.txt", "r");
    if (fp == NULL) {
        perror("Error opening log file");
        return 1;
    }

    char month[4];
    int day, year;
    char message[100];
    
    while (fscanf(fp, "%3s %d, %d: %99[^\n]", 
           month, &amp;day, &amp;year, message) == 4) {
        printf("[%d-%s-%d] %s\n", day, month, year, message);
    }

    fclose(fp);
    return 0;
}

This example parses a log file with entries like "Jun 15, 2023: System started".
The format string breaks down as: %3s for 3-character month,
%d, %d for day and year, and %99[^\n] for the rest of
the line. The square brackets [^\n] create a scanset that matches
everything except newline. This demonstrates fscanf's powerful
pattern matching capabilities for structured text parsing.

## Best Practices for Using fscanf

- **Check Return Values:** Always verify the number of items read to detect errors.

- **Use Field Widths:** Prevent buffer overflows by specifying maximum lengths for strings.

- **Validate Input:** Check that read values are within expected ranges.

- **Consider Alternatives:** For complex parsing, fgets with sscanf may be safer.

- **Handle Whitespace:** Be aware that fscanf skips leading whitespace for most conversions.

## Source

[C fscanf Documentation](https://en.cppreference.com/w/c/io/fscanf)

This tutorial has explored the fscanf function in depth, from basic
usage to advanced pattern matching. When used carefully with proper error
checking and field width specifications, it's a powerful tool for reading
formatted data from files. Remember to always validate input and consider safer
alternatives for critical applications.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).