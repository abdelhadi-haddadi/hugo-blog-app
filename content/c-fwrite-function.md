+++
title = "C fwrite function"
date = 2025-08-27T23:22:16.860+01:00
draft = false
description = "Learn binary file writing in C with this comprehensive fwrite tutorial. Explore parameters, practical examples, and best practices for efficient binary file operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C fwrite function

last modified April 6, 2025

Binary file handling is essential in C programming for efficient data storage.
The fwrite function writes binary data to files with precision.
This tutorial explains fwrite's parameters, demonstrates various
use cases, and provides practical examples. Mastering fwrite
enables you to handle complex data structures and optimize storage.

## What Is fwrite?

The fwrite function writes binary data to a file in C. It takes
four parameters: a pointer to the data, size of each element, number of
elements, and a file pointer. fwrite returns the number of
elements successfully written. Always use binary mode ("wb", "ab", or "rb+")
when working with fwrite to prevent data corruption.

## Writing a Single Integer

This example demonstrates writing a single integer to a binary file.

write_int.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp;
    int num = 42;

    fp = fopen("data.bin", "wb");  // Open in binary write mode
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    size_t written = fwrite(&amp;num, sizeof(int), 1, fp);
    if (written != 1) {
        printf("Error writing to file\n");
    }

    fclose(fp);
    return 0;
}

Here, we open "data.bin" in binary write mode ("wb"). The fwrite
function writes one integer (4 bytes typically) from memory to the file. We
check the return value to ensure the write was successful. Always close the file
with fclose when done.

## Writing an Array of Integers

Learn how to write multiple integers at once using fwrite.

write_array.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp;
    int nums[] = {10, 20, 30, 40, 50};
    size_t count = sizeof(nums)/sizeof(nums[0]);

    fp = fopen("array.bin", "wb");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    size_t written = fwrite(nums, sizeof(int), count, fp);
    if (written != count) {
        printf("Incomplete write operation\n");
    }

    fclose(fp);
    return 0;
}

This example writes an entire array of integers in one operation. We calculate
the number of elements using sizeof arithmetic. fwrite
handles the entire array efficiently, writing all elements at once. The return
value should match our element count for success.

## Writing a Structure

See how to write custom data structures to binary files.

write_struct.c
  

#include &lt;stdio.h&gt;

typedef struct {
    int id;
    char name[20];
    float score;
} Student;

int main() {
    FILE *fp;
    Student s = {1, "Alice", 95.5};

    fp = fopen("student.bin", "wb");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    size_t written = fwrite(&amp;s, sizeof(Student), 1, fp);
    if (written != 1) {
        printf("Failed to write structure\n");
    }

    fclose(fp);
    return 0;
}

Here we define a Student structure and write one instance to file.
fwrite writes the entire structure, including all fields, in binary
format. This approach preserves the exact memory layout of the structure. Note
that writing structures directly is platform-dependent due to padding.

## Writing Multiple Structures

Store collections of structures efficiently with this technique.

write_struct_array.c
  

#include &lt;stdio.h&gt;

typedef struct {
    int x;
    int y;
} Point;

int main() {
    FILE *fp;
    Point points[] = {{1,2}, {3,4}, {5,6}};
    size_t count = sizeof(points)/sizeof(points[0]);

    fp = fopen("points.bin", "wb");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    size_t written = fwrite(points, sizeof(Point), count, fp);
    if (written != count) {
        printf("Partial structure array written\n");
    }

    fclose(fp);
    return 0;
}

This example writes an array of Point structures to a binary file.
We calculate the element count dynamically. fwrite handles the
entire array in one operation, making it very efficient for large datasets. The
binary file will contain the exact memory representation of the structures.

## Appending Binary Data

Add data to an existing binary file without overwriting previous content.

append_binary.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp;
    float new_data[] = {1.1, 2.2, 3.3};

    fp = fopen("data.bin", "ab");  // Append binary mode
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    size_t written = fwrite(new_data, sizeof(float), 3, fp);
    if (written != 3) {
        printf("Failed to append all data\n");
    }

    fclose(fp);
    return 0;
}

Using append binary mode ("ab"), new data is added to the end of existing file
content. The file pointer starts at the end automatically. This example appends
three float values. Append mode is safer than write mode when you want to
preserve existing data in the file.

## Writing and Reading Back

Demonstrates a complete write-read cycle with binary data.

write_read.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp;
    double data[] = {3.14, 2.718, 1.618};
    double read_data[3];

    // Write data
    fp = fopen("numbers.bin", "wb");
    if (fp == NULL) {
        perror("Failed to open file for writing");
        return 1;
    }
    fwrite(data, sizeof(double), 3, fp);
    fclose(fp);

    // Read data
    fp = fopen("numbers.bin", "rb");
    if (fp == NULL) {
        perror("Failed to open file for reading");
        return 1;
    }
    fread(read_data, sizeof(double), 3, fp);
    fclose(fp);

    // Verify
    for (int i = 0; i &lt; 3; i++) {
        printf("%f ", read_data[i]);
    }
    printf("\n");

    return 0;
}

This complete example writes an array of doubles to a file, then reads them back.
We use binary write mode ("wb") for writing and binary read mode ("rb") for
reading. The values are printed to verify they were stored and retrieved
correctly. This pattern is common for binary data persistence.

## Writing Dynamic Data

Handle dynamically allocated memory with fwrite.

write_dynamic.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    FILE *fp;
    int *dynamic_array;
    size_t count = 5;

    // Allocate and initialize array
    dynamic_array = malloc(count * sizeof(int));
    if (dynamic_array == NULL) {
        perror("Memory allocation failed");
        return 1;
    }

    for (size_t i = 0; i &lt; count; i++) {
        dynamic_array[i] = i * 10;
    }

    // Write to file
    fp = fopen("dynamic.bin", "wb");
    if (fp == NULL) {
        perror("Failed to open file");
        free(dynamic_array);
        return 1;
    }

    size_t written = fwrite(dynamic_array, sizeof(int), count, fp);
    if (written != count) {
        printf("Partial write occurred\n");
    }

    fclose(fp);
    free(dynamic_array);
    return 0;
}

This example demonstrates writing dynamically allocated memory to a file. We
allocate an integer array, initialize it, then write it to disk. The same
fwrite approach works for both stack and heap memory. Remember to
free allocated memory and close the file when done.

## Best Practices for Using fwrite

- **Always Check Return Values:** Verify fwrite returns the expected element count.

- **Use Binary Mode:** Open files with "b" flag (e.g., "wb", "rb+") for binary data.

- **Handle Errors Gracefully:** Check for NULL file pointers and incomplete writes.

- **Consider Endianness:** Binary files may not be portable between different architectures.

- **Close Files Properly:** Always call fclose to ensure data is flushed.

## Source

[C fwrite Documentation](https://en.cppreference.com/w/c/io/fwrite)

This tutorial has explored the fwrite function in depth, from basic
integer writing to complex structure handling. Binary file operations are
powerful tools for efficient data storage and retrieval in C programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).