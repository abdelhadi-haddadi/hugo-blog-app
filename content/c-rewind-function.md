+++
title = "C rewind function"
date = 2025-08-29T19:50:04.998+01:00
draft = false
description = "Learn file handling in C with this comprehensive rewind tutorial. Explore practical examples and best practices for resetting file positions."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C rewind function

last modified April 6, 2025

File handling in C requires precise control over file positions for efficient
data access. The rewind function resets the file position indicator
to the beginning of the file. This tutorial explains rewind in
detail with practical examples. You'll learn when and how to use it effectively
in your file operations. Mastering rewind helps in scenarios where
you need to re-read or overwrite file contents.

## What Is rewind?

The rewind function in C resets the file position indicator to the
start of the file. It takes a single parameter: a pointer to a FILE
object. Unlike fseek, it doesn't return a value and clears any
error indicators. It's equivalent to fseek(fp, 0L, SEEK_SET) but
simpler to use. Always ensure the file is opened successfully before calling
rewind.

## Basic rewind Example

This example demonstrates the simplest use of rewind to read a file
twice.

basic_rewind.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // First read
    printf("First read:\n");
    char ch;
    while ((ch = fgetc(fp)) != EOF) {
        putchar(ch);
    }

    rewind(fp);  // Reset to beginning

    // Second read
    printf("\n\nSecond read:\n");
    while ((ch = fgetc(fp)) != EOF) {
        putchar(ch);
    }

    fclose(fp);
    return 0;
}

This program opens a file and reads its contents twice. After the first read,
rewind resets the position to start. Without rewind,
the second read would fail as the pointer would be at EOF. The file is properly
closed after both reads complete.

## Rewind After Writing

Use rewind to read back data you just wrote to a file.

rewind_after_write.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("temp.txt", "w+");
    if (fp == NULL) {
        perror("Error creating file");
        return 1;
    }

    fprintf(fp, "Sample text\n");  // Write to file
    rewind(fp);  // Go back to start

    char buffer[50];
    fgets(buffer, sizeof(buffer), fp);  // Read what we wrote
    printf("File content: %s", buffer);

    fclose(fp);
    remove("temp.txt");  // Clean up
    return 0;
}

This example uses "w+" mode to both write and read the file. After writing,
rewind allows reading from the start. The temporary file is deleted
after use. This pattern is useful for temporary data processing.

## Rewind with Binary Files

rewind works equally well with binary files, as shown here.

binary_rewind.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.bin", "wb+");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    int nums[] = {1, 2, 3, 4, 5};
    fwrite(nums, sizeof(int), 5, fp);  // Write array

    rewind(fp);  // Back to start

    int read_nums[5];
    fread(read_nums, sizeof(int), 5, fp);  // Read array
    for (int i = 0; i &lt; 5; i++) {
        printf("%d ", read_nums[i]);
    }

    fclose(fp);
    return 0;
}

This program writes an integer array to a binary file, then uses
rewind to read it back. Binary mode ("wb+") ensures exact data
representation. The array is successfully read and printed after rewinding.

## Rewind in Update Mode

Combine rewind with update mode for flexible file access.

update_mode.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r+");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Read first line
    char line[100];
    fgets(line, sizeof(line), fp);
    printf("First line: %s", line);

    rewind(fp);  // Back to start

    // Overwrite first line
    fprintf(fp, "New first line\n");

    rewind(fp);  // Read again
    fgets(line, sizeof(line), fp);
    printf("Updated first line: %s", line);

    fclose(fp);
    return 0;
}

"r+" mode allows both reading and writing. After reading the first line,
rewind positions us to overwrite it. Another rewind
lets us verify the change. This demonstrates in-place file modification.

## Rewind vs fseek

Compare rewind with fseek for positioning.

rewind_vs_fseek.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("example.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Using fseek to go to start
    fseek(fp, 0L, SEEK_SET);
    printf("Position after fseek: %ld\n", ftell(fp));

    // Using rewind
    rewind(fp);
    printf("Position after rewind: %ld\n", ftell(fp));

    fclose(fp);
    return 0;
}

Both fseek and rewind move to the file start, but
rewind is simpler. fseek returns a status while
rewind doesn't. rewind also clears error flags.
ftell confirms the position after each operation.

## Error Handling with rewind

Proper error handling ensures safe rewind usage.

error_handling.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("nonexistent.txt", "r");
    if (fp == NULL) {
        perror("Initial open failed");
        return 1;
    }

    // Simulate error
    if (fseek(fp, 1000L, SEEK_SET) != 0) {
        perror("fseek failed");
    }

    rewind(fp);  // Clears error and resets position
    printf("Rewind successful\n");

    char ch = fgetc(fp);  // Now works
    printf("First char: %c\n", ch);

    fclose(fp);
    return 0;
}

This example shows rewind recovering from an error condition.
After a failed fseek, rewind resets both position and
error state. Subsequent operations then work normally. Always check file
operations for errors.

## Rewind in Large File Processing

Process large files in chunks using rewind.

large_file.c
  

#include &lt;stdio.h&gt;

#define CHUNK_SIZE 1024

int main() {
    FILE *fp = fopen("large.bin", "rb");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    unsigned char buffer[CHUNK_SIZE];
    size_t bytes_read;
    int chunks = 0;

    while ((bytes_read = fread(buffer, 1, CHUNK_SIZE, fp))) {
        chunks++;
        // Process chunk here
        
        if (chunks % 100 == 0) {
            printf("Processed %d chunks\n", chunks);
            rewind(fp);  // Restart processing (demo only)
            break;
        }
    }

    fclose(fp);
    return 0;
}

This demonstrates processing a file in chunks. While normally you wouldn't
rewind in a real processing loop, it shows how to restart reading.
For actual large files, consider memory mapping or more sophisticated approaches.

## Best Practices for Using rewind

- **Check File Open:** Always verify the file opened successfully before rewinding.

- **Understand Mode:** Ensure the file is opened in a mode that supports seeking.

- **Clear Errors:** Remember rewind clears error indicators, which can mask issues.

- **Combine with Flush:** For write operations, consider fflush before rewind.

- **Alternative to fseek:** Use rewind when simply returning to start is needed.

## Source

[C rewind Documentation](https://en.cppreference.com/w/c/io/rewind)

This tutorial has demonstrated the versatility of rewind in C file
handling. From basic file rereading to error recovery, rewind
simplifies position management. Proper use of this function makes file processing
more robust and efficient.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).