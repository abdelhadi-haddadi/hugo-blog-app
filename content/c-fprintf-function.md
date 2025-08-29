+++
title = "C fprintf function"
date = 2025-08-27T23:22:12.250+01:00
draft = false
description = "Learn formatted output in C with this comprehensive fprintf tutorial. Explore file and console output, practical examples, and best practices."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C fprintf function

last modified April 6, 2025

Formatted output is essential in C programming for displaying data clearly and
consistently. The fprintf function provides powerful formatting
capabilities for both console and file output. This tutorial explores
fprintf in depth, covering its syntax, format specifiers, and
practical applications. You'll learn to create professional output while
understanding safety considerations and best practices for robust code.

## What Is fprintf?

The fprintf function writes formatted data to a specified output
stream, typically a file or stdout. It's similar to
printf but more versatile, accepting a file pointer as its first
argument. The function uses format specifiers like %d,
%f, and %s to control output formatting. Always check
for errors when writing to files, as disk space or permission issues may cause
failures. For security, prefer fprintf over unsafe functions like
sprintf when possible.

## Basic fprintf to Standard Output

This example demonstrates using fprintf to write formatted output
to the console (stdout).

basic_fprintf.c
  

#include &lt;stdio.h&gt;

int main() {
    int age = 25;
    float height = 1.75f;
    char name[] = "Alice";

    // Write formatted output to stdout
    fprintf(stdout, "Name: %s\nAge: %d\nHeight: %.2f meters\n", 
            name, age, height);

    return 0;
}

Here, fprintf sends formatted text to stdout, just
like printf would. The format string contains placeholders:
%s for strings, %d for integers, and
%.2f for floating-point numbers with 2 decimal places. The
variables name, age, and height provide
the values. This approach is useful when you want consistent output formatting
across both console and file writes.

## Writing Formatted Data to a File

Learn how to write structured data to a text file using fprintf.

file_output.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("user_data.txt", "w");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    char username[] = "johndoe";
    int logins = 42;
    double balance = 1250.75;

    // Write formatted data to file
    fprintf(fp, "User: %s\nLogins: %d\nBalance: $%.2f\n", 
            username, logins, balance);

    fclose(fp);
    return 0;
}

This example opens "user_data.txt" in write mode ("w"), creating it if
necessary. The fprintf function writes three pieces of data with
descriptive labels. Note the precision control in %.2f to format
the balance with two decimal places. Always check if the file opened
successfully and close it when done. The resulting file will contain neatly
formatted, human-readable data.

## Appending Formatted Data to a File

See how to add new formatted records to an existing file without overwriting.

append_data.c
  

#include &lt;stdio.h&gt;
#include &lt;time.h&gt;

int main() {
    FILE *fp = fopen("log.txt", "a");  // Append mode
    if (fp == NULL) {
        perror("Error opening log file");
        return 1;
    }

    time_t now;
    time(&amp;now);
    
    // Append timestamped log entry
    fprintf(fp, "[%s] User action: Login attempt\n", ctime(&amp;now));
    
    fclose(fp);
    return 0;
}

Opening the file in append mode ("a") ensures new content goes at the end. The
example uses time and ctime to add a timestamp to
each log entry. The fprintf formats this into a structured log
line. Repeated runs will add new entries without affecting existing content.
This pattern is ideal for logging systems where preserving history is crucial.

## Error Handling with fprintf

Implement robust error checking when using fprintf for critical
operations.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;errno.h&gt;

int main() {
    FILE *fp = fopen("important.dat", "w");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    int items_written = fprintf(fp, "Critical data: %d\n", 42);
    
    if (items_written &lt; 0) {
        perror("Write operation failed");
        fclose(fp);
        return 1;
    }

    if (fclose(fp) == EOF) {
        perror("Failed to close file");
        return 1;
    }

    printf("Successfully wrote %d items\n", items_written);
    return 0;
}

This example demonstrates comprehensive error handling. fprintf
returns the number of characters written or a negative value on failure. We check
this return value to detect write errors. The fclose operation is
also checked since buffered writes might fail during closing. Such defensive
programming prevents silent failures in production environments. Always verify
critical I/O operations when working with files.

## Formatting Complex Data Structures

Use fprintf to serialize structured data for storage or logging.

complex_data.c
  

#include &lt;stdio.h&gt;

typedef struct {
    char id[10];
    float price;
    int quantity;
} Product;

int main() {
    FILE *fp = fopen("inventory.csv", "w");
    if (fp == NULL) {
        perror("Cannot create inventory file");
        return 1;
    }

    Product items[3] = {
        {"A100", 19.99f, 50},
        {"B200", 29.50f, 25},
        {"C300", 9.95f, 100}
    };

    // Write CSV header
    fprintf(fp, "ID,Price,Quantity\n");
    
    // Write each product as a CSV line
    for (int i = 0; i &lt; 3; i++) {
        fprintf(fp, "%s,%.2f,%d\n", 
                items[i].id, items[i].price, items[i].quantity);
    }

    fclose(fp);
    return 0;
}

This example creates a CSV file from an array of product structures. The first
fprintf writes the column headers, while the loop writes each
product's data in a consistent format. Note the use of %.2f to
standardize price formatting. The resulting file can be easily imported into
spreadsheets or other systems. This technique works well for exporting
structured data in standard formats.

## Best Practices for Using fprintf

- **Validate File Pointers:** Always check if the file opened successfully before writing.

- **Check Return Values:** Verify fprintf's return value to catch write errors.

- **Use Precise Format Specifiers:** Control output with width and precision (e.g., %8.2f).

- **Prefer Safe Alternatives:** For user-provided format strings, use fprintf instead of vulnerable functions.

- **Close Files Properly:** Ensure files are closed to flush buffers and release resources.

## Source

[C fprintf Documentation](https://en.cppreference.com/w/c/io/fprintf)

This tutorial has explored the versatile fprintf function, from
basic console output to complex file formatting. Mastering these techniques
enables you to create professional, reliable output in your C programs while
maintaining security and robustness.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).