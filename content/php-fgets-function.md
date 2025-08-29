+++
title = "PHP fgets Function"
date = 2025-08-29T20:05:44.723+01:00
draft = false
description = "PHP fgets function tutorial shows how to read files line by line in PHP. Learn fgets with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fgets Function

last modified April 3, 2025

The PHP fgets function reads a line from a file pointer. It's
commonly used for reading files line by line in PHP applications.

## Basic Definition

The fgets function reads up to length - 1 bytes from the file
pointer. Reading stops when length - 1 bytes have been read, or a newline.

Syntax: fgets(resource $stream, ?int $length = null): string|false.
The function returns the read string or false on failure.

## Basic fgets Example

This shows the simplest usage of fgets to read a file line by line.

basic_fgets.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("example.txt", "r");

if ($file) {
    while (($line = fgets($file)) !== false) {
        echo $line;
    }
    fclose($file);
}

This opens "example.txt" and reads it line by line until EOF. Each line includes
the newline character at the end. Always close files with fclose.

## Reading Specific Length

The second parameter limits how many bytes to read from the line.

fgets_length.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("example.txt", "r");

if ($file) {
    $line = fgets($file, 10);
    echo $line;
    fclose($file);
}

This reads at most 9 bytes (10 - 1) from the first line. If the line is shorter,
it stops at the newline. The length parameter is optional.

## Reading CSV File

fgets can be combined with str_getcsv to parse CSV.

csv_reader.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("data.csv", "r");

if ($file) {
    while (($line = fgets($file)) !== false) {
        $fields = str_getcsv($line);
        print_r($fields);
    }
    fclose($file);
}

This reads a CSV file line by line and parses each line into an array of fields.
The newline from fgets is handled by str_getcsv.

## Error Handling

Proper error handling is important when working with file operations.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$filename = "nonexistent.txt";
$file = @fopen($filename, "r");

if ($file === false) {
    echo "Failed to open file: $filename";
    exit(1);
}

while (($line = fgets($file)) !== false) {
    echo $line;
}

fclose($file);

This shows proper error handling when opening files. The @ suppresses
warnings, allowing custom error handling. Always check for false returns.

## Reading Remote File

fgets can read from remote files when allow_url_fopen is enabled.

remote_file.php
  

&lt;?php

declare(strict_types=1);

$url = "https://example.com/data.txt";
$file = fopen($url, "r");

if ($file) {
    while (($line = fgets($file)) !== false) {
        echo htmlspecialchars($line);
    }
    fclose($file);
}

This reads a remote file line by line. Note that htmlspecialchars
protects against XSS when outputting remote content. Check PHP configuration.

## Best Practices

- **Resource Management:** Always close files with fclose.

- **Error Handling:** Check for false returns from file operations.

- **Memory Efficiency:** Use fgets for large files.

- **Security:** Validate/sanitize file paths and content.

- **Performance:** Consider buffering for frequent small reads.

## Source

[PHP fgets Documentation](https://www.php.net/manual/en/function.fgets.php)

This tutorial covered the PHP fgets function with practical
examples showing its usage in different file reading scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).