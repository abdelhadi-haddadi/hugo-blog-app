+++
title = "C fread function"
date = 2025-08-27T23:22:13.407+01:00
draft = false
description = "Learn file reading in C with this
comprehensive fread tutorial. Explore binary reading, practical examples, and
best practices for efficient file operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C fread function

last modified April 6, 2025

The fread function is a powerful tool in C for reading binary data
from files efficiently. It allows you to read blocks of data in one operation,
making it ideal for handling structured data and binary files. This tutorial
explores fread in depth, from basic usage to advanced techniques.
You'll learn how to read different data types, handle errors, and optimize
performance. Mastering fread is essential for working with binary
files and large datasets in C.

## What Is fread?

The fread function reads data from a file into a buffer. It takes
four parameters: a pointer to the buffer, the size of each element, the number
of elements to read, and a FILE pointer. fread returns the number
of elements successfully read, which may be less than requested. It's commonly
used with binary files opened in "rb" mode. Always check the return value to
verify successful reading and handle errors appropriately.

## Basic fread Example

Let's start with a simple example that reads a single integer from a binary file.

basic_read.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp;
    int value;

    fp = fopen("data.bin", "rb");  // Open in binary read mode
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    size_t result = fread(&amp;value, sizeof(int), 1, fp);
    if (result != 1) {
        perror("Failed to read data");
        fclose(fp);
        return 1;
    }

    printf("Read value: %d\n", value);
    fclose(fp);
    return 0;
}

This example demonstrates the basic usage of fread. We open a file
in binary read mode, then read one integer (size of int) into our
variable. The return value of fread is checked to ensure we read
exactly one element. Finally, we print the value and close the file. This
pattern is fundamental to all fread operations.

## Reading an Array of Numbers

Now let's read multiple values at once by reading an entire array from a file.

array_read.c
  

#include &lt;stdio.h&gt;

#define SIZE 5

int main() {
    FILE *fp;
    int numbers[SIZE];

    fp = fopen("array.bin", "rb");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    size_t elements_read = fread(numbers, sizeof(int), SIZE, fp);
    if (elements_read != SIZE) {
        printf("Only read %zu of %d elements\n", elements_read, SIZE);
    }

    printf("Array contents:\n");
    for (int i = 0; i &lt; elements_read; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");

    fclose(fp);
    return 0;
}

This example reads an entire array of integers in one operation. We specify the
size of each element (sizeof(int)) and the number of elements
(SIZE). The return value tells us how many elements were actually
read, which we use in our loop. This approach is much more efficient than
reading elements one by one, especially for large arrays.

## Reading a Structure

fread is particularly useful for reading structured data. Here's how
to read a custom structure from a file.

struct_read.c
  

#include &lt;stdio.h&gt;

typedef struct {
    int id;
    char name[20];
    float score;
} Student;

int main() {
    FILE *fp;
    Student s;

    fp = fopen("student.bin", "rb");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    if (fread(&amp;s, sizeof(Student), 1, fp) != 1) {
        perror("Failed to read student");
        fclose(fp);
        return 1;
    }

    printf("Student ID: %d\n", s.id);
    printf("Name: %s\n", s.name);
    printf("Score: %.2f\n", s.score);

    fclose(fp);
    return 0;
}

This example demonstrates reading a complete structure in one operation. The
sizeof(Student) ensures we read exactly the right amount of data.
This technique is powerful for reading complex data types, as it preserves the
exact memory layout. Note that this assumes the file was written with the same
structure definition and on the same system architecture.

## Reading Until End of File

Here's how to use fread to read data until reaching the end of file.

read_until_eof.c
  

#include &lt;stdio.h&gt;

#define BUFFER_SIZE 1024

int main() {
    FILE *fp;
    char buffer[BUFFER_SIZE];
    size_t bytes_read;

    fp = fopen("largefile.bin", "rb");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, fp)) &gt; 0) {
        printf("Read %zu bytes\n", bytes_read);
        // Process the buffer here
    }

    fclose(fp);
    return 0;
}

This example shows a common pattern for reading large files in chunks. We read up
to BUFFER_SIZE bytes at a time, processing each chunk as it's
read. The loop continues until fread returns 0, indicating the end
of file. This approach is memory-efficient and works for files of any size,
including those too large to fit in memory all at once.

## Reading and Verifying Data

It's important to verify that you've read the expected amount of data. This
example shows proper error handling.

