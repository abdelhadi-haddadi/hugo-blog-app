+++
title = "PHP fwrite Function"
date = 2025-08-29T20:05:54.753+01:00
draft = false
description = "PHP fwrite function tutorial shows how to write data to files in PHP. Learn fwrite with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP fwrite Function

last modified April 3, 2025

The PHP fwrite function writes data to a file. It's a fundamental
function for file operations in PHP. This tutorial covers its usage in depth.

## Basic Definition

The fwrite function writes to an open file. It takes a file handle
and the string to write. An optional length parameter limits the bytes written.

Syntax: fwrite(resource $handle, string $data, int $length = ?): int.
It returns the number of bytes written or false on failure.

## Basic fwrite Example

This shows the simplest usage of fwrite to write to a file.

basic_fwrite.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("example.txt", "w");

if ($file) {
    $bytes = fwrite($file, "Hello, World!");
    fclose($file);
    echo "Wrote $bytes bytes to file.";
} else {
    echo "Failed to open file.";
}

This creates "example.txt" and writes "Hello, World!" to it. Always check if
fopen succeeds and close files when done. The function returns bytes written.

## Appending to a File

Use the "a" mode to append data to an existing file without overwriting.

append_fwrite.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("example.txt", "a");

if ($file) {
    $bytes = fwrite($file, "\nAppended line.");
    fclose($file);
    echo "Appended $bytes bytes to file.";
} else {
    echo "Failed to open file.";
}

This appends a new line to "example.txt". The "\n" creates a new line. The "a"
mode creates the file if it doesn't exist, like "w" mode.

## Writing Binary Data

fwrite can write binary data when the file is opened in binary mode.

binary_fwrite.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("image.png", "wb");

if ($file) {
    $binaryData = file_get_contents("source.png");
    $bytes = fwrite($file, $binaryData);
    fclose($file);
    echo "Wrote $bytes bytes of binary data.";
} else {
    echo "Failed to open file.";
}

This copies a PNG file by writing binary data. The "b" in mode ensures proper
binary handling on Windows. Always use binary mode for non-text files.

## Limiting Write Length

The third parameter limits how many bytes are written from the data string.

limited_fwrite.php
  

&lt;?php

declare(strict_types=1);

$file = fopen("limited.txt", "w");

if ($file) {
    $data = "This string is too long";
    $bytes = fwrite($file, $data, 10);
    fclose($file);
    echo "Wrote $bytes bytes (limited to 10).";
} else {
    echo "Failed to open file.";
}

Only the first 10 bytes ("This strin") are written. The length parameter is
useful for writing fixed-size chunks or limiting output size.

## Error Handling

Proper error handling is essential when working with file operations.

error_fwrite.php
  

&lt;?php

declare(strict_types=1);

$file = @fopen("readonly.txt", "w");

if ($file === false) {
    echo "Error: Could not open file.";
    exit;
}

$bytes = fwrite($file, "Test");

if ($bytes === false) {
    echo "Error: Write failed.";
} else {
    echo "Successfully wrote $bytes bytes.";
}

fclose($file);

This shows comprehensive error handling. The @ suppresses fopen warnings. Always
check return values for false to detect errors in file operations.

## Best Practices

- **Check Permissions:** Ensure files are writable.

- **Error Handling:** Always verify fwrite return values.

- **Resource Cleanup:** Close files with fclose when done.

- **Binary Safety:** Use "b" mode for binary data.

- **Locking:** Consider flock for concurrent access.

## Source

[PHP fwrite Documentation](https://www.php.net/manual/en/function.fwrite.php)

This tutorial covered the PHP fwrite function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).