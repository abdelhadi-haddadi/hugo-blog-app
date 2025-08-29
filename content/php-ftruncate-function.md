+++
title = "PHP ftruncate Function"
date = 2025-08-29T20:05:54.757+01:00
draft = false
description = "PHP ftruncate function tutorial shows how to truncate files to a specified length in PHP. Learn ftruncate with practical examples."
image = ""
imageBig = ""
categories = ["php-filesystem"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP ftruncate Function

last modified April 3, 2025

The PHP ftruncate function truncates a file to a specified length.
It's useful for resizing files or clearing file contents while maintaining the
file handle.

## Basic Definition

The ftruncate function truncates an open file to a given size. It
takes two parameters: the file pointer and the size to truncate to.

Syntax: ftruncate(resource $stream, int $size): bool. The function
returns true on success or false on failure. The file must be opened for
writing.

## Basic ftruncate Example

This shows the simplest usage of ftruncate to empty a file.

basic_ftruncate.php
  

&lt;?php

declare(strict_types=1);

$filename = "data.txt";
$file = fopen($filename, "r+");

if ($file) {
    ftruncate($file, 0);
    fclose($file);
    echo "File truncated successfully.";
} else {
    echo "Failed to open file.";
}

This opens a file in read-write mode and truncates it to 0 bytes. The file
handle is properly closed after the operation. Always check if file opening
succeeds.

## Truncate to Specific Size

ftruncate can resize files to any specified length, not just zero.

specific_size.php
  

&lt;?php

declare(strict_types=1);

$filename = "data.txt";
$file = fopen($filename, "r+");

if ($file) {
    ftruncate($file, 100);
    fclose($file);
    echo "File resized to 100 bytes.";
} else {
    echo "Failed to open file.";
}

This resizes the file to exactly 100 bytes. If the file was larger, it's
truncated. If smaller, it's extended with null bytes. The file pointer
position isn't changed by this operation.

## Error Handling

Proper error handling is essential when working with filesystem operations.

error_handling.php
  

&lt;?php

declare(strict_types=1);

$filename = "data.txt";
$file = fopen($filename, "r+");

if ($file === false) {
    die("Failed to open file.");
}

if (!ftruncate($file, 0)) {
    fclose($file);
    die("Failed to truncate file.");
}

fclose($file);
echo "File truncated successfully.";

This example shows robust error handling. It checks both file opening and
truncation results. Resources are properly cleaned up in case of failure.
Always handle potential filesystem errors.

## Combining with File Writing

ftruncate is often used with file writing operations.

with_writing.php
  

&lt;?php

declare(strict_types=1);

$filename = "log.txt";
$file = fopen($filename, "r+");

if ($file) {
    ftruncate($file, 0);
    fwrite($file, "New log content\n");
    fclose($file);
    echo "Log file cleared and rewritten.";
} else {
    echo "Failed to open log file.";
}

This clears a log file before writing new content. The sequence ensures no old
content remains. The file pointer is at position 0 after truncation, ready for
writing. This is a common pattern for log rotation.

## File Extension Example

ftruncate can also extend files by specifying a larger size.

file_extension.php
  

&lt;?php

declare(strict_types=1);

$filename = "data.bin";
$file = fopen($filename, "r+");

if ($file) {
    $newSize = 1024; // 1KB
    if (ftruncate($file, $newSize)) {
        echo "File extended to {$newSize} bytes.";
    } else {
        echo "Failed to extend file.";
    }
    fclose($file);
} else {
    echo "Failed to open file.";
}

This extends a file to 1KB in size. The new space is filled with null bytes.
This technique is useful for preallocating file space. Note that disk space
must be available for the operation to succeed.

## Best Practices

- **File Permissions:** Ensure proper write permissions.

- **Resource Management:** Always close file handles.

- **Error Handling:** Check return values of filesystem operations.

- **Concurrency:** Use file locking in multi-process environments.

- **Backups:** Consider backups before destructive operations.

## Source

[PHP ftruncate Documentation](https://www.php.net/manual/en/function.ftruncate.php)

This tutorial covered the PHP ftruncate function with practical
examples showing its usage in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Filesystem functions](/php/#php-fs).