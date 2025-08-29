+++
title = "C clearerr function"
date = 2025-08-27T23:22:07.644+01:00
draft = false
description = "Learn error handling in C file operations with this comprehensive clearerr tutorial. Explore practical examples and best practices for robust file I/O."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C clearerr function

last modified April 6, 2025

Error handling is crucial in C file operations to ensure robust and reliable
programs. The clearerr function helps manage file stream error
indicators effectively. This tutorial explores clearerr in depth,
explaining its purpose, behavior, and practical applications. You'll learn how
to reset error and EOF flags to continue file operations after encountering
issues. Mastering clearerr enhances your ability to handle file I/O
errors gracefully.

## What Is clearerr?

The clearerr function clears the error and end-of-file (EOF)
indicators for a file stream. It takes a single parameter: a pointer to the
FILE object. When called, it resets both the error and EOF flags,
allowing subsequent operations to proceed. This function is particularly useful
after encountering an error when you want to retry operations. Note that
clearerr doesn't fix the underlying issue causing the error.

## Basic Syntax

The function declaration for clearerr is straightforward:

void clearerr(FILE *stream);

The function doesn't return any value and simply clears the error state of the
specified stream. The stream parameter must point to a valid,
opened file stream. After calling clearerr, you can check the
stream's status again using feof or ferror.

## Clearing EOF Indicator

This example demonstrates how to use clearerr to reset the EOF flag.

clear_eof.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("test.txt", "r");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    // Read past EOF
    int ch;
    while ((ch = fgetc(fp)) != EOF) {
        putchar(ch);
    }

    printf("\nEOF reached. feof(): %d\n", feof(fp));
    
    clearerr(fp);  // Clear EOF indicator
    printf("After clearerr. feof(): %d\n", feof(fp));

    fclose(fp);
    return 0;
}

This code first reads a file until EOF is reached, which sets the EOF indicator.
The feof function confirms this by returning non-zero. After calling
clearerr, feof returns zero, showing the EOF flag was
cleared. Note that the file position remains at EOF unless moved with
fseek or rewind.

## Handling Read Errors

This example shows how to clear an error condition after a failed read operation.

read_error.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("test.txt", "r");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    // Simulate error by closing the file descriptor
    fclose(fp);
    
    int ch = fgetc(fp);  // This will fail
    if (ferror(fp)) {
        printf("Error occurred. ferror(): %d\n", ferror(fp));
        clearerr(fp);  // Clear the error
        printf("After clearerr. ferror(): %d\n", ferror(fp));
    }

    return 0;
}

Here, we deliberately cause an error by trying to read from a closed file. The
ferror function detects this error condition. After calling
clearerr, ferror returns zero, indicating the error
flag was cleared. Remember that clearing the error doesn't make the stream usable
again if it was closed.

## Combining with fseek

This example combines clearerr with fseek to recover
from errors.

fseek_clearerr.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.bin", "rb+");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    // Try to read from write-only stream (simulated error)
    int value;
    if (fread(&amp;value, sizeof(int), 1, fp) != 1) {
        if (ferror(fp)) {
            printf("Read error occurred. Clearing...\n");
            clearerr(fp);
        }
    }

    // Reset position and try writing
    fseek(fp, 0, SEEK_SET);
    value = 42;
    if (fwrite(&amp;value, sizeof(int), 1, fp) != 1) {
        perror("Write failed");
    }

    fclose(fp);
    return 0;
}

This code attempts to read from what might be a write-only stream (depending on
file permissions). After detecting the error with ferror, it clears
the error state with clearerr and uses fseek to reset
the file position. The subsequent write operation then proceeds normally. This
shows how to recover from certain types of errors.

## Error Recovery in Loops

This example demonstrates using clearerr in a read loop for robust
error handling.

error_recovery.c
  

#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt;

int main() {
    FILE *fp = fopen("input.txt", "r");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    char buffer[256];
    int attempts = 3;
    
    while (attempts-- &gt; 0) {
        if (fgets(buffer, sizeof(buffer), fp) == NULL) {
            if (feof(fp)) {
                printf("End of file reached\n");
                break;
            } else if (ferror(fp)) {
                printf("Read error (attempts left: %d)\n", attempts);
                clearerr(fp);
                sleep(1);  // Wait before retry
                continue;
            }
        }
        printf("Read: %s", buffer);
    }

    fclose(fp);
    return 0;
}

This code implements a retry mechanism when read errors occur. It attempts to
read lines up to three times if errors are encountered. After each error, it
uses clearerr to reset the error state before retrying. The
sleep call simulates a delay that might help in real-world
scenarios (like waiting for network resources). This pattern is useful for
handling transient errors.

## Checking Error State Before Clearing

This example shows good practice by checking error state before clearing it.

check_before_clear.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("test.txt", "r");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    // Read until EOF
    while (fgetc(fp) != EOF);

    printf("Before clearerr:\n");
    printf("feof(): %d, ferror(): %d\n", feof(fp), ferror(fp));

    clearerr(fp);

    printf("After clearerr:\n");
    printf("feof(): %d, ferror(): %d\n", feof(fp), ferror(fp));

    fclose(fp);
    return 0;
}

This code demonstrates the importance of checking error states before clearing
them. It reads a file to EOF, then shows the state of both EOF and error flags
before and after calling clearerr. This practice helps in debugging
and understanding the exact state of your file stream during operations. Always
verify the need to clear errors rather than doing it unconditionally.

## Handling Temporary File Errors

This example shows handling temporary errors during file operations.

temp_error.c
  

#include &lt;stdio.h&gt;
#include &lt;errno.h&gt;

int main() {
    FILE *fp = fopen("tempfile.txt", "r+");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    // Simulate a temporary error (e.g., network hiccup)
    errno = EIO;  // Input/output error
    ferror(fp);   // Set the error indicator

    if (ferror(fp)) {
        printf("Temporary error occurred (errno: %d)\n", errno);
        clearerr(fp);
        errno = 0;  // Also reset errno
        
        // Try the operation again
        printf("Retrying operation...\n");
        if (fprintf(fp, "Retry data") &lt; 0) {
            perror("Operation failed again");
        } else {
            printf("Retry succeeded\n");
        }
    }

    fclose(fp);
    return 0;
}

This example simulates a temporary I/O error (like a network hiccup) by manually
setting errno. After detecting the error with ferror,
it clears both the stream error (with clearerr) and the global
errno. The operation is then retried. This pattern is useful for
handling transient errors in real-world applications where immediate retry might
succeed.

## Best Practices for Using clearerr

- **Check Before Clearing:** Always verify error state with ferror or feof before calling clearerr.

- **Combine with Position Functions:** Use fseek or rewind with clearerr when appropriate.

- **Don't Mask Persistent Errors:** Ensure you're not repeatedly clearing errors that indicate serious problems.

- **Document Error Handling:** Comment your code to explain why and when you're clearing errors.

- **Consider Alternative Approaches:** Sometimes reopening the file is better than clearing errors.

## Source

[C clearerr Documentation](https://en.cppreference.com/w/c/io/clearerr)

This tutorial has explored the clearerr function in depth, showing
how to effectively manage error states in C file operations. Proper error
handling makes your programs more robust and reliable when working with files.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).