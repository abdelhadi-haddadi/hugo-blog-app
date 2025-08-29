+++
title = "C feof function"
date = 2025-08-29T19:49:51.671+01:00
draft = false
description = "Learn to detect end-of-file conditions in C with this comprehensive feof tutorial. Explore practical examples and best practices for file operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C feof function

last modified April 6, 2025

File handling in C requires precise detection of end-of-file conditions to avoid
errors and ensure proper data processing. The feof function is a
critical tool for this purpose, indicating when a file stream has reached its
end. This tutorial explores feof in depth, explaining its proper
usage and demonstrating practical applications through clear examples.
Understanding feof helps prevent common file reading mistakes and
ensures robust file operations.

## What Is feof?

The feof function checks if the end-of-file indicator is set for a
given file stream. It takes a FILE pointer as its argument and
returns a non-zero value if EOF is reached. Unlike checking for the
EOF constant directly, feof examines the stream's
internal state. It's important to use feof after a read operation,
not before, to get accurate results. Proper usage prevents infinite loops and
ensures complete file processing.

## Basic feof Example

This simple example demonstrates the fundamental usage of feof to
read a file until the end is reached.

basic_feof.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    int ch;
    while (1) {
        ch = fgetc(fp);
        if (feof(fp)) {
            break;  // Exit loop when EOF is reached
        }
        putchar(ch);
    }

    fclose(fp);
    return 0;
}

This program opens "data.txt" and reads it character by character. The
feof function checks if we've reached the end of file after each
read. When feof returns true, the loop breaks. Note that we check
for EOF after reading, not before, to ensure we process all data correctly.
Always close the file with fclose when done.

## Reading Lines Until EOF

This example shows how to read an entire file line by line using
feof with fgets.

read_lines.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

#define MAX_LEN 256

int main() {
    FILE *fp = fopen("lines.txt", "r");
    if (fp == NULL) {
        perror("File open error");
        return 1;
    }

    char buffer[MAX_LEN];
    while (!feof(fp)) {
        if (fgets(buffer, MAX_LEN, fp) != NULL) {
            // Remove newline if present
            buffer[strcspn(buffer, "\n")] = '\0';
            printf("Read: %s\n", buffer);
        }
    }

    fclose(fp);
    return 0;
}

Here we use feof as the loop condition to continue reading until EOF
is reached. The fgets function reads each line into a buffer, which
we then process. Note the check for NULL from fgets -
this is important because feof only returns true after a read
attempt fails. The combination ensures we process all lines correctly.

## Binary File Processing with feof

This example demonstrates using feof with binary file operations.

binary_feof.c
  

#include &lt;stdio.h&gt;

struct Record {
    int id;
    double value;
};

int main() {
    FILE *fp = fopen("data.bin", "rb");
    if (fp == NULL) {
        perror("Binary file open error");
        return 1;
    }

    struct Record rec;
    while (!feof(fp)) {
        size_t read = fread(&amp;rec, sizeof(struct Record), 1, fp);
        if (read == 1) {
            printf("ID: %d, Value: %.2f\n", rec.id, rec.value);
        }
    }

    fclose(fp);
    return 0;
}

When working with binary files, feof helps detect the end of file
while reading structured data. We read Record structures until
feof indicates we've reached the end. The fread return
value is checked to ensure we only process complete records. This approach works
well for fixed-size binary data structures.

## Common feof Pitfall

This example illustrates a common mistake when using feof and how to
avoid it.

feof_pitfall.c
  

#include &lt;stdio.h&gt;

// WRONG way to use feof
void wrong_approach(FILE *fp) {
    char ch;
    while (!feof(fp)) {  // Check before read - BAD!
        ch = fgetc(fp);
        putchar(ch);     // May process EOF as data
    }
}

// RIGHT way to use feof
void correct_approach(FILE *fp) {
    int ch;
    while ((ch = fgetc(fp)) != EOF) {  // Check read result
        putchar(ch);
    }
}

int main() {
    FILE *fp = fopen("sample.txt", "r");
    if (fp == NULL) {
        perror("File error");
        return 1;
    }

    printf("Incorrect output:\n");
    wrong_approach(fp);
    
    rewind(fp);  // Reset to file start
    
    printf("\nCorrect output:\n");
    correct_approach(fp);

    fclose(fp);
    return 0;
}