verify_read.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    FILE *fp;
    double *data;
    size_t count = 1000;

    fp = fopen("dataset.bin", "rb");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    data = (double *)malloc(count * sizeof(double));
    if (data == NULL) {
        perror("Memory allocation failed");
        fclose(fp);
        return 1;
    }

    size_t read = fread(data, sizeof(double), count, fp);
    if (read != count) {
        if (feof(fp)) {
            printf("Reached end of file after %zu elements\n", read);
        } else if (ferror(fp)) {
            perror("Error reading file");
        }
    }

    // Use the data (first 5 elements for demonstration)
    printf("First 5 values:\n");
    for (size_t i = 0; i &lt; (read &lt; 5 ? read : 5); i++) {
        printf("%.2f ", data[i]);
    }
    printf("\n");

    free(data);
    fclose(fp);
    return 0;
}

This example demonstrates robust error handling with fread. We
allocate memory dynamically for our data, then attempt to read 1000 doubles. If
we read fewer than expected, we check whether we hit the end of file
(feof) or encountered an error (ferror). This level
of verification is crucial for production code where data integrity matters.

## Reading Different Data Types

fread can read mixed data types when they're properly structured in
the file. Here's an example.

mixed_read.c
  

#include &lt;stdio.h&gt;

typedef struct {
    char header[4];
    int version;
    float values[3];
    char footer[4];
} DataFile;

int main() {
    FILE *fp;
    DataFile df;

    fp = fopen("mixed.bin", "rb");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    if (fread(&amp;df, sizeof(DataFile), 1, fp) != 1) {
        perror("Failed to read data file");
        fclose(fp);
        return 1;
    }

    printf("Header: %.4s\n", df.header);
    printf("Version: %d\n", df.version);
    printf("Values: %.2f, %.2f, %.2f\n", df.values[0], df.values[1], df.values[2]);
    printf("Footer: %.4s\n", df.footer);

    fclose(fp);
    return 0;
}

This example reads a complex structure containing different data types in one
operation. The structure includes character arrays, integers, and floating-point
numbers. fread handles this seamlessly as it works with raw memory.
Note that this assumes the file's structure exactly matches our program's
structure definition, including padding and alignment.

## Reading with Positioning

Combine fread with fseek to read from specific
positions in a file.

positioned_read.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp;
    int values[3];

    fp = fopen("positioned.bin", "rb");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    // Read first value
    if (fread(&amp;values[0], sizeof(int), 1, fp) != 1) {
        perror("Failed to read first value");
        fclose(fp);
        return 1;
    }

    // Skip ahead to read third value
    if (fseek(fp, sizeof(int), SEEK_CUR) != 0) {
        perror("Failed to seek");
        fclose(fp);
        return 1;
    }

    if (fread(&amp;values[2], sizeof(int), 1, fp) != 1) {
        perror("Failed to read third value");
        fclose(fp);
        return 1;
    }

    // Go back to read second value
    if (fseek(fp, -2 * sizeof(int), SEEK_CUR) != 0) {
        perror("Failed to seek back");
        fclose(fp);
        return 1;
    }

    if (fread(&amp;values[1], sizeof(int), 1, fp) != 1) {
        perror("Failed to read second value");
        fclose(fp);
        return 1;
    }

    printf("Values: %d, %d, %d\n", values[0], values[1], values[2]);

    fclose(fp);
    return 0;
}

This example demonstrates how to navigate through a file while reading. We first
read the first integer, then skip the second to read the third, then go back to
read the second. fseek allows us to move the file position
pointer, while fread reads from the current position. This
technique is useful for reading specific parts of structured binary files.

## Best Practices for Using fread

- **Always Check Return Values:** Verify that fread returns the expected number of elements.

- **Use Binary Mode:** Open files with "b" (e.g., "rb") for binary data to avoid text mode translations.

- **Match Data Types:** Ensure the buffer type and size match what's in the file.

- **Handle Partial Reads:** Be prepared to handle cases where fread reads fewer elements than requested.

- **Combine with Positioning:** Use fseek and ftell for random access in files.

- **Consider Endianness:** Be aware of byte order differences when reading files across different systems.

## Source

[C fread Documentation](https://en.cppreference.com/w/c/io/fread)

This tutorial has explored the fread function in depth, from basic
usage to advanced techniques. You've seen how to read different data types,
handle errors, and optimize file reading operations. With these skills, you can
efficiently work with binary files and structured data in your C programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).