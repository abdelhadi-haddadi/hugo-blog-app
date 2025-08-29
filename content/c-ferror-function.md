+++
title = "C ferror function"
date = 2025-08-27T23:22:10.006+01:00
draft = false
description = "Learn error handling in C file operations with this comprehensive ferror tutorial. Explore practical examples and best practices for robust file handling."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C ferror function

last modified April 6, 2025

Error handling is crucial in file operations to ensure program reliability. The
ferror function helps detect errors during file I/O operations. This
tutorial explains ferror in depth with practical examples. You'll
learn how to check for file operation errors and handle them appropriately.
Mastering ferror leads to more robust file handling in C programs.

## What Is ferror?

The ferror function checks if an error occurred during file
operations. It takes a FILE pointer as its only parameter. The
function returns a non-zero value if an error was detected. Unlike
feof, which checks for end-of-file, ferror specifically
detects read/write errors. Always clear errors with clearerr before
reusing the file stream.

## Basic ferror Usage

This example demonstrates the simplest way to use ferror to check
for file operation errors.

basic_ferror.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("nonexistent.txt", "r");
    
    if (fp == NULL) {
        perror("File opening failed");
        return 1;
    }

    // Attempt to read from file
    int ch = fgetc(fp);
    
    if (ferror(fp)) {
        perror("Error reading file");
        clearerr(fp);  // Clear the error flag
    }

    fclose(fp);
    return 0;
}

This code attempts to open and read from a potentially non-existent file. After
the read operation, ferror checks if an error occurred. The
clearerr function resets the error flag for future operations. Note
that we still check fopen separately as it sets errno
directly.

## Checking ferror After Write Operation

ferror can also detect errors during write operations, as shown in
this example.

write_error.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("/readonly/test.txt", "w");
    
    if (fp == NULL) {
        perror("File opening failed");
        return 1;
    }

    // Attempt to write to a potentially read-only location
    fprintf(fp, "Test data");
    
    if (ferror(fp)) {
        perror("Error writing to file");
        clearerr(fp);
    }

    fclose(fp);
    return 0;
}

Here, we try to write to a file in a potentially read-only location. After the
write attempt, ferror checks if the operation succeeded. The error
message helps diagnose permission issues. Always check both fopen
and ferror for comprehensive error handling.

## ferror in a File Copy Program

This example shows ferror in a practical file copying application.

file_copy.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *src = fopen("source.txt", "r");
    FILE *dest = fopen("destination.txt", "w");
    
    if (src == NULL || dest == NULL) {
        perror("File opening failed");
        return 1;
    }

    int ch;
    while ((ch = fgetc(src)) != EOF) {
        fputc(ch, dest);
        
        if (ferror(src) || ferror(dest)) {
            perror("File operation error");
            clearerr(src);
            clearerr(dest);
            break;
        }
    }

    fclose(src);
    fclose(dest);
    return 0;
}

The program copies content from source.txt to destination.txt. After each
character transfer, ferror checks both files for errors. If an error
occurs, the loop breaks immediately. This ensures we detect issues like disk full
errors during the copy process.

## Handling ferror with Binary Files

Binary file operations can also benefit from ferror checks, as
shown in this example.

binary_error.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.bin", "rb");
    if (fp == NULL) {
        perror("File opening failed");
        return 1;
    }

    int data[10];
    size_t read = fread(data, sizeof(int), 10, fp);
    
    if (read != 10 &amp;&amp; ferror(fp)) {
        perror("Error reading binary data");
        clearerr(fp);
    }

    fclose(fp);
    return 0;
}

This code reads an array of integers from a binary file. After fread,
we check both the return value and ferror. The combination ensures
we detect both EOF and actual read errors. Binary operations often need this level
of error checking due to their sensitive nature.

## ferror with Temporary Files

Temporary files can also encounter errors that ferror can detect.

temp_file.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *tmp = tmpfile();
    if (tmp == NULL) {
        perror("Temporary file creation failed");
        return 1;
    }

    for (int i = 0; i &lt; 100; i++) {
        fprintf(tmp, "Line %d\n", i);
        
        if (ferror(tmp)) {
            perror("Error writing to temp file");
            clearerr(tmp);
            break;
        }
    }

    fclose(tmp);
    return 0;
}

The program creates a temporary file and writes 100 lines to it. After each
write, ferror checks for errors. Temporary files can fail due to
disk space or permission issues. Regular error checks ensure we catch these
problems early in the process.

## ferror in Network File Operations

Network-mounted filesystems may need extra error checking with
ferror.

network_file.c
  

#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt;

int main() {
    FILE *fp = fopen("/mnt/network/share/file.txt", "r");
    if (fp == NULL) {
        perror("Network file opening failed");
        return 1;
    }

    char buffer[256];
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        printf("%s", buffer);
        
        if (ferror(fp)) {
            perror("Network read error");
            clearerr(fp);
            sleep(1);  // Wait before retrying
        }
    }

    fclose(fp);
    return 0;
}

Network files may fail intermittently due to connection issues. This code reads
from a network file with error checking. When ferror detects an
issue, it waits before continuing. This pattern helps handle temporary network
glitches more gracefully in file operations.

## Advanced ferror Usage with errno

Combine ferror with errno for detailed error
diagnostics.

advanced_error.c
  

#include &lt;stdio.h&gt;
#include &lt;errno.h&gt;
#include &lt;string.h&gt;

int main() {
    FILE *fp = fopen("important.dat", "r+");
    if (fp == NULL) {
        perror("File opening failed");
        return 1;
    }

    // Critical file operation
    if (fseek(fp, 1024, SEEK_SET) != 0 || ferror(fp)) {
        fprintf(stderr, "Seek error: %s\n", strerror(errno));
        clearerr(fp);
    }

    // Data processing would continue here
    fclose(fp);
    return 0;
}

This example shows advanced error handling combining ferror and
errno. After a file seek operation, we check both the return value
and ferror. The strerror function provides a detailed
error message. This approach is useful for critical file operations where precise
error information is needed.

## Best Practices for Using ferror

- **Check After Every Operation:** Use ferror after critical file I/O operations.

- **Combine with Other Checks:** Use with return value checks for comprehensive error handling.

- **Clear Errors Properly:** Reset error flags with clearerr when appropriate.

- **Provide Context:** Include file/operation details in error messages.

- **Consider Error Recovery:** Implement retry logic for transient errors when possible.

## Source

[C ferror Documentation](https://en.cppreference.com/w/c/io/ferror)

This tutorial has demonstrated the importance of ferror in robust
file handling. From basic checks to network file scenarios, proper error
detection prevents data corruption and improves reliability. Implement these
techniques to make your file operations more resilient.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).