The wrong approach checks feof before reading, which can lead to
processing an extra "phantom" character. The correct way checks the read
operation's result directly against EOF. This example clearly shows
why you should never use feof as the sole loop condition without
checking the read operation's success. The correct approach is more reliable and
avoids common errors.

## Counting File Size with feof

This example uses feof to count the number of bytes in a file.

file_size.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("largefile.bin", "rb");
    if (fp == NULL) {
        perror("File open failed");
        return 1;
    }

    long count = 0;
    while (!feof(fp)) {
        if (fgetc(fp) != EOF) {  // Read and check
            count++;
        }
    }

    printf("File contains %ld bytes\n", count);
    fclose(fp);
    return 0;
}

This program counts each byte in a binary file until reaching EOF. We use
feof in the loop condition but still check each
fgetc result to ensure we only count successful reads. For very
large files, consider using fseek and ftell instead,
but this method works well for demonstrating feof with byte-level
processing. Always close files when done counting.

## Processing CSV Data with feof

This example shows how to process CSV data while properly handling EOF
conditions.

csv_reader.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

#define MAX_LINE 1024

int main() {
    FILE *fp = fopen("data.csv", "r");
    if (fp == NULL) {
        perror("CSV open error");
        return 1;
    }

    char line[MAX_LINE];
    int row_count = 0;
    
    while (!feof(fp)) {
        if (fgets(line, MAX_LINE, fp) != NULL) {
            // Process CSV line
            char *token = strtok(line, ",");
            printf("Row %d: ", ++row_count);
            
            while (token != NULL) {
                printf("[%s] ", token);
                token = strtok(NULL, ",");
            }
            printf("\n");
        }
    }

    printf("Processed %d rows\n", row_count);
    fclose(fp);
    return 0;
}

This CSV processor uses feof to control the outer loop while
checking fgets for successful line reads. Each line is split into
comma-separated tokens for processing. The combination of feof and
NULL checking ensures we process all data without missing lines or
processing empty ones. This pattern works well for many text file formats beyond
just CSV.

## Custom File Reader Function

This example demonstrates a robust file reading function that properly handles
EOF conditions.

file_reader.c
  

#include &lt;stdio.h&gt;
#include &lt;stdbool.h&gt;

bool read_next_chunk(FILE *fp, char *buffer, size_t size) {
    if (feof(fp)) {
        return false;  // Already at EOF
    }

    size_t read = fread(buffer, 1, size, fp);
    if (read == 0) {
        return false;  // Read failed or EOF
    }
    
    buffer[read] = '\0';  // Null-terminate
    return true;
}

int main() {
    FILE *fp = fopen("document.txt", "r");
    if (fp == NULL) {
        perror("File open failed");
        return 1;
    }

    char chunk[256];
    while (read_next_chunk(fp, chunk, sizeof(chunk) - 1)) {
        printf("Chunk: %s\n", chunk);
    }

    if (feof(fp)) {
        printf("Reached end of file\n");
    } else {
        printf("Error before EOF\n");
    }

    fclose(fp);
    return 0;
}

This example shows a more advanced use of feof in a custom file
reading function. The function checks for EOF before attempting to read, then
verifies the read operation succeeded. The main loop uses the function's return
value to control processing. After the loop, we check feof again to
determine if we reached the end normally or encountered an error. This pattern
creates robust, reusable file processing code.

## Best Practices for Using feof

- **Check After Reads:** Always use feof after read operations, not before.

- **Combine with Read Checks:** Verify read operation success along with feof.

- **Avoid as Sole Condition:** Don't use feof alone as a loop condition.

- **Handle Binary Files Carefully:** Be extra cautious with binary data and EOF conditions.

- **Clear Errors When Needed:** Use clearerr to reset EOF/error flags if reusing streams.

## Source

[C feof Documentation](https://en.cppreference.com/w/c/io/feof)

This tutorial has explored the feof function in depth, showing its
proper usage through practical examples. Mastering feof is
essential for robust file handling in C, preventing common errors and ensuring
complete data processing. Remember to always combine feof checks
with read operation verification for the most reliable results.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).